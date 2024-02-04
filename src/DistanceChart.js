import React, { useEffect, useRef } from 'react';
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
  // console.log('data inside DistanceChart.js', data)
  useEffect(() => {
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
      if (window.myChartInstance) {
        window.myChartInstance.destroy();
      }
      window.myChartInstance = new Chart(myChart, {
        type: 'line',
        data: {
          labels: data.slice(-10).map(item => item ? new Date(item.time).toLocaleTimeString() : ''), // Use the reported time as the label
          datasets: [{
            label: 'Risk Probability',
            data: data.slice(-10).map(item => item ? item.value : null), // Use the value for the data
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          animation: false,
          scales: {
            y: {
              min: 0,
              max: 100,
            }
          }
        }
      });
    }
    return () => {
      if (window.myChartInstance) {
        window.myChartInstance.destroy();
      }
    };
  }, [data]);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ width: '85%', height: '70%' }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};

export default DistanceChart;
