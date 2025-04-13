import React, { useState, useEffect } from "react";
import { Line, Bar, Pie, Doughnut, Radar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
} from "chart.js";

import img1 from "../assets/images/Wheat.jpg";
import img2 from "../assets/images/Millets.jpg";
import img3 from "../assets/images/Rice.webp";
import img4 from "../assets/images/Maize.webp";

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  RadialLinearScale
);

const fakeMarketData = [
  { date: "March 1", price: 25 },
  { date: "March 2", price: 27 },
  { date: "March 3", price: 26 },
  { date: "March 4", price: 28 },
  { date: "March 5", price: 30 },
  { date: "March 6", price: 29 },
  { date: "March 7", price: 31 },
];

const labels = fakeMarketData.map((data) => data.date);
const prices = fakeMarketData.map((data) => data.price);

const generateChartData = (label, color) => ({
  labels,
  datasets: [
    {
      label,
      data: prices,
      borderColor: color,
      backgroundColor: `${color}20`,
      fill: true,
      tension: 0.4,
    },
  ],
});

const options = {
  responsive: true,
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

const MarketPriceChart = () => {
  const [chartType, setChartType] = useState("line");
  const [currentData, setCurrentData] = useState(prices);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData((prevData) => {
        const newData = [...prevData];
        newData.push(Math.floor(Math.random() * (35 - 20 + 1)) + 20);
        newData.shift();
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const chartData = generateChartData("Wheat Market Price (₹ per kg)", "#4CAF50");
  chartData.datasets[0].data = currentData;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Market Price Analysis</h2>
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <button className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600" onClick={() => setChartType("line")}>
          Line Chart
        </button>
        <button className="px-4 py-2 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600" onClick={() => setChartType("bar")}>
          Bar Chart
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600" onClick={() => setChartType("pie")}>
          Pie Chart
        </button>
        <button className="px-4 py-2 bg-purple-500 text-white rounded-lg shadow-md hover:bg-purple-600" onClick={() => setChartType("doughnut")}>
          Doughnut Chart
        </button>
        <button className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md hover:bg-pink-600" onClick={() => setChartType("radar")}>
          Radar Chart
        </button>
      </div>
      <div className="w-full h-96 flex justify-center items-center bg-gray-50 rounded-lg shadow-md p-4">
        {chartType === "line" && <Line data={chartData} options={options} />}
        {chartType === "bar" && <Bar data={chartData} options={options} />}
        {chartType === "pie" && <Pie data={chartData} />}
        {chartType === "doughnut" && <Doughnut data={chartData} />}
        {chartType === "radar" && <Radar data={chartData} options={options} />}
      </div>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[img1, img2, img3, img4].map((img, index) => (
          <div key={index} className="p-4 bg-white shadow-md rounded-lg text-center transition-transform transform hover:scale-105">
            <img src={img} alt={`Crop ${index + 1}`} className="w-full h-40 object-cover rounded-lg" />
            <p className="mt-2 font-semibold text-gray-700">
              {index === 0 ? "Wheat" : index === 1 ? "Millets" : index === 2 ? "Rice" : "Maize"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketPriceChart;