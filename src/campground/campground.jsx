import React from 'react'
import { useParams } from 'react-router-dom'
import './campground.css'
import 'flowbite';
import Datepicker from "flowbite-datepicker/Datepicker";
import { Button, TextInput } from 'flowbite-react';
import { Spinner } from 'flowbite-react';
import { AuthState } from '../login/authState';

export function Campground({ authState }) {
    const { id, name } = useParams()
    const [campgroundDetails, setCampgroundDetails] = React.useState('')
    const [campgroundImages, setCampgroundImages] = React.useState([])
    const [loaded, setLoaded] = React.useState(false)
    const [date, setDate] = React.useState(null)
    const [nights, setNights] = React.useState(1)
    const [trackerItem, setTrackerItem] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [trackerSet, setTrackerSet] = React.useState(false)
    console.log('authState:' + authState)

    React.useEffect(() => {

        async function calculateEndDate(dateString, numberOfDaysToAdd) {
            const endDate = new Date(dateString);
            endDate.setDate(endDate.getDate() + numberOfDaysToAdd);
            console.log('end date: ' + endDate.getDate)
            // format the date as a string in mm/dd/yyyy format
            return `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`;
        }

        async function setTracker() {
            const end_date = await calculateEndDate(date, parseInt(nights))
            return await fetch('/api/add_tracker', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'campground_id': `${id}`,
                    'device_token': `${localStorage.getItem('userName')}`,
                    'campground_name': `${name}`,
                    'start_date': `${date}`,
                    'end_date': `${end_date}`
                })
            })
        }
        if (trackerItem) {
            setLoading(true)
            setTracker()
                .then(() => setLoading(false))
                .then(() => setTrackerSet(true))
        }
    }, [trackerItem, date])

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

        async function getCampgroundImages(campground_id) {
            return await fetch('/api/campground_images', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'campground_id': `${campground_id}`,
                })
            })
        }

        if (id) {
            getCampgroundDetails(id)
                .then((response) => response.json())
                .then((data) => setCampgroundDetails(data))
                .then(() => getCampgroundImages(id))
                .then((response) => response.json())
                .then((data) => setCampgroundImages(data.images))
                .then(() => setLoaded(true))
                .catch((e) => console.log(e))
        }
    }, [])

    React.useEffect(() => {
        if (loaded && authState === AuthState.Authenticated) {
            const datepickerEl = document?.getElementById("datepickerId");
            new Datepicker(datepickerEl, {});
        }
    }, [loaded]);

    return (
        <main>
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
                <div className="h-5/6 flex flex-row justify-center items-center flex-wrap">
                    <div className="md:w-9/12 h-5/6">
                        <div className="">
                            <div className=" flex justify-center items-center content-center flex-row flex-wrap">
                                <div className="bg-white p-4 grid grid-cols-1">
                                    <div className='flex justify-between items-center border-b pb-4 border-gray-500'>
                                        <div id="campground-name"
                                            className="flex font-center text-center text-3xl font-bold">
                                            {name}
                                        </div>
                                    </div>

                                    <div id="images"
                                        className="gap-4 columns-3 rounded-lg mt-4">
                                        {campgroundImages !== undefined && campgroundImages.slice(0, 6).map((image, index) => (
                                            <img key={index} src={image} alt={`Image ${index}`} className={`w-full mb-4 rounded-lg`} />
                                        ))}
                                    </div>
                                    <div>
                                    </div>
                                    <div className='flex mt-8 flex-wrap mb-24'>
                                        <div className="h-auto lg:w-3/4 w-full mb-8">
                                            <div id="campground-description" dangerouslySetInnerHTML={{ __html: campgroundDetails.facilityDescription }}>
                                            </div>
                                            <div id="campground-directions" dangerouslySetInnerHTML={{ __html: campgroundDetails.facilityDirections }}>
                                            </div>
                                        </div>
                                        {authState === AuthState.Authenticated && (
                                            <div className='flex p-1 lg:w-1/4 w-screen lg:pl-8'>
                                                <div className='flex flex-col w-full'>
                                                    <div className='flex flex-col rounded-lg border mr-4 w-full mb-6'>
                                                        <div className="relative w-full border-b p-1">
                                                            <input
                                                                datepicker
                                                                datepicker-autohide
                                                                type="text"
                                                                className="text-gray-900 sm:text-sm border-none block w-full p-2.5 focus:ring-0 focus:ring-offset-0"
                                                                placeholder="Select date"
                                                                // onSelect={(e) => console.log(e.target.value)}
                                                                onSelect={(e) => setDate(e.target.value)}
                                                                // onClick={(e) => dobHandler(e)}
                                                                // onClick={(e) => console.log(e.target.value)}
                                                                // onChange={(e) => console.log(e)}
                                                                id="datepickerId"
                                                            ></input>
                                                            <div className="flex absolute inset-y-0 right-0 items-center pr-3 pointer-events-none">
                                                                <svg
                                                                    aria-hidden="true"
                                                                    class="w-5 h-5 text-gray-500 dark:text-gray-400"
                                                                    fill="currentColor"
                                                                    viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                >
                                                                    <path
                                                                        fill-rule="evenodd"
                                                                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                                                        clip-rule="evenodd"
                                                                    ></path>
                                                                </svg>
                                                            </div>

                                                        </div>
                                                        <div>
                                                            <input type="number" id="first_name" class="text-gray-900 text-sm rounded-lg border-none focus:ring-0  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Num nights" required
                                                                onChange={(e) => setNights(e.target.value)}></input>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        {!loading && (
                                                            <Button size="lg" className='w-full' onClick={() => setTrackerItem(true)}>
                                                                {trackerSet ? 'Tracker Set' : 'Track'}
                                                            </Button>
                                                        )}
                                                        {loading && (
                                                            <Button size="lg" className='w-full' onClick={() => setTrackerItem(true)}>
                                                                <Spinner aria-label="Spinner button example" />
                                                                <span className="pl-3">
                                                                    Setting Tracker
                                                                </span>
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </main>
    )
}