let campgrounds = []
let selected_campground = null
let loaded = false

window.addEventListener('load', async function (event) {
    if (!loaded) {
        let request = await fetch('/api/campgrounds', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({ 'search': 'all' })
        })
        let json = await request.json()
        parseCampgrounds(json)
        console.log(json)
        loaded = true
        this.document.getElementById('search-loader').innerHTML = ""
    }
})

function parseCampgrounds(json_campgrounds) {
    for (const json_campround of json_campgrounds.campgroundList) {
        campgrounds.push(new Campground(json_campround.campgroundId, json_campround.campsiteName))
    }
}


class Campground {
    constructor(id, name) {
        this.id = id
        this.name = name
    }
}


document.getElementById('campground-search').addEventListener('keypress', function (event) {
    let search_string = document.getElementById('campground-search').value

    let filtered_campgrounds = campgrounds.filter(c => c.name.toUpperCase().includes(search_string.toUpperCase()))

    for (const i of filtered_campgrounds) {
        if (i.name.includes(search_string)) {
            console.log(i.name)
        }
    }

    if (displayCampgrounds.length > 5) {
        displayCampgrounds(filtered_campgrounds.subarray(0, 5))
    } else {
        displayCampgrounds(filtered_campgrounds)
    }
})

function displayCampgrounds(searched_campgrounds) {

    let campground_list = document.getElementById('campground-list')

    removeAllChildNodes(campground_list)

    for (const campground of searched_campgrounds) {
        let destination =
            `
            <div
                class="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4" onclick="selectCampground(${campground.id}, '${campground.name}')">
                <div class="flex-1 pl-1">
                    <div class="font-medium dark:text-white">${campground.name}</div>
                </div>
                <div class="flex flex-row justify-center">
                    <button class="w-10 text-right flex justify-end">
                        <svg width="20" fill="currentColor" height="20"
                            class="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                            viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                            </path>
                        </svg>
                    </button>
                </div>
            </div>
        `
        let list_item = document.createElement('li')
        list_item.innerHTML = destination
        campground_list.appendChild(list_item)
    }

}

function selectCampground(campground_id, campground_name) {
    localStorage.setItem('selected_campground_id', campground_id)
    localStorage.setItem('selected_campground_name', campground_name)
    window.location.href = "./campground.html"
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

