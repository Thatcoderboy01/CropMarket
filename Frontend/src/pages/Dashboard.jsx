import React from "react";
import FarmerList from "./FarmerDashboard";
import RetailerList from "./RetailerDashboard";
// import ChatRoom from "./ChatRoom";

const Dashboard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-semibold mb-2">Farmers</h2>
          <FarmerList />
        </div>
        
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-2xl font-semibold mt-6 mb-2">Retailers</h2>
          <RetailerList />
        </div>
      </div>
      
      {/* <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">Chat Room</h2>
        <ChatRoom />
      </div> */}
    </div>
  );
};

export default Dashboard;
