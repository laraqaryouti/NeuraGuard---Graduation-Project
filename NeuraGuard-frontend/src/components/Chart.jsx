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
      text: 'Patients Number Comparison Per Week',
    },
  },
};

const getCurrentWeekLabels = () => {
    const currentDate = new Date();
    const currentWeek = currentDate.getDate() / 7; 
    const labels = [];
  
    for (let i = 1; i <= currentWeek; i++) {
      labels.push(`Week ${i}`);
    }
  
    return labels;
  };


  const generateRandomData = (numberOfWeeks) => {
    return Array.from({ length: numberOfWeeks }, () => Math.floor(Math.random() * 101)); 
  };
  

export const data = {
  labels: getCurrentWeekLabels(),
  datasets: [
    {
      label: getCurrentWeekLabels(),
      data: [2.56,2.88,2.09,2.36],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: getCurrentWeekLabels(),
      data: generateRandomData(),
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        label: getCurrentWeekLabels(),
        data: generateRandomData(),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: getCurrentWeekLabels(),
        data: generateRandomData(),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
  ],
};

export function PatientsChart() {
  return <Bar options={options} data={data} />;
}

