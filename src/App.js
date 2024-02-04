import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ShipmentDetails from './ShipmentDetails';

function App() {
  const shipments = [
    {
      id: 1,
      scenario: 'normal',
      riskScore: 2,
      isSafeZone: true,
      milesLeft: 2,
      totalMiles: 4,
      temperature: 48,
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
      id: 2,
      scenario: 'traffic',
      routeScore: 63,
      riskScore: 98,
      isSafeZone: null,
      milesLeft: 2,
      totalMiles: 3,
      temperature: 56,
      driverName: "Peter Williams",
      driverPhoneNumber: "410-284-5829",
      vehicleLicensePlate: "DIW3948",
      vehicleType: "Tanker",
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
    {
      id: 3,
      scenario: 'custom',
      routeScore: 22,
      riskScore: 53,
      isSafeZone: false,
      milesLeft: 4,
      totalMiles: 5,
      temperature: 12,
      driverName: "Luke McQueen",
      driverPhoneNumber: "214-384-2228",
      vehicleLicensePlate: "JDI2948",
      vehicleType: "Lowbed",
      vehicleColor: "Black",
      company: "Company GHI",
      companyRating: 1,
      units: 43,
      safetyScore: "Satisfactory",
      originCity: "Austin, TX",
      originDate: "1/22/24 4:25pm",
      destinationCity: "Cleveland, OH",
      destinationDate: "1/23/24 1:14am",
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
