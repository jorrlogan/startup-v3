const { MongoClient } = require('mongodb')
const bcrypt = require('bcrypt')
const uuid = require('uuid')

/**
 * Load mongo credentials
 */
const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('simon').collection('startup-users')

function getUser(email){
    return userCollection.findOne({ email: email})
}

function getUserByToken(token){
    return userCollection.findOne({ token: token})
}

async function createUser(email, password){
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10)

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4()
    }
    await userCollection.insertOne(user)
    return user
}

module.exports = {
    getUser,
    getUserByToken,
    createUser
}

