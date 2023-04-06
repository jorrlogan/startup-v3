import React from "react";
import './about.css'
// import logan from '../assets/logan_fish_2.png'

export function About() {
    return (
        <div className="flex content-center">

            <div if="info" className="flex items-center flex-col mb-24">
                <p class="text-black text-2xl mb-8 mt-12 w-9/12">
                    Dear Campers,<br></br><br></br>

                    A year ago I was tasked with finding two campgrounds in Arches national park.
                    I was given short notice and had less than a week to book two campgrounds in one of the most popular national parks in the country.
                    I spend the following three days continually refreshing my browser to check for cancellations. I eventually lucked out and got two campgrounds.
                    <br></br><br></br>
                    As I reflected on my experience, I considered investigating if there was a bot to do this for me. I discovered an awesome website called <a href='https://campnab.com/'>Campnab</a>.
                    I came to the realization that there must be some apis out there to allow for this website to exist. After a few hours of google searches, I discovered the
                    recreation.gov api. It allows developers to consume all sorts of cool data related to recreation areas in the United States. I would seriously recommend it to
                    any who are interested.
                    <br></br><br></br>
                    All in all, I decided that I wanted to build my own version of Campnab. Thus, Campsnatch was born.
                    <br></br><br></br>
                    Campsnatch helps you get alerts when your favorite
                    campgrounds open up in
                    national parks and other recreation areas. You can search for campgrounds, see details for that
                    campground, and set up a
                    tracker with your email to get email notifications when someone cancels.<br /><br />I hope you have fun with Campsnatch and that it will get into some awesome campgrounds.
                    <br></br><br></br>
                    Sincerely,
                    <br></br>
                    The Fly Fisherman
                </p>
                {/* <div className="w-9/12">
                    <img src={logan} className="rounded-lg" />
                </div> */}
            </div>
        </div>
    )
}