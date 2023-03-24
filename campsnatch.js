async function getCampgrounds() {
    let request = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/search', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'search': 'all' })
    })
    return await request.json()
}

async function getTrackers(device_token){
    let request = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/gettrackers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'device_token': `${device_token}`
        })
    })
    return await request.json()
}

async function addTracker(campground_id, device_token, campground_name, start_date, end_date){
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

async function removeTracker(campground_id, device_token, campground_name, start_date, end_date){
    let request = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/remove_tracker', {
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

    return await request.json()
}

module.exports = {
    getCampgrounds,
    getTrackers,
    addTracker,
    removeTracker
}