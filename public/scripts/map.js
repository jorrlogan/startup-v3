
mapboxgl.accessToken = 'pk.eyJ1Ijoiam9ycmxvZ2FuIiwiYSI6ImNsZnVqMTIydjAycTAzZ250bG1wc2xmc3cifQ.mZwH-XJARtUN7Ru4Y9N-mA';

let geojson = {
    'type': 'FeatureCollection',
    'features': [
    ]
}

function createMap(geojson) {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/outdoors-v11',
        center: [-103.771556, 39.967243],
        zoom: 3
    });

    // add markers to map
    for (const feature of geojson.features) {
        // create a HTML element for each feature
        const el = document.createElement('div');
        el.className = 'marker';

        // make a marker for each feature and add it to the map
        new mapboxgl.Marker(el)
            .setLngLat(feature.geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                    .setHTML(
                        `<h3>${feature.properties.title}</h3><p>${feature.properties.description}</p>`
                    )
            )
            .addTo(map);
    }
}


window.addEventListener('load', async function (event) {
    let request = await fetch('https://tt7sxvlds5.execute-api.us-west-2.amazonaws.com/dev/locations', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    let json = await request.json()
    let campgrounds = json.campgrounds
    console.log("length: " + campgrounds.length)
    let features = []
    for (let i = 0; i < campgrounds.length; ++i) {
        let geo_json = JSON.parse(campgrounds[i].geo_json)
        if (geo_json["COORDINATES"] !== null) {
            let longitude = geo_json["COORDINATES"][0]
            let latitude = geo_json["COORDINATES"][1]
            if (longitude !== null && latitude !== null) {
                features.push({
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [longitude, latitude]
                    },
                    'properties': {
                        'title': campgrounds[i].campground_name,
                        'description': ""
                    }
                })
            }
        }
    }

    const geojson = {
        'type': 'FeatureCollection',
        'features': features
    };
    createMap(geojson)
})

createMap()
