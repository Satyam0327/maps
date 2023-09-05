import React from 'react';
import Maps from './maps';
import { MapContainer} from 'react-leaflet';
import './Map.css';
function App() {
  return (
        <div className='main-div'>
          <MapContainer >
            <Maps/>
          </MapContainer>
        </div>
  );
}

export default App;

