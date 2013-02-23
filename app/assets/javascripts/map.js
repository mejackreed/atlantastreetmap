var map;

$(window).load(function() {
	// $(window).resize(function() {
	// var h = $(window).height(), offsetTop = 40, mapOffsetTop = -20;
	// var w = $(window).width(), offsetLeft = 345;
	// $('#map').css('height', h - offsetTop)
	// $('#map').css('width', w)
	//
	// })
	var h = $(window).height(), offsetTop = 200, mapOffsetTop = -20;
	var w = $(window).width(), offsetLeft = 345;
	$('#map').css('height', h - offsetTop)
	//$('#map').css('width', w)

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
				map.setView([lat, lng], 15)
				L.marker([lat, lng]).addTo(map)

			}
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

	function getPopupContent(data) {
		var tweet_id = "305345675787390978";
		popup = ""
		popup += "<h4>" + data.type + "</h4>";
		popup += "<p>" + data.road_closed + " closed from " + data.road_closed_from + " to " + data.road_closed_to + "</p>"
		popup += "Starts: " + data.start_of_closure + "<br>";
		popup += "Ends: " + data.end_of_closure + "<br>";
		popup += "<p>Share it! "
		popup += '<a href="https://twitter.com/intent/retweet?tweet_id=' + tweet_id + '&related=twitterapi,twittermedia,twitter,support" class="btn" target=_blank><i class="icon-twitter-sign"></i></a> '
		popup += '<a href="#" class="btn"><i class="icon-facebook-sign"></i></a>'
		//popup += '<a href = "https://twitter.com/share" class = "twitter-share-button" data-lang="en" data-text="This is the point">Tweet</a>'; 
		return popup
	}

	//console.log(fakeData1)
	_.each(fakeData1.points, function(data) {
		//console.log(data)
		L.marker([data.latitude, data.longitude], {
		}).addTo(map).bindPopup(getPopupContent(data))
	})
	// L.geoJson(fakeData, {
	// onEachFeature : onEachFeature,

	//}).addTo(map);
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

	//L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();

	L.circle(e.latlng, radius).addTo(map);
}

var fakeData1 = {
	"points" : [{
		"tweet_id" : "305345675787390978",
		"latitude" : 33.75444,
		"longitude" : -84.38221,
		"type" : "Streetcar Construction",
		"start_of_closure" : 123,
		"end_of_closure" : 123,
		"road_closed" : "Edgewood Avenue",
		"road_closed_from" : "Piedmont Ave",
		"road_closed_to" : "Jesse Hill Jr. Drive",
		"description" : "Edgewood Avenue closed from Piedmont Ave to Jesse Hill Jr. Drive"
	}, {
		"tweet_id" : "305345675787390978",
		"latitude" : 33.75444,
		"longitude" : -84.380226,
		"type" : "Streetcar Construction",
		"start_of_closure" : 123,
		"end_of_closure" : 123,
		"road_closed" : "Edgewood Avenue",
		"road_closed_from" : "Piedmont Ave",
		"road_closed_to" : "Jesse Hill Jr. Drive",
		"description" : "Edgewood Avenue closed from Piedmont Ave to Jesse Hill Jr. Drive"
	}]
}

var fakeData = {

	"type" : "FeatureCollection",
	"features" : [{
		"type" : "Feature",
		"properties" : {
			"Name" : "Streetcar Construction",
			"Description" : ""
		},
		"geometry" : {
			"type" : "Point",
			"coordinates" : [-84.38221, 33.75444, 0.0]
		}
	}, {
		"type" : "Feature",
		"properties" : {
			"Name" : "Streetcar Construction",
			"Description" : ""
		},
		"geometry" : {
			"type" : "Point",
			"coordinates" : [-84.380226, 33.75444, 0.0]
		}
	}, {
		"type" : "Feature",
		"properties" : {
			"Name" : "Streetcar Construction",
			"Description" : ""
		},
		"geometry" : {
			"type" : "Point",
			"coordinates" : [-84.374001, 33.755466, 0.0]
		}
	}, {
		"type" : "Feature",
		"properties" : {
			"Name" : "Streetcar Construction",
			"Description" : ""
		},
		"geometry" : {
			"type" : "Point",
			"coordinates" : [-84.376762, 33.755531, 0.0]
		}
	}, {
		"type" : "Feature",
		"properties" : {
			"Name" : "Filming",
			"Description" : ""
		},
		"geometry" : {
			"type" : "Point",
			"coordinates" : [-84.386032, 33.772282, 0.0]
		}
	}, {
		"type" : "Feature",
		"properties" : {
			"Name" : "Filming",
			"Description" : ""
		},
		"geometry" : {
			"type" : "Point",
			"coordinates" : [-84.353523, 33.77383, 0.0]
		}
	}]
}
