// src/components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const FirstQuad = ({ data }) => {
  const chartData = {
    labels: ['Active', 'Inactive','No Status'],
    datasets: [
      {
        data: [data.active, data.inactive,data.noStatus],
        backgroundColor: ['#4caf50', '#f44336','#000000'],
        hoverBackgroundColor: ['#388e3c', '#d32f2f','#000001'],
      },
    ],
  };

  return (
    <div>
      <h3>Device Status</h3>
      <Pie data={chartData} />
      <div>Total Devices: {data.active + data.inactive}</div>
    </div>
  );
};

export default FirstQuad;
