const Footer = () => {
  return (
    <footer className="bg-[#001b1b] text-[#e2f4c5] text-center py-6 font-mono text-sm">
      {/* First Row */}
      <div className="flex flex-wrap justify-center gap-5">
        <span>Crop Management</span> <span className="text-gray-500">||</span> 
        <span>Soil Testing</span> <span className="text-gray-500">||</span> 
        <span>Weather Updates</span> <span className="text-gray-500">||</span> 
        <span>Farming News</span> <span className="text-gray-500">||</span> 
        <span>Success Stories</span> <span className="text-gray-500">||</span> 
        <span>Agri Events</span>
      </div>

      {/* Second Row */}
      <div className="flex flex-wrap justify-center gap-5 mt-1">
        <span>Home</span> <span className="text-gray-500">||</span> 
        <span>Farmers</span> <span className="text-gray-500">||</span> 
        <span>Crop Prices</span> <span className="text-gray-500">||</span> 
        <span>Retailer Connect</span> <span className="text-gray-500">||</span> 
        <span>Market Trends</span> <span className="text-gray-500">||</span> 
        <span>Organic Farming</span> <span className="text-gray-500">||</span> 
        <span>Government Schemes</span>
      </div>

      {/* Third Row */}
      <div className="flex flex-wrap justify-center gap-5 mt-1">
        <span>About Us</span> <span className="text-gray-500">||</span> 
        <span>Agri Policies</span> <span className="text-gray-500">||</span> 
        <span>Farming Tips</span> <span className="text-gray-500">||</span> 
        <span>Guidelines</span> <span className="text-gray-500">||</span> 
        <span>Data Protection</span> <span className="text-gray-500">||</span> 
        <span>Refund Policy</span> <span className="text-gray-500">||</span> 
        <span>Careers</span> <span className="text-gray-500">||</span> 
        <span>Help Center</span> <span className="text-gray-500">||</span> 
        <span>Contact Us</span>
      </div>

      {/* Copyright */}
      <div className="mt-2 text-green-400">
        CropMarket.com © 2025
      </div>
    </footer>
  );
};

export default Footer;
