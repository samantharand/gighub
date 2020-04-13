require('dotenv').config()
const googleMaps = require('@google/maps')
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY


let map;

function initMap() {
map = new google.maps.Map(document.getElementById('map'), {
  center: {lat: 41.8781, lng: -87.6298},
  zoom: 8
});
}