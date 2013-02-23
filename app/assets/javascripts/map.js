var map;
var searchLocation;
var markers = [];


var construction = L.icon({
	iconUrl : 'assets/construction.png',
	//iconSize : [41, 65],
});

$(window).load(function() {
	var h = $(window).height(), offsetTop = 400, mapOffsetTop = -20;
	var w = $(window).width(), offsetLeft = 345;
	$('#map').css('height', h - offsetTop)
});

function geocodeAddress(input) { http://open.mapquestapi.com/geocoding/v1/address?location=
	var address = $('#searchAddress').val()
	$.ajax({
		url : "http://open.mapquestapi.com/geocoding/v1/address?location=" + address,
		dataType : 'jsonp',
		crossDomain : true,
		success : function(data) {
			console.log(data)
			console.log(data.results[0]['locations'])
			if (data.results.length > 0) {
				var lat = data.results[0]['locations'][0]['displayLatLng']['lat']
				var lng = data.results[0]['locations'][0]['displayLatLng']['lng']
				searchLocation = [lat, lng]
				map.setView([lat, lng], 15)
				L.marker([lat, lng]).addTo(map)
			}
		}
	})
}

function getGoogle() {
	$.ajax({
		url : 'https://maps.googleapis.com/maps/api/place/nearbysearch/output?json&query=food&location=' + searchLocation + "&key=AIzaSyDvesGbHTZewl2r-VzSJZ-tkdLpe2Wpyzw",
		dataType : 'jsonp',
		success : function(data) {
			console.log(data)
		}
	})
}

function init() {

	var streetCar = [33.75444183019402, -84.38660860061646]

	map = L.map('map').setView(streetCar, 15);

	L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
		attribution : 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
		key : 'BC9A493B41014CAABB98F0471D759707'
	}).addTo(map);

	map.on('locationfound', onLocationFound);

}

function getPopupContent(data) {
	popup = ""
	popup += "<p>" + data.road_closed + " closed from " + data.road_closed_from + " to " + data.road_closed_to + "</p>"
	popup += "Ends: " + data.end_of_closure + "<br>";
	popup += "<p>Share it! "
	popup += '<a href="https://twitter.com/intent/retweet?tweet_id=' + data.tweet_id + '&related=twitterapi,twittermedia,twitter,support" class="btn" target=_blank><i class="icon-twitter-sign"></i></a> '
	popup += '<a href="#" class="btn"><i class="icon-facebook-sign"></i></a>'
	return popup
}

function addMarkers(data) {
	_.each(data, function(data) {
		var streetClose = L.marker([data.latitude, data.longitude], {icon: construction
		}).addTo(map).bindPopup(getPopupContent(data))
		markers.push(streetClose)
	})
}

function getMarkers() {
	if (markers.length >0){
		_.each(markers, function(marker){
			map.removeLayer(marker)
		})
	}
	markers = []
	console.log(markers)
	$.get('http://atlantastreetmap.herokuapp.com/road_closures', function(data) {
		addMarkers(data)
	})
}

function openPopup(popup) {
  var popup = L.popup()
    .setLatLng([popup.latitude, popup.longitude])
    .setContent(getPopupContent(popup)).openOn(map);
}

function getLocation() {
	map.locate({
		setView : true,
		maxZoom : 16
	});
	//console.log('getloc')
}

function onLocationFound(e) {
	var radius = e.accuracy / 2;
	searchLocation = [e.latlng.lat, e.latlng.lng]
	//L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();

	L.circle(e.latlng, radius).addTo(map);
}
