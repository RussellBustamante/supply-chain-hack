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

        // Log any warnings
        for (let route of result.routes) {
          for (let warning of route.warnings) {
            console.log(warning);
          }
        }
  
        // Create a marker that represents the truck
        const truckMarker = new maps.Marker({
          position: result.routes[0].legs[0].steps[0].start_location,
          map: map,
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/truck.png", // replace with the URL of your truck icon
            scaledSize: new maps.Size(32, 32),
          },
        });
  
        // Get the path of the route
        const path = result.routes[0].overview_path;
  
        let step = 0; // the index of the current step
        let numSteps = 3000; // the number of steps in the animation
        let delay = 2000; // the delay in milliseconds between steps
  
        // Start the animation
        window.setInterval(() => {
          if (step < numSteps && path[step + 1]) {
            // Calculate the position of the truck
            const position = maps.geometry.spherical.interpolate(path[step], path[step + 1], 0.5);

            // Update the position of the truck marker
            truckMarker.setPosition(position);

            // Calculate the expected position of the truck
            const expectedPosition = position;

            // Calculate the current position of the truck
            const currentPosition = truckMarker.getPosition();

            // Calculate the distance between the current and expected positions
            const distance = maps.geometry.spherical.computeDistanceBetween(currentPosition, expectedPosition);

            console.log(`The truck is ${distance} meters away from its expected position.`);

            step++;
          }
        }, delay);
      }
    });

    const trafficLayer = new maps.TrafficLayer();
    trafficLayer.setMap(map);

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
