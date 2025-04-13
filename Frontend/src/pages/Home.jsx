import React from "react";
import FarmerList from "./FarmerList";
import RetailerList from "./RetailerList";

const Home = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to the Farmer-Retailer Platform</h1>
      
      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Farmers</h2>
        <FarmerList />
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Retailers</h2>
        <RetailerList />
      </section>
    </div>
  );
};

export default Home;
