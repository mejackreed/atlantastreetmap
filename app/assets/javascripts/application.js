// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require twitter/bootstrap
//= require_tree .

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
function init() {

	var streetCar = [33.75444183019402, -84.38660860061646]

	map = L.map('map').setView(streetCar, 16);

	L.tileLayer('http://{s}.tile.cloudmade.com/{key}/22677/256/{z}/{x}/{y}.png', {
		attribution : 'Map data &copy; 2011 OpenStreetMap contributors, Imagery &copy; 2012 CloudMade',
		key : 'BC9A493B41014CAABB98F0471D759707'
	}).addTo(map);
	
	map.on('locationfound', onLocationFound);

	function getPopupContent(data) {
		popup = ""
		popup += "<h4>" + data.type + "</h4>";
		popup += "<p>Starts: " + data.start_of_closure + "</p>";
		popup += "<p>Ends: " + data.end_of_closure + "</p>";
		popup += "<p>Starts: " + popup.start_of_closure + "</p>";

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
