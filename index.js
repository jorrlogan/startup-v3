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
const campsnatch = require('./campsnatch.js');

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


secureApiRouter.get('/campgrounds', async (req, res) => {
    let json = await campsnatch.getCampgrounds()
    res.setHeader('Cache-Control', 'max-age=3600');
    res.send(json)
})

secureApiRouter.post('/trackers', async (req, res) => {
    console.log('getting trackers')
    const device_token = req.body.device_token
    let json = await campsnatch.getTrackers(device_token)
    res.send(json)
})

secureApiRouter.post('/add_tracker', async (req, res) => {
    try {
        console.log('added tracker')
        const campground_id = req.body.campground_id
        const device_token = req.body.device_token
        const campground_name = req.body.campground_name
        const start_date = req.body.start_date
        const end_date  = req.body.end_date
        let json = await campsnatch.addTracker(campground_id, device_token, campground_name, start_date, end_date)
        res.send(json)
    } catch(error) {
        // res.status(401).send({ msg: 'Unauthorized' });
    }
})

secureApiRouter.post('/remove_tracker', async (req, res) => {
    try {
        console.log('removing tracker')
        const campground_id = req.body.campground_id
        const device_token = req.body.device_token
        const campground_name = req.body.campground_name
        const start_date = req.body.start_date
        const end_date  = req.body.end_date
        let json = await campsnatch.removeTracker(campground_id, device_token, campground_name, start_date, end_date)
        res.send(json)
    } catch(error) {
        // res.status(401).send({ msg: 'Unauthorized' });
    }
})


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
