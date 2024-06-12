import React from 'react';
import video from '../../assets/kanyakumari.mp4';
import image from '../../assets/kanyakumari1.jpg';

const Kanyakumari = () => {
  return (
    <div className="font-sans">
      <header className="relative h-screen">
        <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover">
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-white p-8 text-center">
          <div className="mt-32">
            <h1 className="text-6xl font-bold">Travel to Kanyakumari</h1>
            <p className="mt-4 text-xl">Whatever you want, our experts can make it happen.</p>
            <div className="mt-8">
              <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded mr-4">Craft your trip</button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-8 rounded">How it works</button>
            </div>
          </div>
        </div>
      </header>

      <section className="py-16 px-8 bg-gray-100 text-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Beyond the city limits, nature comes unabashed and boundless</h2>
          <p className="mb-8">
            Think big. Munnar boasts sprawling tea gardens, lush green hills, and picturesque landscapes. The pleasant climate and serene atmosphere make it a perfect escape from the bustling city life. Munnar offers countless opportunities for peaceful retreats and adventure activities alike. Slow down, embrace the tranquility, and immerse yourself in the beauty of nature.
          </p>
          <img src={image} alt="Munnar" className="w-full h-auto rounded-lg shadow-lg mb-8"/>
        </div>
      </section>

      <section className="py-16 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold  mb-4">Let's talk price</h2>
          <div className="flex justify-center items-center mb-8">
            <div className="text-lg font-semibold">Travelers:</div>
            <input type="number" min="1" defaultValue="2" className="mx-2 p-2 border border-gray-400 rounded"/>
            <div className="text-lg font-semibold">Days:</div>
            <input type="number" min="1" defaultValue="6" className="mx-2 p-2 border border-gray-400 rounded"/>
          </div>
          <div className="relative w-full h-12 bg-gray-200 rounded-full mb-8">
            <div className="absolute left-1/4 w-1/2 h-full bg-orange-400 rounded-full"></div>
            <div className="absolute inset-0 flex justify-center items-center text-lg font-bold text-white">$5,280 / traveler</div>
          </div>
          <div className="text-left">
            <p className="mb-2"><strong>Your full-service trip will include:</strong></p>
            <ul className="list-disc list-inside mb-8">
              <li>Accommodation</li>
              <li>Transportation</li>
              <li>Super cool experiences</li>
              <li>Roadbook with local tips and expert recommendations</li>
              <li>24/7 support</li>
              <li>On-trip concierge service</li>
              <li>Personalized trip crafting</li>
              <li>Entry & exit information and assistance</li>
            </ul>
            <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded">Craft your trip</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kanyakumari;
