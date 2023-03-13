# Campsnatch - A Camping Tourism Solution
#### CS260 Startup Deliverable

## Elevator Pitch
Millions of Americans plan camping vacations across the United States each year. Campsnatch is a website that helps campers get notifications when campgrounds become available in their desired camping destinations. Campsnatch leverages the recreation.gov apis to scan for campsite availabilities.

## Key Features
* Search for thousands of campgrounds across the America
* Get detailed information about campgrounds including amentities, alerts, activities, and directions 
* Set up a tracker to enable notifications for a certain campground
* View and edit list of enabled trackers for campgrounds.

![image info](./DesignImages/Intro.png)
![image info](./DesignImages/Procedure.png)

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
