

import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const FirstQuad = ({ data }) => {
  

  const chartData = {
    labels: ['Active', 'Inactive'],
    datasets: [
      {
        data: [data.active, data.inactive],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#388e3c', '#d32f2f'],
      },
    ],
  };

  return (
    <div>
      <h3>Device Status</h3>
      <Pie data={chartData} />
      <div>Total Devices: {data.active + data.inactive}</div>
      <div>Network Stability: {(data.active*100/(data.active + data.inactive)).toFixed(2)}%</div>
    </div>
  );
};

export default FirstQuad;
