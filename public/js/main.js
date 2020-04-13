require('dotenv').config()
const googleMaps = require('@google/maps')
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY

const GeocoderRequest = googleMaps.maps.GeocoderRequest()

GeocoderRequest.geocode("3208, West Diversey Ave, Chicago IL")
let location = GeocoderRequest.geocode("3208, West Diversey Ave, Chicago IL 60647");

console.log(location);

function initMap() {
	location = ""
	
	const map = new google.maps.Map(document.getElementById('map'), {
		center: location,
		zoom: 15
	});

	const marker = new google.maps.Marker({position: location, map: map})
}