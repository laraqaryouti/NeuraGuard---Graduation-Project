import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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
      text: 'Progression of nonmotor symptoms',
    },
  },
};

const currentMonthIndex = new Date().getMonth();

const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const labels = allMonths.slice(0, currentMonthIndex + 1);
/*Our disease progression tracker has 4 ratings for each symptom. We can take the average for each month in order to represent it in 
the diagram
*/ 
const generateRandomData = () => {
  return labels.map(() => Math.random() * 4);
};


export const data = {
  labels,
  datasets: [
    {
      label: 'Mood Changes',
      data: generateRandomData(),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Anxiety',
      data: generateRandomData(),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
        label: 'Sleep Disturbances',
        data: generateRandomData(),
        borderColor: 'rgb(46, 204, 113)',
        backgroundColor: 'rgba(46, 204, 113, 0.5)',
    },
    {
        label: 'Loss Sense of Smell',
        data: generateRandomData(),
        borderColor: 'rgb(241, 196, 15)',
        backgroundColor: 'rgba(241, 196, 15, 0.5)',
    },
  ],
};

export function LineChartnonmotor() {
  return <Line options={options} data={data} />;
}
