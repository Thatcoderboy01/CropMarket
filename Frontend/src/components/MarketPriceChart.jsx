import React, { useState } from "react";
import { Line, Bar, Pie } from "react-chartjs-2";
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
} from "chart.js";

// Register necessary Chart.js components
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
  Filler
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

const chartData = {
  labels,
  datasets: [
    {
      label: "Wheat Market Price (₹ per kg)",
      data: prices,
      borderColor: "#4CAF50",
      backgroundColor: "rgba(76, 175, 80, 0.2)",
      fill: true,
      tension: 0.4,
    },
  ],
};

const barData = {
  labels,
  datasets: [
    {
      label: "Market Price",
      data: prices,
      backgroundColor: "#ff9800",
    },
  ],
};

const pieData = {
  labels,
  datasets: [
    {
      label: "Price Distribution",
      data: prices,
      backgroundColor: ["#2196F3", "#4CAF50", "#FF9800", "#E91E63", "#9C27B0", "#3F51B5", "#FFC107"],
    },
  ],
};

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

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Market Price Analysis</h2>
      <div className="flex justify-center space-x-4 mb-4">
        <button className="px-4 py-2 bg-green-500 text-white rounded" onClick={() => setChartType("line")}>
          Line Chart
        </button>
        <button className="px-4 py-2 bg-orange-500 text-white rounded" onClick={() => setChartType("bar")}>
          Bar Chart
        </button>
        <button className="px-4 py-2 bg-blue-500 text-white rounded" onClick={() => setChartType("pie")}>
          Pie Chart
        </button>
      </div>
      <div className="w-full h-96 flex justify-center items-center">
        {chartType === "line" && <Line data={chartData} options={options} />}
        {chartType === "bar" && <Bar data={barData} options={options} />}
        {chartType === "pie" && <Pie data={pieData} />}
      </div>
    </div>
  );
};

export default MarketPriceChart;
