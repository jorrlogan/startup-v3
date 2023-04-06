import React from 'react'
import { Spinner } from 'flowbite-react';

import { TrackerNotifications } from './tracker_notifications';

export function Tracker() {
    const [tableHead, setTableHead] = React.useState(null)
    const [trackerRows, setTrackerRows] = React.useState(null)
    const [loaded, setLoaded] = React.useState(false)

    React.useEffect(() => {
        const email = localStorage.getItem('userName')
        console.log('email: ' + email)
        if (email) {
            getTrackers(email)
        }
    }, [])

    async function removeTracker(device_token, campground_id, campground_name, start_date, end_date) {
        setLoaded(false)
        console.log('removing tracker')
        console.log(device_token)
        console.log(campground_id)
        console.log(campground_name)
        let response = await fetch('/api/remove_tracker', {
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

        let json = await response.json()
        console.log(json)
        getTrackers(device_token)
    }

    async function getTrackers(email) {
        let request = await fetch('/api/trackers', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'device_token': `${email}`
            })
        })
        let json = await request.json()
        parseTrackers(json, email)
    }

    function parseTrackers(json, device_token) {
        console.log('parsing trackers')
        let json_trackers = json.trackers
        let trackers = []
        for (const t of json_trackers) {
            console.log(t.campground_id)
            console.log(t.campground_name)
            console.log(t.start_date)
            console.log(t.end_date)
            trackers.push(new Tracker(t.campground_id, t.campground_name, t.start_date, t.end_date, device_token))
        }
        displayTrackers(trackers)
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

    function displayTrackers(trackers) {
        console.log('displaying trackers')
        setTableHead(
            <tr>
                <th scope="col" className="px-6 py-3">
                    Campground Name
                </th>
                <th scope="col" className="px-6 py-3">
                    Start Date
                </th>
                <th scope="col" className="px-6 py-3">
                    End Date
                </th>
                <th scope="col" className="px-6 py-3">
                    <span className="">Edit</span>
                </th>
            </tr>
        )

        let rows = []
        for (const t of trackers) {
            rows.push(
                <tr key={t.campground_id}>
                    <th scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {t.campground_name}
                    </th>
                    <td className="px-6 py-4 ">
                        {t.start_date}
                    </td>
                    <td className="px-6 py-4">
                        {t.end_date}
                    </td>
                    <td className="px-6 py-4">
                        <button
                            className="font-small text-blue-600 dark:text-blue-500 hover:underline" onClick={() => removeTracker(t.device_token, t.campground_id, t.campground_name, t.start_date, t.end_date)}>
                            <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" height="25px">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"></path>
                            </svg>
                        </button>
                    </td>
                </tr>
            )
        }
        setLoaded(true)
        setTrackerRows(rows)
    }

    return (
        <div className="">
            <div className="m-4 flex flex-col justify-center items-center">
                <div className="w-9/12">
                    {!loaded && (
                        <div className='flex justify-center'>
                            <Spinner
                                color="info"
                                aria-label="Info spinner example"
                                size="xl"
                                className='mt-8'
                            />
                        </div>
                    )}
                    {loaded && (
                        <div className="relative shadow-md sm:rounded-lg rounded-lg bg-white overflow-x-auto">
                            <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full">
                                <thead id="tracker-table-head"
                                    className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    {tableHead}
                                </thead>
                                <tbody id="tracker-table-body">
                                    {trackerRows}
                                </tbody>
                            </table>
                            <div>
                                {trackerRows.length === 0 && (
                                    <p className='text-center p-8'>You haven't set any trackers</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
                <div className='w-full'>
                    {loaded && (
                        <TrackerNotifications />
                    )}
                </div>
            </div>
        </div>
    );
}