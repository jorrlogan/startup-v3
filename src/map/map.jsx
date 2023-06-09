import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './map.css'
import { Spinner } from 'flowbite-react';


const Map = () => {

    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ycmxvZ2FuIiwiYSI6ImNsZnVqMTIydjAycTAzZ250bG1wc2xmc3cifQ.mZwH-XJARtUN7Ru4Y9N-mA';

    const [map, setMap] = useState(null);
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = React.useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/locations');
            const campgrounds = await response.json()
            const data = await parseLocations(campgrounds.campgrounds)
            setData(data);
        };
        if (data === null){
            fetchData();
        }
    }, [data]);

    useEffect(() => {
        console.log(data)
        if (data && map) {
            const geojson = {
                type: "FeatureCollection",
                features: data.map((d) => ({
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [d.longitude, d.latitude],
                    },
                    properties: {
                        name: d.name,
                        description: '',
                        id: d.id
                    },
                })),
            };

            // add markers to map
            for (const feature of geojson.features) {
                // create a HTML element for each feature
                const el = document.createElement('div');
                el.className = 'marker';
            
                // make a marker for each feature and add to the map
                new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        `<h3><a href=${`${`http://${window.location.hostname}:${window.location.port}/campground/` + feature.properties.id + '/' + encodeURIComponent(feature.properties.name)}`}>${feature.properties.name}</a></h3>`  
                        // `<h3>${point.name}</h3>`
                    )
                )
                .addTo(map);
            }
            setLoaded(true)
            // Clean up
            return () => map.remove();
    }
    }, [data, map]);

    useEffect(() => {
        const initializeMap = () => {
            const map = new mapboxgl.Map({
                container: "map",
                style: "mapbox://styles/mapbox/streets-v11",
                center: [-100.83, 40.9],
                zoom: 4,
            });

            setMap(map);
        };

        if (!map) {
            initializeMap();
        }
    }, [map]);


    async function parseLocations(campgrounds) {
        let features = []
        for (let i = 0; i < campgrounds.length; ++i) {
            let geo_json = JSON.parse(campgrounds[i].geo_json)
            if (geo_json["COORDINATES"] !== null) {
                let longitude = geo_json["COORDINATES"][0]
                let latitude = geo_json["COORDINATES"][1]
                if (longitude !== null && latitude !== null) {
                    features.push({
                        id: campgrounds[i].campground_id,
                        name: campgrounds[i].campground_name,
                        longitude: longitude,
                        latitude: latitude
                    })
                }
            }
        }
        return features
    }

    return (
        <div className="flex justify-center mt-8">
        <div id="map" className="w-9/12 rounded-lg" style={{ height: "80vh" }}></div>
        <div id="infoi">
        { !loaded && (
        <div className='flex justify-center'>
            <Spinner
                color="info"
                aria-label="Info spinner example"
                size="xl"
                className='mt-8'
            />
        </div>
        )}
        </div>
        </div>
       
    )
};

export default Map;