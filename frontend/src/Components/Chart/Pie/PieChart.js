import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'My Dataset',
        data: [12, 19, 3, 5, 2, 3], // Temporary data
        backgroundColor: ['#f2f2f2', '#2196F3', '#FFEB3B', '#4CAF50', '#9C27B0', '#FF9800'], // Matching colors
        borderColor: '#fff',
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
