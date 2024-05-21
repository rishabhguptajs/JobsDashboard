import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import data from '../data/salaries';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Jobs Visual Chart',
            font:{
                size: 20,
                family: 'Arial',
            },
            color: 'black',
        },
    },
};

const LineChart = () => {
    const uniqueYears = [...new Set(data.map((item) => item.work_year))];
    const labels = uniqueYears;

    const salaryData = uniqueYears.map(year => {
        const yearData = data.filter(item => item.work_year === year);
        const totalSalary = yearData.reduce((sum, item) => sum + item.salary_in_usd, 0);
        return totalSalary / yearData.length;
    });

    const totalJobs = uniqueYears.map(year => {
        return data.filter(item => item.work_year === year).length;
    });

    const chartData = {
        labels,
        datasets: [
            {
                label: 'Average Salary',
                data: salaryData,
                fill: false,
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Total Jobs',
                data: totalJobs,
                fill: false,
                backgroundColor: 'rgb(54, 162, 235)',
                borderColor: 'rgba(54, 162, 235, 0.2)',
            },
        ],
    };

    return (
        <div>
            <Line data={chartData} options={options} width={400} height={300} />
        </div>
    );
};

export default LineChart;
