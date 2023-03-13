window.addEventListener('load', async function (event) {
    let campground_id = this.localStorage.getItem('selected_campground_id')
    let campground_name = this.localStorage.getItem('selected_campground_name')
    
    console.log(campground_id)
    console.log(campground_name)

    let details = await getCampgroundDetails(campground_id)
    displayCampgroundDetails(details)
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
    let request = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/track', {
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
}