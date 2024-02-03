import React, { useState, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import WeatherDisplay from './WeatherDisplay';

const App = () => {
  const [center, setCenter] = useState({ lat: 40.4432, lng: -79.9428 });
  const [zoom, setZoom] = useState(11);

  const handleApiLoaded = (map, maps) => {
    const directionsService = new maps.DirectionsService();
    const directionsRenderer = new maps.DirectionsRenderer();

    directionsRenderer.setMap(map);

    const request = {
      origin: '5000 Forbes Avenue Pittsburgh PA 15213',
      destination: '5646 Northumberland St Pittsburgh PA 15217',
      travelMode: 'DRIVING',
    };

    directionsService.route(request, (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
      }
    });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      <div style={{ flex: 1 }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        />
      </div>
      <div style={{ flex: 1 }}>
        <WeatherDisplay lat={center.lat} lng={center.lng} />
      </div>
    </div>
  );
};

export default App;
