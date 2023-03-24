window.addEventListener('load', async function (event) {
    let campground_id = this.localStorage.getItem('selected_campground_id')
    let campground_name = this.localStorage.getItem('selected_campground_name')
    
    console.log(campground_id)
    console.log(campground_name)

    let details = await getCampgroundDetails(campground_id)
    displayCampgroundDetails(details)
    getCampgroundImages(campground_id)
})

async function getCampgroundDetails(campground_id){
    let request = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/campground_description', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'park_code': `${campground_id}`,
        })
    })
    let json = await request.json()
    return json
}

function displayCampgroundDetails(details){
    let name = document.getElementById('campground-name')
    let description = document.getElementById('campground-description')
    let directions = document.getElementById('campground-directions')

    name.innerHTML = details.facilityName
    description.innerHTML = details.facilityDescription

    document.getElementById('campground-loader').innerHTML = ""
}

async function getCampgroundImages(campground_id){
    let response = await fetch('/api/campground/images', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'campground_id': `${campground_id}`,
        })
    })

    let json = await response.json()
    let images = json.images

    let imagesElement = document.querySelector("#images")
    var image = document.createElement("img")
    image.src = images[0]
    imagesElement.appendChild(image)
}

async function trackCampground(){
    let start = document.getElementById("start-date").value
    let end = document.getElementById("end-date").value
    let campground_id = this.localStorage.getItem('selected_campground_id')
    let campground_name = this.localStorage.getItem('selected_campground_name')
    let device_token = document.getElementById("email").value

    console.log(start)
    console.log(end)
    console.log(campground_id)
    console.log(campground_name)
    console.log(device_token)

    addTracker(campground_id, device_token, campground_name, start, end)
}

async function addTracker(campground_id, device_token, campground_name, start_date, end_date) {
    let request = await fetch('/api/add_tracker', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'campground_id': `${campground_id}`,
            'device_token': `${device_token}`,
            'campground_name': `${campground_name}`,
            'start_date': `${start_date}`,
            'end_date': `${end_date}`
        })
    })
    confirmTrackerSet()
}

function confirmTrackerSet(){
    document.getElementById('confirmation-toast').innerHTML = 
    `
    <div id="toast-simple" class="flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow dark:text-gray-400 dark:divide-gray-700 space-x dark:bg-gray-800" role="alert">
    <svg aria-hidden="true" class="w-5 h-5 text-blue-600 dark:text-blue-500" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M511.6 36.86l-64 415.1c-1.5 9.734-7.375 18.22-15.97 23.05c-4.844 2.719-10.27 4.097-15.68 4.097c-4.188 0-8.319-.8154-12.29-2.472l-122.6-51.1l-50.86 76.29C226.3 508.5 219.8 512 212.8 512C201.3 512 192 502.7 192 491.2v-96.18c0-7.115 2.372-14.03 6.742-19.64L416 96l-293.7 264.3L19.69 317.5C8.438 312.8 .8125 302.2 .0625 289.1s5.469-23.72 16.06-29.77l448-255.1c10.69-6.109 23.88-5.547 34 1.406S513.5 24.72 511.6 36.86z"></path></svg>
    <div class="pl-4 text-sm font-normal">Tracker set sucessfully!</div>
    </div>
    `
}