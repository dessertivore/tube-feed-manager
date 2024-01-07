import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import { useEffect } from 'react';

  /**
  * LineChart Component
  * 
  * Initializes a line chart to visualize weight centiles in comparison to upper and 
  * lower centile goals over a series of review dates.
  * @component
  * @param {Array} reviewed - An array of review dates to populate the x-axis of the chart.
  * @param {Array} allcentiles - An array of weight centiles corresponding to the review dates.
  * @param {number} upper - The upper centile goal for reference on the chart.
  * @param {number} lower - The lower centile goal for reference on the chart.
  * 
  * @returns {JSX.Element} A canvas element containing the rendered line chart.
  */ 
 
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