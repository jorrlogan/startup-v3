/**
 * Node Modules
 */
const express = require('express')
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');

/**
 * Dependencies
 */
const DB = require('./database.js');

/**
 * Auth cookie
 */
const authCookieName = 'token';

/**
 * Initialization on express app
 * Middleware
 */
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'));

/**
 * Router for service endpoints  
 */
var apiRouter = express.Router();
app.use(`/api`, apiRouter);

/**
 * CreateAuth token for a new user
 */
apiRouter.post('/auth/create', async (req, res) => {
    if (await DB.getUser(req.body.email)) {
        res.status(409).send({ msg: 'User already exists' });
    } else {
        const user = await DB.createUser(req.body.email, req.body.password);

        // Set the cookie
        setAuthCookie(res, user.token);

        res.send({
            id: user._id,
        });
    }
});

/**
 * GetAuth token for the provided credentials
 */
apiRouter.post('/auth/login', async (req, res) => {
    const user = await DB.getUser(req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            setAuthCookie(res, user.token);
            res.send({ id: user._id });
            return;
        }
    }
    res.status(401).send({ msg: 'User does not exist' });
});

/**
 * DeleteAuth token if stored in cookie
 */
apiRouter.delete('/auth/logout', (_req, res) => {
    res.clearCookie(authCookieName);
    res.status(204).end();
});

/**
 * secureApiRouter verifies credentials for endpoints
 */
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
    const authToken = req.cookies[authCookieName];
    const user = await DB.getUserByToken(authToken);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
});

/**
 * setAuthCookie in the HTTP response
 * @param { the http response body} res 
 * @param { the users auth token} authToken 
 */
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

/**
 * Default error handler
 */
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

/**
 * Return the application's default page if the path is unknown
 */
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.listen(8080, () => {
    console.log(`Listening on port 8080`)
})

