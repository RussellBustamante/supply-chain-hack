import React, { useEffect, useRef } from 'react';
// Import Chart, LineController, and other necessary modules from 'chart.js'
import { 
  Chart, 
  LineController, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';

const DistanceChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Register the components and controllers you will use
    Chart.register(
      LineController,
      CategoryScale, 
      LinearScale, 
      PointElement, 
      LineElement, 
      Title, 
      Tooltip, 
      Legend
    );

    const myChart = chartRef.current;
    if (myChart) {
      // If a chart instance already exists, destroy it before creating a new one
      if (window.myChartInstance) {
        window.myChartInstance.destroy();
      }
      // Create a new Chart instance and assign it to a global variable for later access
      window.myChartInstance = new Chart(myChart, {
        type: 'line', // This now works because LineController is registered
        data: {
          labels: data.map((_, i) => i),
          datasets: [{
            label: 'Distance Delta',
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: { // Ensure it uses the registered LinearScale
              beginAtZero: true
            }
          }
        }
      });
    }
    // Cleanup function to destroy the chart instance when the component unmounts
    return () => {
      if (window.myChartInstance) {
        window.myChartInstance.destroy();
      }
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default DistanceChart;
