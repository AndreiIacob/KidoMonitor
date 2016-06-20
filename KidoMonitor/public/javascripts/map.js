/**
 * Created by Cosmin on 6/20/2016.
 */

var mapCenter = new google.maps.LatLng(54.19265, 16.1779); //Google map Coordinates
var map;
var markers = [];
var images = [];
var image = {
    url: 'Child icon.png',
    size: new google.maps.Size(24, 24),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 24)
};
images.push(image);
var image2 = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
    // The origin for this image is (0, 0).
    origin: new google.maps.Point(0, 0),
    // The anchor for this image is the base of the flagpole at (0, 32).
    anchor: new google.maps.Point(0, 32)
};
images.push(image2);
// Shapes define the clickable region of the icon. The type defines an HTML
// <area> element 'poly' which traces out a polygon as a series of X,Y points.
// The final coordinate closes the poly by connecting to the first coordinate.
var shape = {
    coords: [1, 1, 1, 23, 18, 23, 18, 1],
    type: 'poly'
};

var points = [
    ['Name1', 54.19245, 16.1779],
    ['Name2', 54.19295, 16.1779],
    ['Name3', 54.19315, 16.1819, 3],
    ['Name4', -33.80010128657071, 151.28747820854187, 2],
];
points.push(['Name5', -38.950198, 151.259302, 1]);

function initialize() //function initializes Google map
{
    var googleMapOptions =
    {
        center: mapCenter, // map center
        zoom: 15, //zoom level, 0 = earth view to higher value
        panControl: true, //enable pan Control
        zoomControl: true, //enable zoom control
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL //zoom control size
        },
        scaleControl: true, // enable scale control
        mapTypeId: google.maps.MapTypeId.ROADMAP // google map type
    };
    map = new google.maps.Map(document.getElementById("google_map"), googleMapOptions);
    google.maps.event.trigger(map, 'resize');
}

var rad = function (x) {
    return x * Math.PI / 180;
};

function getDistance(p1, p2) {
    var R = 6378137; // Earth’s mean radius in meter
    var dLat = rad(p2[0] - p1[0]);
    var dLong = rad(p2[1] - p1[1]);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(p1[0])) * Math.cos(rad(p2[0])) *
        Math.sin(dLong / 2) * Math.sin(dLong / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d; // returns the distance in meter

};


function addMarkers(points, imag) {
    for (var i = 0; i < points.length; i++) {
        var point = points[i];
        var marker = new google.maps.Marker({
            position: {lat: point[1], lng: point[2]},
            map: map,
            icon: imag,
            shape: shape,
            title: point[0],
            zIndex: point[3]
        });
        markers.push(marker);
    }

}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];

    //////////////////////////


var loc = [54.19365, 16.1779];

function distancePoint() {

    var str1 = "DISTANCE TO CLOSEST POINT: ";
    document.getElementById("pointDistanceh").innerHTML = str1;
    if (points.length > 0) {
        document.getElementById("pointDistanceh").innerHTML = 22;
        var point = points[0];
        var latLng = [point[1], point[2]];
        var distance = getDistance(latLng, loc);
        var minDistance = distance;
        for (var i = 1; i < points.length; i++) {
            point = points[i];
            latLng = [point[1], point[2]];
            distance = getDistance(latLng, loc);
            if (distance < minDistance) {
                minDistance = distance;
            }
        }
        var result = Math.trunc(minDistance);
        var res = str1.concat(result);
        var res = res.concat("m");
        document.getElementById("pointDistanceh").innerHTML = res;
    }
    else {
        document.getElementById("pointDistanceh").innerHTML = "No points set";
    }

}

var i = 0;

function Hello() {
    document.getElementById("pointDistanceh").innerHTML = i;
    i++;
}

function myFunction() {
    setInterval(distancePoint, 3000);
    setTimeout(function () {
        loc[0] = loc[0] + 1;
    }, 5000);

}

setTimeout(function () {
    distancePoint();
    myFunction()
}, 100);
}