import { Chart } from 'chart.js';

export function createRatingChart(data) {
  // Create a new chart with the given data
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  return myChart;
}
