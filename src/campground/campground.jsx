import React from 'react'
import { useParams } from 'react-router-dom'
import './campground.css'

export function Campground(props) {
    const { id, name } = useParams()

    const [campgroundDetails, setCampgroundDetails] = React.useState('')
    
    React.useEffect(() => {
        async function getCampgroundDetails(campground_id) {
            return await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/campground_description', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'park_code': `${campground_id}`,
                })
            })
        }

        if (id) {
            getCampgroundDetails(id)
                .then((response) => response.json())
                // .then((data) => console.log(data))
                .then((data) => setCampgroundDetails(data))
                .catch((e) => console.log(e))
        }
    }, [])

    return (
        <main>
            <div className="h-5/6 flex flex-row justify-center items-center flex-wrap">
                <div className="md:w-9/12 h-5/6 m-4">
                    <div className="">
                        <div className=" flex justify-center items-center content-center flex-row flex-wrap">
                            <div className="flex w-full mb-8">
                                <div className="flex w-full">
                                    <div
                                        className="flex flex-col container mx-auto items-center justify-center bg-white dark:bg-gray-800 rounded-lg shadow">
                                        <ul id="campground-list"
                                            className="flex flex-col divide-y w-full overflow-y-auto h-auto max-h-64 scrollbar-hide rounded-lg bg-white">
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white p-8 grid grid-cols-1">
                                <div id="campground-name"
                                    className="flex justify-center items-center font-center text-center text-3xl font-bold">
                                    {name}
                                </div>
                                <div>
                                    <form>
                                        <div date-rangepicker className="flex flex-wrap justify-center p-8 items-center">
                                            <div className="relative">
                                                <div
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                        fill="currentColor" viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd"
                                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <input id="start-date" name="start" type="text"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Select date start"></input>
                                            </div>
                                            <span className="mx-4 text-gray-500 text-center basis-full md:basis-10">to</span>
                                            <div className="relative">
                                                <div
                                                    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                        fill="currentColor" viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd"
                                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                </div>
                                                <input id="end-date" name="end" type="text"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder="Select date end"></input>
                                            </div>
                                            <button type="button"
                                                className="px-5 py-2 m-4 text-base font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                onclick="trackCampground()">Track</button>
                                        </div>
                                    </form>
                                    <div id="confirmation-toast" className="flex justify-center items-center">

                                    </div>
                                </div>
                                <div className="overflow-y-auto h-auto max-h-96">
                                    <div id="campground-description" dangerouslySetInnerHTML={{ __html: campgroundDetails.facilityDescription }}>
                                    </div>
                                    <div id="campground-directions" dangerouslySetInnerHTML={{ __html: campgroundDetails.facilityDirections }}>
                                    </div>
                                </div>
                                <div id="images"
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}