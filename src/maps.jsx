import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import './Map.css';
import 'leaflet/dist/leaflet.css';

function Maps() {
  const [markers, setMarkers] = useState([]);
  const [circle, setCircle] = useState(null);
  const [selectMode, setSelectMode] = useState(false);
  const mapRef = useRef(null);

  const showCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const success = (pos) => {
    const lat = pos.coords.latitude;
    const lng = pos.coords.longitude;
    const accuracy = pos.coords.accuracy;

    const newMarkers = [{ lat, lng }];
    setMarkers(newMarkers);
    setCircle({ lat, lng, radius: accuracy });

    const map = mapRef.current;
    map.setView([lat, lng], 15);

    console.log(`Latitude: ${lat}, Longitude: ${lng}`);
  };

  const error = (err) => {
    if (err.code === 1) {
      alert("Please allow geolocation access");
    } else {
      alert("Cannot get the current location");
    }
  };

  const handleMapClick = (e) => {
    if (selectMode) {
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      const newMarkers = [...markers, { lat, lng }];
      setMarkers(newMarkers);
      console.log(`Selected Latitude: ${lat}, Longitude: ${lng}`);
    }
  };

  const toggleSelectMode = () => {
    setSelectMode(!selectMode);
  };

  return (
    <div className='map-container'>
      <MapContainer
        ref={mapRef}
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: '40rem', width: '60%', background: 'transparent' }}
        onClick={handleMapClick}
      >
        <TileLayer
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={19}
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
        {circle && <Circle center={circle} radius={circle.radius} />}
      </MapContainer>
      <button id="showLocationButton" onClick={showCurrentLocation}>
        Show My Location
      </button>
      <button id="toggleSelectModeButton" onClick={toggleSelectMode}>
        {selectMode ? 'Disable Location Selection' : 'Enable Location Selection'}
      </button>
    </div>
  );
}

export default Maps;
