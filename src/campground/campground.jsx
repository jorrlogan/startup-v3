import React from 'react'
import { useParams } from 'react-router-dom'
import './campground.css'
import 'flowbite';
import Datepicker from "flowbite-datepicker/Datepicker";
import { Button, TextInput } from 'flowbite-react';

export function Campground(props) {
    const { id, name } = useParams()
    const numbers = Array.from({ length: 14 }, (_, i) => i + 1);
    const [campgroundDetails, setCampgroundDetails] = React.useState('')
    const [campgroundImages, setCampgroundImages] = React.useState([])

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
            return await fetch('/api/campground/images', {
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
                .catch((e) => console.log(e))
        }
    }, [])

    React.useEffect(() => {
        const datepickerEl = document?.getElementById("datepickerId");
        // console.log(datepickerEl);
        new Datepicker(datepickerEl, {});
    }, []);

    return (
        <main>
            <div className="h-5/6 flex flex-row justify-center items-center flex-wrap">
                <div className="md:w-9/12 h-5/6">
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
                            <div className="bg-white p-4 grid grid-cols-1">
                                <div className='flex justify-between items-center border-b pb-4 border-gray-500'>
                                    <div id="campground-name"
                                        className="flex font-center text-center text-3xl font-bold">
                                        {name}
                                    </div>
                                    <div>
                                        {/* <div className='flex p-1'>
                                            <div className='flex'>
                                                <div className='flex rounded-lg border mr-4'>
                                                    <div className="relative w-36 border-r p-1">
                                                        <input
                                                            datepicker
                                                            datepicker-autohide
                                                            type="text"
                                                            className="text-gray-900 sm:text-sm border-none block w-full p-2.5 focus:ring-0 focus:ring-offset-0"
                                                            placeholder="Select date"
                                                            onSelect={(e) => console.log(e.target.value)}
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
                                                    <button id="dropdownDefaultButton" data-dropdown-toggle="dropdown" class="text-black focus:outline-none font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center" type="button">Nights <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

                                                    <div id="dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                                            {numbers.map((num) => (
                                                                <li>
                                                                    <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{num}</a>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div>
                                                    <Button size="lg">
                                                        Track
                                                    </Button>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>

                                <div id="images"
                                    className="gap-4 columns-3 rounded-lg mt-4">
                                    {campgroundImages.map((image, index) => (
                                        <img key={index} src={image} alt={`Image ${index}`} className={`w-full mb-4 rounded-lg`} />
                                    ))}
                                </div>
                                <div>
                                </div>
                                <div className='flex mt-8'>
                                    <div className="h-auto mb-24 w-3/4">
                                        <div id="campground-description" dangerouslySetInnerHTML={{ __html: campgroundDetails.facilityDescription }}>
                                        </div>
                                        <div id="campground-directions" dangerouslySetInnerHTML={{ __html: campgroundDetails.facilityDirections }}>
                                        </div>
                                    </div>
                                    <div className='flex p-1 w-1/4 pl-8'>
                                        <div className='flex flex-col w-full'>
                                            <div className='flex flex-col rounded-lg border mr-4 w-full mb-6'>
                                                <div className="relative w-full border-b p-1">
                                                    <input
                                                        datepicker
                                                        datepicker-autohide
                                                        type="text"
                                                        className="text-gray-900 sm:text-sm border-none block w-full p-2.5 focus:ring-0 focus:ring-offset-0"
                                                        placeholder="Select date"
                                                        onSelect={(e) => console.log(e.target.value)}
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
                                                    <input type="number" id="first_name" class="text-gray-900 text-sm rounded-lg border-none focus:ring-0  block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Num nights" required></input>
                                                </div>
                                            </div>
                                            <div>
                                                <Button size="lg" className='w-full'>
                                                    Track
                                                </Button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}