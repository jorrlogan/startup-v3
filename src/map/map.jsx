import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import './map.css'
import { Link } from "react-router-dom";
import ReactDOMServer from "react-dom/server";


mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ycmxvZ2FuIiwiYSI6ImNsZnVqMTIydjAycTAzZ250bG1wc2xmc3cifQ.mZwH-XJARtUN7Ru4Y9N-mA';

const Map = () => {
    const [map, setMap] = useState(null);
    const [data, setData] = useState(null);

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
    }, []);

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
                    },
                })),
            };

      data.forEach((point) => {
        new mapboxgl.Marker()
        .setLngLat([point.longitude, point.latitude])
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(
                `<h3><a href=${`${'http://localhost:6002/campground/' + point.id + '/' + encodeURIComponent(point.name)}`}>${point.name}</a></h3>`  
                // `<h3>${point.name}</h3>`
              )
          )
        .addTo(map);
      });
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
            <div id="map" className="w-9/12 rounded-lg" style={{ height: "80vh" }}>

            </div>
        </div>
    )
};

export default Map;





// import React, { useEffect, useRef, useState } from "react";
// import mapboxgl from "mapbox-gl";
// import "mapbox-gl/dist/mapbox-gl.css";

// mapboxgl.accessToken = "pk.eyJ1Ijoiam9ycmxvZ2FuIiwiYSI6ImNsZnVqMTIydjAycTAzZ250bG1wc2xmc3cifQ.mZwH-XJARtUN7Ru4Y9N-mA";

// const Map = () => {
//     const [lng, setLng] = useState(-73.985664);
//     const [lat, setLat] = useState(40.748514);
//     const [zoom, setZoom] = useState(12);
//     const mapRef = useRef(null);
  
//     useEffect(() => {
//       const map = new mapboxgl.Map({
//         container: mapRef.current,
//         style: "mapbox://styles/mapbox/streets-v11",
//         center: [lng, lat],
//         zoom: zoom,
//       });
  
//       // Define the coordinates for your points
//       const points = [
//         [-73.9817, 40.7634],
//         [-73.9858, 40.7464],
//         [-73.9735, 40.7648],
//       ];
  
//       // Add the points to the map
//       points.forEach((point) => {
//         new mapboxgl.Marker().setLngLat(point).addTo(map);
//       });
  
//       // Clean up
//       return () => map.remove();
//     }, []);
  
//     return <div ref={mapRef} style={{ width: "100%", height: "500px" }} />;
//   };
  
//   export default Map;