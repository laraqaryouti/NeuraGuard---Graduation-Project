import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
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
      text: 'Comparing your DaTscan result with a healthy cohort',
    },
  },
};

const labels = ['Caudate Right', 'Caudate Left', 'Putamen Right', 'Putamen Left'];

const generateRandomData = () => {
    return Array.from({ length: labels.length }, () => Math.floor(Math.random() * 8));
};

export const data = {
  labels,
  datasets: [
    {
      label: 'Healthy Cohort',
      data: [2.56,2.88,2.09,2.36],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Your DaTScan',
      data: generateRandomData(),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function BarChart() {
  return <Bar options={options} data={data} />;
}
