let trackers = []

async function getTrackers() {
    startSpinner()

    console.log("getting trackers")
    let device_token = document.getElementById('email').value
    console.log(device_token)
    let request = await fetch('/api/trackers', {
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
    stopSpinner()
}

function startSpinner() {
    let spinnerElement = document.getElementById('tracker-loader')
    let spinnerHTML =
        `
    <div class="flex justify-center pb-8">
        <svg aria-hidden="true"
            class="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400"
            viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor" />
            <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill" />
        </svg>
        <!-- <span class="sr-only">Loading...</span> -->
    </div>
    `
    spinnerElement.innerHTML = spinnerHTML
}

function stopSpinner() {
    document.getElementById('tracker-loader').innerHTML = ""
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
                class="font-small text-blue-600 dark:text-blue-500 hover:underline" onclick="removeTracker('${t.device_token}', '${t.campground_id}', '${t.campground_name}', '${t.start_date}', '${t.end_date}')">
                    <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" height="25px">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                    </svg>
                </a>
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
    startSpinner()

    let tracker_table_head = document.getElementById('tracker-table-head')
    let tracker_table = document.getElementById('tracker-table-body')

    removeAllChildNodes(tracker_table_head)
    removeAllChildNodes(tracker_table)

    let request = await fetch('/api/remove_tracker', {
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
    await setTimeout("", 5000)
    stopSpinner()
    // getTrackers()
    console.log(json)
}

let socket;

const TRACKER = "TRACKER"

function configureWebSocket() {
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
    socket.onopen = (event) => {
        displayMsg('system', 'Tracker Stream: ', 'connected ✅');
    };
    socket.onclose = (event) => {
        displayMsg('system', 'Tracker Stream: ', 'disconnected ❌');
    };
    socket.onmessage = async (event) => {
        const msg = JSON.parse(await event.data.text());
        if (msg.type === TRACKER) {
            displayMsg('player', msg.from, `set a tracker for<a href="https://www.recreation.gov/camping/campgrounds/${msg.value.campground_id}" class="underline"> ${msg.value.campground_name}</a>`);
        }
    };
}

function displayMsg(cls, from, msg) {
    const chatText = document.querySelector('#tracker-messages');
    chatText.innerHTML = chatText.innerHTML +
        `<div class="event text-white"><span>${from}</span> ${msg}</div>`;
}

// function broadcastEvent(from, type, value) {
//     const event = {
//         from: from,
//         type: type,
//         value: value,
//     };
//     socket.send(JSON.stringify(event));
// }

configureWebSocket()
