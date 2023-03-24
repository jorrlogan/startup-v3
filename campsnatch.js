async function getCampgrounds(){
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

module.exports = {
    getCampgrounds
}