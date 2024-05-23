import React from 'react';
import { Player } from '@lottiefiles/react-lottie-player';

// Sample Lottie files (replace these with actual Lottie file URLs or paths)
const guidedToursAnimation = 'https://assets9.lottiefiles.com/packages/lf20_touohxv0.json';
const bestFlightsAnimation = 'https://assets9.lottiefiles.com/packages/lf20_l7zzfwhd.json';
const exclusiveDealsAnimation = 'https://assets9.lottiefiles.com/packages/lf20_mmgmmixk.json';
const customerSupportAnimation = 'https://assets9.lottiefiles.com/packages/lf20_86l83oo8.json';

const ServicesSection = () => {
  return (
    <section className="bg-gray-300 text-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-4xl font-bold mb-12 animate-color-change">We Offer Best Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300">
            <Player 
              src={guidedToursAnimation}
              className="mx-auto mb-4"
              style={{ height: '80px', width: '80px' }}
              autoplay
              loop
            />
            <h3 className="text-2xl font-semibold mb-3">Guided Tours</h3>
            <p className="text-gray-400">Guided tours provided by Triplify offer travelers the opportunity to explore destinations with the expertise of knowledgeable guides.</p>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300">
            <Player 
              src={bestFlightsAnimation}
              className="mx-auto mb-4"
              style={{ height: '80px', width: '80px' }}
              autoplay
              loop
            />
            <h3 className="text-2xl font-semibold mb-3">Best Flights Options</h3>
            <p className="text-gray-400">Triplify scours through various airlines and booking platforms to find the most competitive prices for flights.</p>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300">
            <Player 
              src={exclusiveDealsAnimation}
              className="mx-auto mb-4"
              style={{ height: '80px', width: '80px' }}
              autoplay
              loop
            />
            <h3 className="text-2xl font-semibold mb-3">Exclusive Deals</h3>
            <p className="text-gray-400">Exclusive deals offered by Triplify are special offers and discounts available only to users of the Triplify platform.</p>
          </div>
          <div className="text-center p-6 bg-gray-800 rounded-lg hover:bg-gray-700 transition duration-300">
            <Player 
              src={customerSupportAnimation}
              className="mx-auto mb-4"
              style={{ height: '80px', width: '80px' }}
              autoplay
              loop
            />
            <h3 className="text-2xl font-semibold mb-3">24/7 Customer Support</h3>
            <p className="text-gray-400">Travel plans can change unexpectedly, which is why Triplify's customer support is available round-the-clock.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
