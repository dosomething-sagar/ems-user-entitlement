import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = () => {
  // const labels = Utils.months({count: 7});
const data = {
  labels: ['jan','feb','mar','apr','may','jun','july'],
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    fill: false,
    borderColor: 'rgb(75, 192, 192)',
    tension: 0.1
  }]
};

  return <Line data={data} />;
};

export default LineChart;
