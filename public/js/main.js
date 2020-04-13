require('dotenv').config()
const googleMaps = require('@google/maps')
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY


function initMap() {
	const location = {lat: 41.932260, lng: -87.707900};
	const map = new google.maps.Map(document.getElementById('map'), {
		center: location,
		zoom: 15
	});
	const marker = new google.maps.Marker({position: location, map: map})
}

