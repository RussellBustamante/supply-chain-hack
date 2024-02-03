// App.js
import React, { useState } from 'react';
import Normal from './scenarios/Normal';
// Import other scenarios...

const App = () => {
  const [scenario, setScenario] = useState('normal');

  const renderScenario = () => {
    switch (scenario) {
      case 'normal':
        return <Normal />;
      // Add cases for other scenarios...
      default:
        return <div>Unknown scenario: {scenario}</div>;
    }
  };

  return (
    <div>
      {/* Scenario selection logic, buttons, etc. */}
      {renderScenario()}
    </div>
  );
};

export default App;
