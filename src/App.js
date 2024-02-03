import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ShipmentDetails from './ShipmentDetails';

function App() {
  const shipments = [
    {
      id: 0,
      riskScore: 2,
      isSafeZone: true,
      milesLeft: 2502,
      totalMiles: 3000,
      temperature: 34,
      driverName: "John Smith",
      driverPhoneNumber: "412-123-4567",
      vehicleLicensePlate: "MNE2394",
      vehicleType: "Flatbed",
      vehicleColor: "Blue",
      company: "Company ABC",
      companyRating: 5,
      units: 500,
      safetyScore: "Conditional",
      originCity: "Houston, TX",
      originDate: "1/2/24 6:21am",
      destinationCity: "Pittsburgh, PA",
      destinationDate: "1/4/24 9:41am",
    },
    {
      id: 1,
      routeScore: 63,
      riskScore: 98,
      isSafeZone: null,
      milesLeft: 100,
      totalMiles: 3402,
      temperature: 12,
      driverName: "Peter Williams",
      driverPhoneNumber: "410-284-5829",
      vehicleLicensePlate: "DIW3948",
      vehicleType: "Box Truck",
      vehicleColor: "White",
      company: "Company DEF",
      companyRating: 3,
      units: 235,
      safetyScore: "Unsatisfactory",
      originCity: "Baltimore, MD",
      originDate: "1/23/24 5:21pm",
      destinationCity: "Cleveland, OH",
      destinationDate: "1/24/24 1:01am",
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage shipments={shipments} />} />
        <Route path="/shipment/:id" element={<ShipmentDetails shipments={shipments} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
