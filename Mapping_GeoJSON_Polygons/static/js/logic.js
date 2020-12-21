// Add console.log to check to see if our code is working.
console.log("working");


// // Add GeoJSON data.
// let sanFranAirport =
// {
//     "type": "FeatureCollection", "features": [{
//         "type": "Feature",
//         "properties": {
//             "id": "3469",
//             "name": "San Francisco International Airport",
//             "city": "San Francisco",
//             "country": "United States",
//             "faa": "SFO",
//             "icao": "KSFO",
//             "alt": "13",
//             "tz-offset": "-8",
//             "dst": "A",
//             "tz": "America/Los_Angeles"
//         },
//         "geometry": {
//             "type": "Point",
//             "coordinates": [-122.375, 37.61899948120117]
//         }
//     }
//     ]
// };

// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(map);

// // Grabbing our GeoJSON data.
// // L.geoJson(sanFranAirport, {
// //     // We turn each feature into a marker on the map.
// //     pointToLayer: function (feature, latlng) {
// //         console.log(feature);
// //         return L.marker(latlng)
// //             .bindPopup("<h2>" + feature.properties.name + "</h2>" + "<hr></hr>" + "<h3>" + feature.properties.city + ", " + feature.properties.country + "</h3");
// //     }
// // }).addTo(map);

// L.geoJSON(sanFranAirport, {
//     onEachFeature: function (feature, layer) {
//         console.log(layer);
//         layer.bindPopup("<h2>" + feature.properties.name + "</h2>" + "<hr></hr>" + "<h3>" + feature.properties.city + ", " + feature.properties.country + "</h3");
//     }
// }).addTo(map);

// // Create a polyline using the line coordinates and make the line red.
// L.polyline(line, {
//     color: "blue",
//     dashArray: '20, 20',
//     dashOffset: '20'
// }).addTo(map);

// //  Add a marker to the map for Los Angeles, California.
// // Get data from cities.js
// let cityData = cities;

// // Loop through the cities array and create one marker for each city.
// cityData.forEach(function (city) {
//     console.log(city)
//     L.circleMarker(city.location, {
//         radius: city.population / 200000,
//         color: 'orange',
//         weight: 4
//     })
//         .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//         .addTo(map);
// });

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
    "Street": streets,
    "Satellite Streets": satelliteStreets
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

let torontoHoods = "https://raw.githubusercontent.com/treywehr1/Mapping_Earthquakes/main/torontoNeighborhoods.json"

// Grabbing our GeoJSON data.
d3.json(torontoHoods).then(function (data) {
    console.log(data);
    // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
        color: "blue",
        weight: 1,
        fillColor: "yellow",
        onEachFeature: function (feature, layer) {
            console.log(layer);
            layer.bindPopup("<h2>" + "Neighborhood: " + feature.properties.AREA_NAME + "</h2>" + "<hr></hr>" + "<h3>" + feature.properties.AREA_S_CD + ", " + feature.properties.country + "</h3");
        }
    }).addTo(map);
});