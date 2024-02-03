import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import WeatherDisplay from './WeatherDisplay';
import HoustonTrafficNews from './HoustonTrafficNews';

const App = () => {
  const [center, setCenter] = useState({ lat: 59.95, lng: 30.33 });
  const [zoom, setZoom] = useState(11);
  const apiKey = 'CiZjjRXogDTukTDGnzwgSbvzsIObmGaP'; // Replace with your TomTom API key

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }} 
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => {
            // You can access the Google Maps instance here and add additional functionality if needed
          }}
        >
          {/* You can add markers or other custom components as children of GoogleMapReact */}
        </GoogleMapReact>
      </div>
      <div style={{ flex: 1 }}>
        <WeatherDisplay lat={center.lat} lng={center.lng} />
      </div>

      <div>
        <HoustonTrafficNews/>
      </div>
      
    </div>
  );
};

export default App;
