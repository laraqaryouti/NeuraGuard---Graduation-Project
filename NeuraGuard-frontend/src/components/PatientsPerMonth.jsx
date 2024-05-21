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
      text: 'Number of Patients Per Month',
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
      label: 'Healthy Patients',
      data: generateRandomData(),
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Parkinson Patients',
      data: generateRandomData(),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export function PatientsPerMonth() {
  return <Bar options={options} data={data} />;
}
