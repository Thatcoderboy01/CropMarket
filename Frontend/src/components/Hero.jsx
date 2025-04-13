import React, { useState, useEffect } from "react";
import FarmersPic from "../assets/images/FarmersPic.jpg";
import { motion } from "framer-motion";

const TypingEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, speed);

      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return (
    <motion.p
      className="mt-3 sm:mt-4 text-base sm:text-lg text-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {displayedText}
    </motion.p>
  );
};

const Hero = () => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-start text-center pt-10 sm:pt-16 md:pt-20">
      <img
        src={FarmersPic}
        alt="Farming"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="relative flex flex-col items-center justify-start h-full w-full px-4 sm:px-6 lg:px-12 pt-20 sm:pt-24 md:pt-28 text-green-600">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">
          Welcome to CropMarket
        </h1>
        <TypingEffect text="Empowering Farmers, Connecting Retailers!" speed={100} />

        {/* Membership Section with Blur Effect */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-12 left-4 sm:left-6 lg:left-12 w-11/12 sm:w-3/4 md:w-auto flex flex-col items-center sm:items-start space-y-2 bg-white bg-opacity-10 backdrop-blur-md p-4 rounded-lg shadow-md text-white">
          {/* Heading */}
          <p className="text-center sm:text-left text-lg font-semibold">
            CropMarket – Connecting Farmers & Retailers
          </p>
          <p className="text-center sm:text-left text-sm sm:text-lg font-semibold w-full">
            for Fair Prices and Better Trade!
          </p>

          {/* Profile Pictures & Membership */}
          <div className="flex flex-col sm:flex-row items-center">
            <div className="relative flex -space-x-2 sm:-space-x-4">
              <img className="w-8 sm:w-10 rounded-full border-2 border-white z-30" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User 1" />
              <img className="w-8 sm:w-10 rounded-full border-2 border-white z-20" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User 2" />
              <img className="w-8 sm:w-10 rounded-full border-2 border-white z-10" src="https://randomuser.me/api/portraits/men/51.jpg" alt="User 3" />
              <img className="w-8 sm:w-10 rounded-full border-2 border-white z-0" src="https://randomuser.me/api/portraits/women/60.jpg" alt="User 4" />
            </div>

            {/* Membership Text */}
            <span className="ml-0 sm:ml-4 text-center sm:text-left text-sm sm:text-lg">
              <p>
                <span className="text-yellow-400 font-bold">12k+</span> Customers
              </p>
              <p className="text-xs sm:text-sm text-white opacity-80">Enjoy Our Services!</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
