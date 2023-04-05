async function getCampgrounds() {
    let response = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/search', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'search': 'all' })
    })
    return await response.json()
}

async function getTrackers(device_token){
    let response = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/gettrackers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'device_token': `${device_token}`
        })
    })
    return await response.json()
}

async function addTracker(campground_id, device_token, campground_name, start_date, end_date){
    let response = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/track', {
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
    return await response.json()

}

async function removeTracker(campground_id, device_token, campground_name, start_date, end_date){
    let response = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/remove_tracker', {
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
    return await response.json()
}

async function getCampgroundImages(campground_id){
    let response = await fetch(`https://ridb.recreation.gov/api/v1/facilities/${campground_id}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'apikey': 'fdb47c69-df47-4445-99f8-0faa54a0cca2'
        }
    })
    let json = await response.json()

    let images = json.MEDIA.map(item => {
        return item.URL
    })
    console.log(images)
    return images;
}

module.exports = {
    getCampgrounds,
    getCampgroundImages,
    getTrackers,
    addTracker,
    removeTracker
}