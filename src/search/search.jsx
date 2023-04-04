// import { response } from "express";
import React from "react";

import '../tailwinds.css'

export function Search() {
    const [campgrounds, setCampgrounds] = React.useState([])
    const [filteredCampgrounds, setFilteredCampgrounds] = React.useState([])
    const [searchString, setSearchString] = React.useState('')

    React.useEffect(() => {
        const params = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }

        fetch('/api/campgrounds', params)
            .then((response) => response.json())
            .then((data) => setCampgrounds(parseCampgrounds(data.campgroundList)))
            .catch((error) => console.log(error))
    }, []);

    React.useEffect(() => {
        const handleKeyDown = () => {
            if (campgrounds.length > 10) {
                setFilteredCampgrounds(campgrounds.filter(campground => campground.name.toLowerCase().includes(searchString)).slice(0, 10))
            }
        }

        document.addEventListener("keydown", handleKeyDown)
    }, [campgrounds, searchString])

    function parseCampgrounds(campgrounds) {
        let campgroundRows = []
        for (const camp of campgrounds) {
            campgroundRows.push({ id: camp.campgroundId, name: camp.campsiteName })
        }
        return campgroundRows
    }

    return (
        <div className="flex justify-center flex-col items-center justify-center mt-36">
            <form className="xl:w-5/12">
                <h1 className="text-center md:text-7xl text-5xl font-black mb-8 ">Campsnatch</h1>
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input type="text" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Campgrounds" required onChange={(search) => setSearchString(search.target.value)}></input>
                    <button type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
            <div>
                <ul>
                    {filteredCampgrounds.map((campground) => (
                        <div
                            key={campground.id} className="select-none cursor-pointer hover:bg-gray-50 flex flex-1 items-center p-4" onclick="selectCampground(${campground.id}, '${campground.name}')">
                            <div className="flex-1 pl-1">
                                <div class="font-medium dark:text-white">{campground.name}</div>
                            </div>
                            <div className="flex flex-row justify-center">
                                <button class="w-10 text-right flex justify-end">
                                    <svg width="20" fill="currentColor" height="20"
                                        className="hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500"
                                        viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z">
                                        </path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    )
}