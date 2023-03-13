let trackers = []

async function getTrackers() {

    console.log("getting trackers")
    let device_token = document.getElementById('email').value
    console.log(device_token)
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

    let json = await request.json()
    parseTrackers(json, device_token)
}

function parseTrackers(json, device_token) {
    let json_trackers = json.trackers

    for (const t of json_trackers) {
        console.log(t.campground_id)
        console.log(t.campground_name)
        console.log(t.start_date)
        console.log(t.end_date)
        trackers.push(new Tracker(t.campground_id, t.campground_name, t.start_date, t.end_date, device_token))
    }
    console.log(trackers.length)
    displayTrackers()
}

class Tracker {
    constructor(campground_id, campground_name, start_date, end_date, device_token) {
        this.campground_id = campground_id
        this.campground_name = campground_name
        this.start_date = start_date
        this.end_date = end_date
        this.device_token = device_token
    }
}

function displayTrackers() {
    let tracker_table_head = document.getElementById('tracker-table-head')
    let tracker_table = document.getElementById('tracker-table-body')

    removeAllChildNodes(tracker_table)

    let table_head =
        `
        <tr>
        <th scope="col" class="px-6 py-3">
            Campground Name
        </th>
        <th scope="col" class="px-6 py-3">
            Start Date
        </th>
        <th scope="col" class="px-6 py-3">
            End Date
        </th>
        <th scope="col" class="px-6 py-3">
            <span class="">Edit</span>
        </th>
        </tr>
        `

    if (trackers.length > 0) {
        tracker_table_head.innerHTML = table_head
    } else {
        tracker_table_head.innerHTML = '<p>You currently have no trackers</p>'
    }


    for (const t of trackers) {
        let tracker = `
            <th scope="row"
                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                ${t.campground_name}
            </th>
            <td class="px-6 py-4 ">
                ${t.start_date}
            </td>
            <td class="px-6 py-4">
                ${t.end_date}
            </td>
            <td class="px-6 py-4 text-right">
            <a href="#"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline" onclick="removeTracker('${t.device_token}', '${t.campground_id}', '${t.campground_name}', '${t.start_date}', '${t.end_date}')"><svg
                    fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0">
                    </path>
                </svg></a>
        </td>
        `
        let tr = document.createElement('tr')
        tr.classList.add("bg-white")
       
        tr.innerHTML = tracker
        tracker_table.appendChild(tr)
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

async function removeTracker(device_token, campground_id, campground_name, start_date, end_date) {
    console.log("tracker being removed")
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

    let json = await request.json()
    getTrackers()
    console.log(json)
}
