import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Number of Visits Per Month',
    },
  },
};

const currentMonthIndex = new Date().getMonth();

const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const labels = allMonths.slice(0, currentMonthIndex + 1);


const generateRandomData = () => {
  return labels.map(() => Math.floor(Math.random() * 201));
};

export const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: 'Number of Visits',
      data: generateRandomData(), 
      borderColor: 'rgb(255, 159, 64)', // Orange border color
      backgroundColor: 'rgba(255, 159, 64, 0.5)',
    },
  ],
};

export function VisitsPerMonth() {
  return <Line options={options} data={data} />;
}
