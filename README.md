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

Move all the previous deliverable code files (_.html, _.js, *.css, favicon.ico, and asserts) into a sub-directory named public. We will use the HTTP Node.js based service to host the front-end application files. This is done with the static file middleware that we will add our service index.js.

app.use(express.static('public'));
When running our service the static file middleware takes care of reading the front-end code from the public directory and returning it to the browser. The service only directly handles the endpoint requests.

Simon service

Within the project directory run npm init -y. This configures the directory to work with node.js.

Modify or create .gitignore to ignore node_modules.

Install the Express package by running npm install express. This will write the Express package dependency in the package.json file and install all the Express code to the node_modules directory.

Create a file named index.js in the root of the project. This is the entry point that node.js will call when you run your web service.

Add the basic Express JavaScript code needed to host the application static content and the desired endpoints.

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
Modify the Simon application code to make service endpoint requests to our newly created HTTP service code.

async function loadScores() {
  const response = await fetch("/api/scores")
  const scores = await response.json()

  // Modify the DOM to display the scores
