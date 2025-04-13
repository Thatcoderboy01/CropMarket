import React from "react";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      {/* About Us Section */}
      <section className="text-center mb-16">
        <h2 className="text-4xl font-extrabold text-green-800">About Us</h2>
        <p className="text-lg text-gray-700 mt-4 leading-relaxed">
          CropMarket is a revolutionary platform designed to bridge the gap between farmers and retailers, 
          ensuring a seamless and transparent marketplace for agricultural trade. Our mission is to empower farmers 
          by providing them with direct access to buyers, fair pricing, and real-time communication.
        </p>
      </section>

      {/* Our Mission & Vision */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold text-green-700">Our Mission</h3>
            <p className="text-gray-600 mt-3 leading-relaxed">
              We aim to revolutionize the agricultural industry by providing farmers with a fair, 
              reliable, and efficient digital marketplace to sell their produce without middlemen.
            </p>
          </div>

          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-2xl font-semibold text-green-700">Our Vision</h3>
            <p className="text-gray-600 mt-3 leading-relaxed">
              To create a self-sustaining ecosystem where farmers thrive through technology, innovation, 
              and direct access to national and international markets.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mb-16">
        <h2 className="text-4xl font-extrabold text-green-800 text-center">How It Works</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {/* Step 1 */}
          <div className="p-8 bg-white shadow-lg rounded-lg text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-900">1. Register & Login</h3>
            <p className="text-gray-700 mt-3 leading-relaxed">
              Farmers and retailers can create an account and access a personalized dashboard to manage their listings.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-8 bg-white shadow-lg rounded-lg text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-900">2. List & Request Crops</h3>
            <p className="text-gray-700 mt-3 leading-relaxed">
              Farmers can list their crops, set prices, and receive direct requests from retailers looking for fresh produce.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-8 bg-white shadow-lg rounded-lg text-center transition-transform transform hover:scale-105">
            <h3 className="text-xl font-bold text-gray-900">3. Real-time Communication</h3>
            <p className="text-gray-700 mt-3 leading-relaxed">
              Buyers and sellers can chat in real-time, negotiate deals, and finalize transactions seamlessly within the app.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-green-50 py-12 rounded-lg text-center">
        <h2 className="text-4xl font-extrabold text-green-800">Why Choose CropMarket?</h2>
        <p className="text-lg text-gray-700 mt-4">We provide unmatched benefits to both farmers and retailers:</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6 px-4">
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-gray-900">✔ Fair Pricing</h3>
            <p className="text-gray-700 mt-2">Direct trade ensures no middlemen, offering better prices to farmers.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-gray-900">✔ Secure Transactions</h3>
            <p className="text-gray-700 mt-2">Safe and reliable payment methods for hassle-free deals.</p>
          </div>
          <div className="p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-bold text-gray-900">✔ 24/7 Support</h3>
            <p className="text-gray-700 mt-2">Our dedicated team is available around the clock to assist you.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
