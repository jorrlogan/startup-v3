let campgrounds = []
let selected_campground = null

window.addEventListener('load', async function(event) {
    let request = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/search', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'search': 'all'})
    })
    let json = await request.json()
    parseCampgrounds(json)
    console.log(json)
})

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

function parseCampgrounds(json_campgrounds){
    for(const json_campround of json_campgrounds.campgroundList){
        campgrounds.push(new Campground(json_campround.campgroundId, json_campround.campsiteName))
    }
}


class Campground {
    constructor(id, name){
        this.id = id
        this.name = name
    }
}


document.getElementById('campground-search').addEventListener('keypress', function(event){
    let search_string = document.getElementById('campground-search').value
    
    let filtered_campgrounds = campgrounds.filter(c => c.name.toUpperCase().includes(search_string.toUpperCase()))

    for(const i of filtered_campgrounds){
        if (i.name.includes(search_string)){
            console.log(i.name)
        }
    }

    if (displayCampgrounds.length > 5){
        displayCampgrounds(filtered_campgrounds.subarray(0, 5))
    } else {
        displayCampgrounds(filtered_campgrounds)
    }
})

function displayCampgrounds(searched_campgrounds){

    let campground_list = document.getElementById('campground-list')

    removeAllChildNodes(campground_list)

    for (const campground of searched_campgrounds){
        let li = document.createElement("li")
        li.className = "bg-white p-4"
        li.innerText = campground.name
        campground_list.appendChild(li)
    }

}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

