import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { useEffect } from 'react';

const LineChart = ({ reviewed, allcentiles, upper, lower }) => {
    useEffect(() => {

      const ctx = document.getElementById('acquisitions').getContext('2d');
      const myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: reviewed,
          datasets: [{
            label: 'Weight centile',
            data: allcentiles,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            fill: false,
          },
            {
                label: 'Upper centile goal',
                data: Array(reviewed.length).fill(upper),
                borderWidth: 1,
                borderColor: 'rgba(255, 0, 0, 1)',
            }, {
                label: 'Lower centile goal',
                data: Array(reviewed.length).fill(lower),
                borderWidth: 1,
                borderColor: 'rgba(255, 0, 0, 1)',
            }],
        }, options: {
            scales: {
              y: {
                suggestedMin: 0, // Set the minimum value
                suggestedMax: 100, // Set the maximum value
              },
            },
          },
        });
  
      // Cleanup on component unmount
      return () => {
        myChart.destroy();
      };
    }, [reviewed, allcentiles, upper, lower]);
  
    return (
      <canvas id="myChart" width="100" height="200"></canvas>
    );
  };
  
  export default LineChart;