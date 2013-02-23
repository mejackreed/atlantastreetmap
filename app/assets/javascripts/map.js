var map;

$(window).load(function() {
	var h = $(window).height(), offsetTop = 200, mapOffsetTop = -20;
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

}

function getPopupContent(data) {
	popup = ""
	//	popup += "<h4>" + data.type + "</h4>";
	popup += "<p>" + data.road_closed + " closed from " + data.road_closed_from + " to " + data.road_closed_to + "</p>"
	popup += "Ends: " + data.end_of_closure + "<br>";
	popup += "<p>Share it! "
	popup += '<a href="https://twitter.com/intent/retweet?tweet_id=' + data.tweet_id + '&related=twitterapi,twittermedia,twitter,support" class="btn" target=_blank><i class="icon-twitter-sign"></i></a> '
	popup += '<a href="#" class="btn"><i class="icon-facebook-sign"></i></a>'
	//popup += '<a href = "https://twitter.com/share" class = "twitter-share-button" data-lang="en" data-text="This is the point">Tweet</a>';
	return popup
}

function addMarkers(data) {
	_.each(data, function(data) {
		//console.log(data)
		L.marker([data.latitude, data.longitude], {
		}).addTo(map).bindPopup(getPopupContent(data))
	})
}

function getMarkers() {
	console.log('data')
	console.log('test')
	$.get('http://atlantastreetmap.herokuapp.com/road_closures', function(data) {
		addMarkers(data)
	})
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

var staticData = [{
	"created_at" : "2013-02-23T14:35:38Z",
	"description" : "This road has had a tree fall on it.\r\n\r\nCrazy!",
	"end_of_closure" : "2013-04-03",
	"id" : 1,
	"latitude" : 33.776446,
	"longitude" : -84.379884,
	"road_closed" : "Myrtle Street",
	"road_closed_from" : "Ponce De Leon",
	"road_closed_to" : "4th Street",
	"tweet_id" : null,
	"updated_at" : "2013-02-23T14:35:38Z"
}, {
	"created_at" : "2013-02-23T16:42:11Z",
	"description" : "Godzilla attacked!",
	"end_of_closure" : "2013-04-12",
	"id" : 2,
	"latitude" : 33.776276,
	"longitude" : -84.382982,
	"road_closed" : "Juniper Street",
	"road_closed_from" : "10th Street",
	"road_closed_to" : "Ponce De Leon",
	"tweet_id" : "305356894371995650",
	"updated_at" : "2013-02-23T16:42:11Z"
}, {
	"created_at" : "2013-02-23T16:45:44Z",
	"description" : "Govathon has shut this party down!",
	"end_of_closure" : "2013-03-03",
	"id" : 3,
	"latitude" : 33.748126,
	"longitude" : -84.390664,
	"road_closed" : "Trinity Ave",
	"road_closed_from" : "Central Ave",
	"road_closed_to" : "Washington Ave",
	"tweet_id" : "305357786110369793",
	"updated_at" : "2013-02-23T16:45:44Z"
}, {
	"created_at" : "2013-02-23T16:51:46Z",
	"description" : "The street car is coming Atlanta! ARE YOU READY?",
	"end_of_closure" : "2013-04-02",
	"id" : 4,
	"latitude" : 33.755539,
	"longitude" : -84.38531,
	"road_closed" : "Auburn Ave",
	"road_closed_from" : "Peachtree Center",
	"road_closed_to" : "Courtland St",
	"tweet_id" : "305359303798300672",
	"updated_at" : "2013-02-23T16:51:46Z"
}]

