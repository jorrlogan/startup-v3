import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

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
        fetchData();
    }, []);

    useEffect(() => {
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

            map.on("load", () => {
                map.addSource("points", {
                    type: "geojson",
                    cluster: true,
                    clusterMaxZoom: 22,
                    clusterRadius: 50,
                    data: geojson,
                });
                map.addLayer({
                    id: "points",
                    type: "circle",
                    source: "points",
                    paint: {
                        "circle-radius": 6,
                        "circle-color": "#007cbf",
                      },
                });

                map.on("click", "points", (e) => {
                    const coordinates = e.features[0].geometry.coordinates.slice();
                    const { name, description } = e.features[0].properties;

                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(`<h3>${name}</h3><p>${description}</p>`)
                        .addTo(map);
                });

                map.on("mouseenter", "points", () => {
                    map.getCanvas().style.cursor = "pointer";
                });

                map.on("mouseleave", "points", () => {
                    map.getCanvas().style.cursor = "";
                });
            });
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