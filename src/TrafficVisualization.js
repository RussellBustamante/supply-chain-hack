import React, { useEffect, useRef } from 'react';
import tt from '@tomtom-international/web-sdk-maps';
import * as ttServices from '@tomtom-international/web-sdk-services';

const TrafficVisualization = ({ apiKey }) => {
  const mapElement = useRef(null);

  useEffect(() => {
    const map = tt.map({
      key: apiKey,
      container: mapElement.current,
      center: [4.899, 52.372], // Center the map on a specific location
      zoom: 13, // Initial zoom level
    });
  
    map.addControl(new tt.FullscreenControl());
    map.addControl(new tt.NavigationControl());
  
    // After the map loads, add the traffic layer
    map.on('load', function () {
        map.addLayer({
          'id': 'trafficFlow',
          'type': 'line',
          'source': 'tomtom-traffic-flow',
          'layout': { 'visibility': 'visible' },
          // You might need to define paint properties or a source-layer depending on how the traffic data is structured
        });
      });
  
    return () => map.remove();
  }, [apiKey]);
  

  return <div ref={mapElement} style={{ width: '100%', height: '400px' }} />;
};

export default TrafficVisualization;
