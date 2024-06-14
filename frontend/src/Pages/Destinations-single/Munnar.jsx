import React, { useState } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import video from '../../assets/munnar.mp4';
import mapOutline from '../../assets/munnar-outline.png';
import topImage1 from '../../assets/conoor.jpg';
import topImage2 from '../../assets/ekm.jpg';
import topImage3 from '../../assets/fort.jpg';
import topImage4 from '../../assets/hero.jpg';
import image from '../../assets/munnar.jpg';

// Sample attractions data for Munnar
const attractions = [
  {
    name: "Tea Gardens",
    coords: { lat: 10.0892, lng: 77.0595 },
    image: topImage1,
    review: "The lush green tea gardens of Munnar are a must-see!",
  },
  {
    name: "Mattupetty Dam",
    coords: { lat: 10.1081, lng: 77.1254 },
    image: topImage2,
    review: "Mattupetty Dam offers picturesque views and boat rides.",
  },
  {
    name: "Eravikulam National Park",
    coords: { lat: 10.2405, lng: 77.0202 },
    image: topImage3,
    review: "Home to the endangered Nilgiri Tahr, this park is a wildlife haven.",
  },
  {
    name: "Echo Point",
    coords: { lat: 10.0743, lng: 77.1630 },
    image: topImage4,
    review: "A scenic spot with natural echoes and beautiful views.",
  },
];

const Munnar = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC35NX4I4MICHrydn6-sJKA2tOYv6m2Bxc', // Replace with your Google Maps API key
  });

  const [currentAttractionIndex, setCurrentAttractionIndex] = useState(0);

  const currentAttraction = attractions[currentAttractionIndex];

  const handleNextAttraction = () => {
    setCurrentAttractionIndex((currentAttractionIndex + 1) % attractions.length);
  };

  const handlePreviousAttraction = () => {
    setCurrentAttractionIndex((currentAttractionIndex - 1 + attractions.length) % attractions.length);
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps</div>;
  }

  return (
    <div className="font-sans">
      {/* Header Section */}
      <header className="relative h-screen flex justify-center items-center">
        <div className="relative w-full max-w-8xl mx-4 md:mx-8 lg:mx-16 h-[80%] rounded-2xl overflow-hidden shadow-lg">
          <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover rounded-lg">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          <div className="relative z-10 text-white p-8 flex flex-col justify-center items-center h-full text-center">
            <h1 className="text-6xl font-bold">Travel to Munnar</h1>
            <p className="mt-4 text-xl hidden md:block">Discover the beauty of Munnar, its tea gardens, and lush landscapes.</p>
            <div className="mt-8 flex flex-col md:flex-row">
              <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-4 px-8 rounded mb-4 md:mb-0 md:mr-4">Craft your trip</button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-4 px-8 rounded">How it works</button>
            </div>
          </div>
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 h-64 hidden md:block">
            <img src={mapOutline} alt="Map Outline" className="h-full" />
          </div>
          <div className="absolute bottom-4 w-full text-white flex justify-around text-sm md:text-lg px-4">
            <div className="flex flex-col items-center border-r border-gray-300 pr-4">
              <span className="font-bold">Best time to visit:</span>
              <span>October to March</span>
            </div>
            <div className="flex flex-col items-center border-r border-gray-300 pr-4">
              <span className="font-bold">Nearest City:</span>
              <span>Kochi</span>
            </div>
            <div className="flex flex-col items-center border-r border-gray-300 pr-4">
              <span className="font-bold">Population:</span>
              <span>~32,000</span>
            </div>
            <div className="flex flex-col items-center border-r border-gray-300 pr-4">
              <span className="font-bold">Area:</span>
              <span>557 SQ KM</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold">Languages:</span>
              <span>Malayalam, Tamil</span>
            </div>
          </div>
        </div>
      </header>

      {/* Details Section */}
      <section className="py-16 px-8 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Beyond the city limits, nature comes unabashed and boundless</h2>
          </div>
          <div className="md:w-1/2">
            <p className="mb-8">
              Munnar boasts sprawling tea gardens, lush green hills, and picturesque landscapes. The pleasant climate and serene atmosphere make it a perfect escape from the bustling city life. Munnar offers countless opportunities for peaceful retreats and adventure activities alike. Slow down, embrace the tranquility, and immerse yourself in the beauty of nature.
            </p>
          </div>
        </div>
      </section>

      {/* Explore Section */}
      <section className="py-16 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">Explore on your own terms</h2>
              <p className="text-lg font-semibold">This is just a sample itinerary.</p>
              <p className="mt-2">Your trip will be tailor-made and personalized to you.</p>
            </div>
            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg mb-4">
                <img src={topImage1} alt="Itinerary Map Thumbnail" className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center shadow-lg w-full">
                <h3 className="font-bold text-xl">Discover Munnar</h3>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded">View Itinerary</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Section */}
      <section className="py-16 px-8 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Let's talk price</h2>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <div className="flex items-center mb-4">
                <span className="font-semibold">Travelers</span>
                <div className="ml-4 flex items-center">
                  <button onClick={handlePreviousAttraction} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded">-</button>
                  <span className="mx-2">{currentAttractionIndex + 1}</span>
                  <button onClick={handleNextAttraction} className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-2 rounded">+</button>
                </div>
              </div>
              <p>Experience Munnar's pristine beauty, diverse landscapes, and peaceful atmosphere with a personalized trip. Tailor your itinerary to match your preferences and interests.</p>
            </div>
            <div className="lg:w-2/3 lg:flex lg:items-center">
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg mb-4 lg:mb-0 lg:ml-8">
                <img src={topImage2} alt="Itinerary Map Thumbnail" className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-8 p-4 bg-gray-100 rounded-lg text-center shadow-lg">
                <h3 className="font-bold text-xl">Customized Munnar Experience</h3>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded">Book Now</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-8 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-8">Discover Munnar's Attractions</h2>
          <div className="relative rounded-lg overflow-hidden shadow-lg map-container">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '500px' }}
                zoom={14}
                center={currentAttraction.coords}
              >
                {attractions.map((attraction, index) => (
                  <Marker
                    key={index}
                    position={attraction.coords}
                    onClick={() => setCurrentAttractionIndex(index)}
                    icon={{
                      url: index === currentAttractionIndex ? 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    }}
                  >
                    {index === currentAttractionIndex && (
                      <InfoWindow position={attraction.coords}>
                        <div className="flex items-center w-64 p-2">
                          <img src={currentAttraction.image} alt={currentAttraction.name} className="w-16 h-16 object-cover rounded-lg shadow-md mr-2" />
                          <div>
                            <h3 className="text-lg font-bold">{currentAttraction.name}</h3>
                            <p className="text-gray-700 text-sm">{currentAttraction.review}</p>
                          </div>
                        </div>
                      </InfoWindow>
                    )}
                  </Marker>
                ))}
              </GoogleMap>
            ) : (
              <div>Loading Map...</div>
            )}

            {/* Navigation Buttons */}
            <div className="absolute inset-y-0 left-0 flex items-center">
              <button
                onClick={handlePreviousAttraction}
                className="text-white bg-black bg-opacity-50 hover:bg-opacity-75 px-4 py-2 rounded-l-lg"
              >
                &larr;
              </button>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center">
              <button
                onClick={handleNextAttraction}
                className="text-white bg-black bg-opacity-50 hover:bg-opacity-75 px-4 py-2 rounded-r-lg"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>
      </section>
      <section 
      className="relative h-screen flex justify-center items-center bg-cover bg-center" 
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 text-white text-center">
        <h2 className="text-4xl md:text-6xl font-bold">In a word</h2>
        <p className="mt-4 text-2xl md:text-4xl">Qué copado! (How cool!)</p>
        <button className="mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-full">
          Craft your trip
        </button>
      </div>
    </section>
    </div>
  );
};

export default Munnar;