# Campsnatch - A Camping Tourism Solution
#### CS260 Startup Deliverable

## Elevator Pitch
Millions of Americans plan camping vacations across the United States each year. Campsnatch is a website that helps campers get notifications when campgrounds become available in their desired camping destinations. Campsnatch leverages the recreation.gov apis to scan for campsite availabilities.

## Key Features
* Search for thousands of campgrounds across the America
* Get detailed information about campgrounds including amentities, alerts, activities, and directions 
* Set up a tracker to enable notifications for a certain campground
* View and edit list of enabled trackers for campgrounds.

![image info](./design/Search.png)
![image info](./design/Campground.png)
![image info](./design/Trackers.png)

## Web Programming Notes
### Table element
* The html table element can produce a table grid structure to format rows and columns of data
* thead stand for table heading
* tr stands for table row
* td stands for table data
* tbody stands for table body
#### Example below
<table>
    <caption>Alien football stars</caption>
    <tr>
        <th scope="col">Player</th>
        <th scope="col">Gloobles</th>
        <th scope="col">Za'taak</th>
    </tr>
    <tr>
        <th scope="row">TR-7</th>
        <td>7</td>
        <td>4,569</td>
    </tr>
    <tr>
        <th scope="row">Khiresh Odo</th>
        <td>7</td>
        <td>7,223</td>
    </tr>
    <tr>
        <th scope="row">Mia Oolong</th>
        <td>9</td>
        <td>6,219</td>
    </tr>
</table>

### CSS Notes
Use frameworks like tailwinds and bootstrap to leverage their design components. This allows you to not have to start from scratch.
Style sheets are connected up in the head of the html document by using "link rel="stylesheet" href="styles.css""

### JS Notes
localstorage allows you to set persistent properties in the browser
window.location.href = "url" lets you jump pages in the javascript file
document.querySelectorAll allows you to grab all items with a class name
document.querySelectore('.classname') allow you to grab a class name
audio files can be played with the Audio constructor and the play property

### JS Debug
Nodemon
Once you start writing complex web applications you will find yourself making changes in the middle of debugging sessions and you would like have node restart automatically and update the browser as the changes are saved. This seems like a simple thing, but over the course of hundreds of changes, every second you can save really starts to add up.

The Nodemon package is basically a wrapper around node that watches for files in the project directory to change. When it detects that you saved something it will automatically restart node.

If you would like to experiment with this then take the following steps. First install Nodemon globally so that you can use it to debug all of your projects.

npm install -g nodemon
Then, because VS Code does not know how to launch nodemon automatically, you need create a VS Code launch configuration. In VS Code press CTRL-SHIFT-P (on Windows) or ⌘-⇧-P (on Mac) and type the command Debug: Add configuration. This will then ask you what type of configuration you would like to create. Type Node.js and select the Node.js: Nodemon setup option. in the launch configuration file at it creates, change the program from app.js to main.js (or whatever the main JavaScript file is for your application) and save the configuration file.

Now when you press F5 to start debugging it will run Nodemon instead of Node.js and your changes will automatically update your application when you save.

### Setting up express app

Converting Simon to a service involved the following steps.

1. Move all the previous deliverable code files (_.html, _.js, \*.css, favicon.ico, and asserts) into a sub-directory named `public`. We will use the HTTP Node.js based service to host the front-end application files. This is done with the static file middleware that we will add our service `index.js`.

   ```js
   app.use(express.static('public'));
   ```

   When running our service the static file middleware takes care of reading the front-end code from the `public` directory and returning it to the browser. The service only directly handles the endpoint requests.

   ![Simon service](../simon-react/simonProduction.jpg)

1. Within the project directory run `npm init -y`. This configures the directory to work with **node.js**.
1. Modify or create `.gitignore` to ignore `node_modules`.
1. Install the Express package by running `npm install express`. This will write the Express package dependency in the `package.json` file and install all the Express code to the `node_modules` directory.
1. Create a file named `index.js` in the root of the project. This is the entry point that **node.js** will call when you run your web service.
1. Add the basic Express JavaScript code needed to host the application static content and the desired endpoints.

   ```js
   const express = require('express');
   const app = express();

   // The service port. In production the front-end code is statically hosted by the service on the same port.
   const port = process.argv.length > 2 ? process.argv[2] : 3000;

   // JSON body parsing using built-in middleware
   app.use(express.json());

   // Serve up the front-end static content hosting
   app.use(express.static('public'));

   // Router for service endpoints
   const apiRouter = express.Router();
   app.use(`/api`, apiRouter);

   // GetScores
   apiRouter.get('/scores', (_req, res) => {
     res.send(scores);
   });

   // SubmitScore
   apiRouter.post('/score', (req, res) => {
     scores = updateScores(req.body, scores);
     res.send(scores);
   });

   // Return the application's default page if the path is unknown
   app.use((_req, res) => {
     res.sendFile('index.html', { root: 'public' });
   });

   app.listen(port, () => {
     console.log(`Listening on port ${port}`);
   });
   ```

1. Modify the Simon application code to make service endpoint requests to our newly created HTTP service code.

   ```js
   async function loadScores() {
     const response = await fetch("/api/scores")
     const scores = await response.json()

     // Modify the DOM to display the scores
   ```

### Mongo DB
#### Collection
A collection is basically an array that stores documents
```js
[
  {
    _id: '62300f5316f7f58839c811de',
    name: 'Lovely Loft',
    summary: 'A charming loft in Paris',
    beds: 1,
    last_review: {
      $date: '2022-03-15T04:06:17.766Z',
    },
    price: 3000,
  },
  {
    _id: '623010b97f1fed0a2df311f8',
    name: 'Infinite Views',
    summary: 'Modern home with infinite views from the infinity pool',
    property_type: 'House',
    beds: 5,
    price: 250,
  },
];
```
#### Common Operations
```js
// find all houses
db.house.find();

// find houses with two or more bedrooms
db.house.find({ beds: { $gte: 2 } });

// find houses that are available with less than three beds
db.house.find({ status: 'available', beds: { $lt: 3 } });

// find houses with either less than three beds or less than $1000 a night
db.house.find({ $or: [(beds: { $lt: 3 }), (price: { $lt: 1000 })] });

// find houses with the text 'modern' or 'beach' in the summary
db.house.find({ summary: /(modern|beach)/i });
```
### Using MongoDB in your application

📖 **Deeper dive reading**: [MongoDB tutorial](https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/)

The first step to using Mongo in your application is to install the `mongodb` package using NPM.

```sh
➜ npm install mongodb
```

With that done you then use the `MongoClient` object to make a client connection to the database server. This requires a username, password, and the hostname of the database server.

```js
const { MongoClient } = require('mongodb');

const userName = 'holowaychuk';
const password = 'express';
const hostname = 'mongodb.com';

const uri = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(uri);
```

With the client connection you can then get a database object and from that a collection object. The collection object allows you to insert, and query for, documents. You do not have to do anything special to insert a JavaScript object as a Mongo document. You just call the `insertOne` function on the collection object and pass it the JavaScript object. When you insert a document, if the database or collection does not exists, Mongo will automatically create them for you. When the document is inserted into the collection it will automatically be assigned a unique ID.

```js
const collection = client.db('rental').collection('house');

const house = {
  name: 'Beachfront views',
  summary: 'From your bedroom to the beach, no shoes required',
  property_type: 'Condo',
  beds: 1,
};
await collection.insertOne(house);
```

To query for documents you use the `find` function on the collection object. Note that the find function is asynchronous and so we use the `await` keyword to wait for the promise to resolve before we write them out to the console.

```js
const cursor = collection.find();
const rentals = await cursor.toArray();
rentals.forEach((i) => console.log(i));
```

If you do not supply any parameters to the `find` function then it will return all documents in the collection. In this case we only get back the single document that we previously inserted. Notice that the automatically generated ID is returned with the document.

**Output**

```js
[
  {
    _id: new ObjectId('639a96398f8de594e198fc13'),
    name: 'Beachfront views',
    summary: 'From your bedroom to the beach, no shoes required',
    property_type: 'Condo',
    beds: 1,
  },
];
```

You can provide a query and options to the `find` function. In the example below we query for a `property_type` of Condo that has less than two bedrooms. We also specify the options to sort by descending price, and limit our results to the first 10 documents.

```js
const query = { property_type: 'Condo', beds: { $lt: 2 } };

const options = {
  sort: { price: -1 },
  limit: 10,
};

const cursor = collection.find(query, options);
const rentals = await cursor.toArray();
rentals.forEach((i) => console.log(i));
```

The query matches the document that we previously inserted and so we get the same result as before.

There is a lot more functionality that MongoDB provides, but this is enough to get you started. If you are interested you can explore the tutorials on their [website](https://www.mongodb.com/docs/).

## Keeping your keys out of your code

You need to protect your credentials for connecting to your Mongo database. One common mistake is to check them into your code and then post it to a public GitHub repository. Instead you can load your credentials when the application executes. One common way to do that, is to read them from environment variables. The JavaScript `process.env` object provides access to the environment.

```Javascript
const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error("Database not configured. Set environment variables");
}
```

Following this pattern requires you to set these variables in your development and production environments before you can successfully execute.
