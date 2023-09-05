
import L from 'leaflet';
import './App.css'; // Import your main CSS file
import 'leaflet';
 import "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";

 function MapComponent(){
 var map = L.map('map').setView([14.0860746, 100.608406], 6);
    var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
    osm.addTo(map);

    if (!navigator.geolocation) {
        console.log("Your browser doesn't support geolocation feature!")
    } else {
        setInterval(() => {
            navigator.geolocation.getCurrentPosition(getPosition)
        }, 5000);
    }

    var marker, circle;

    function getPosition(position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;
        var accuracy = position.coords.accuracy;

        if (marker) {
            map.removeLayer(marker);
        }

        if (circle) {
            map.removeLayer(circle);
        }

        marker = L.marker([lat, long]);
        circle = L.circle([lat, long], { radius: accuracy });

        var featureGroup = L.featureGroup([marker, circle]).addTo(map);
        map.fitBounds(featureGroup.getBounds(), { padding: [10, 10] });

        console.log("Your coordinate is: Lat: " + lat + " Long: " + long + " Accuracy: " + accuracy);
    }

    function zoomToMyLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var lat = position.coords.latitude;
                var long = position.coords.longitude;

                if (marker) {
                    map.removeLayer(marker);
                }

                if (circle) {
                    map.removeLayer(circle);
                }

                marker = L.marker([lat, long]).addTo(map);
                map.setView([lat, long], 15);

                console.log("Zoomed to your location: Lat: " + lat + " Long: " + long);
            });
        }
    }
  }

export default MapComponent;
