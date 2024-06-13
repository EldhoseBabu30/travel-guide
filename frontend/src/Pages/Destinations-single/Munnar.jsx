import React, { useState } from 'react';
import video from '../../assets/munnar.mp4';
import mapOutline from '../../assets/munnar-outline.png';
import itineraryMap from '../../assets/munnar1.jpg';
import topImage1 from '../../assets/conoor.jpg';
import topImage2 from '../../assets/ekm.jpg';
import topImage3 from '../../assets/fort.jpg';
import topImage4 from '../../assets/kodai.jpg';

const Munnar = () => {
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(6);
  const [currentIndex, setCurrentIndex] = useState(0);

  const incrementTravelers = () => setTravelers(travelers + 1);
  const decrementTravelers = () => travelers > 1 && setTravelers(travelers - 1);
  const incrementDays = () => setDays(days + 1);
  const decrementDays = () => days > 1 && setDays(days - 1);

  const topImages = [topImage1, topImage2, topImage3, topImage4];

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % topImages.length);
  };

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + topImages.length) % topImages.length);
  };

  return (
    <div className="font-sans">
      <header className="relative h-screen flex justify-center items-center">
        <div className="relative w-full max-w-8xl mx-4 md:mx-8 lg:mx-16 h-[80%] rounded-2xl overflow-hidden shadow-lg">
          <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover rounded-lg">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
          <div className="relative z-10 text-white p-8 flex flex-col justify-center items-center h-full text-center">
            <h1 className="text-6xl font-bold">Travel to Munnar</h1>
            <p className="mt-4 text-xl hidden md:block">Whatever you want, our experts can make it happen.</p>
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

      <section className="py-16 px-8 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Beyond the city limits, nature comes unabashed and boundless</h2>
          </div>
          <div className="md:w-1/2">
            <p className="mb-8">
              Think big. Munnar boasts sprawling tea gardens, lush green hills, and picturesque landscapes. The pleasant climate and serene atmosphere make it a perfect escape from the bustling city life. Munnar offers countless opportunities for peaceful retreats and adventure activities alike. Slow down, embrace the tranquility, and immerse yourself in the beauty of nature.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">Explore on your own terms</h2>
              <p className="text-lg font-semibold">This is just a sample itinerary.</p>
              <p className="mt-2">
                Your trip will be tailor-made and personalized to you.
              </p>
            </div>
            <div className="md:w-1/2 flex flex-col items-center">
              <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg mb-4">
                <img src={itineraryMap} alt="Itinerary Map Thumbnail" className="w-full h-full object-cover" />
              </div>
              <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center shadow-lg w-full">
                <h3 className="font-bold text-xl">Samba, Paraty and Rio de Janeiro</h3>
                <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded">View Itinerary</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold mb-6">Let's talk price</h2>
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <div className="flex items-center mb-4">
                <span className="font-semibold">Travelers</span>
                <div className="ml-4 flex items-center">
                  <button onClick={decrementTravelers} className="bg-gray-200 p-2 rounded-l-md">-</button>
                  <span className="bg-gray-100 p-2">{travelers}</span>
                  <button onClick={incrementTravelers} className="bg-gray-200 p-2 rounded-r-md">+</button>
                </div>
              </div>
              <div className="flex items-center mb-4">
                <span className="font-semibold">Days</span>
                <div className="ml-4 flex items-center">
                  <button onClick={decrementDays} className="bg-gray-200 p-2 rounded-l-md">-</button>
                  <span className="bg-gray-100 p-2">{days}</span>
                  <button onClick={incrementDays} className="bg-gray-200 p-2 rounded-r-md">+</button>
                </div>
              </div>
              <p className="text-gray-600">This budget range is specific to Brazil. The higher in price, the more exclusive the experience. The lower in price, the more economic the experience.</p>
              <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded mt-4">Craft your trip</button>
            </div>
            <div className="lg:w-2/3 flex flex-col items-center">
              <div className="w-full bg-purple-100 rounded-lg p-6 text-center">
                <span className="text-4xl font-bold text-purple-600">$12,060</span>
                <p className="text-gray-600">($6,030 / traveler for {travelers} travelers, {days} days)</p>
                <div className="relative mt-4">
                  <div className="absolute left-0 w-full h-2 bg-gray-300 rounded-full"></div>
                  <div className="absolute left-0 w-1/2 h-2 bg-purple-500 rounded-full"></div>
                </div>
                <div className="flex justify-between mt-2 text-gray-600">
                  <span>$3,720</span>
                  <span>$20,400</span>
                </div>
              </div>
              <div className="w-full mt-4">
                <h3 className="text-xl font-bold">Your full-service Elsewhere trip will include:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 text-gray-600">
                  <div className="flex items-center"><span className="mr-2">🏨</span> Accommodation</div>
                  <div className="flex items-center"><span className="mr-2">🚗</span> Transportation</div>
                  <div className="flex items-center"><span className="mr-2">🌟</span> Super cool experiences</div>
                  <div className="flex items-center"><span className="mr-2">🗺</span> Roadbook with local tips and expert recommendations</div>
                  <div className="flex items-center"><span className="mr-2">📞</span> 24/7 support</div>
                  <div className="flex items-center"><span className="mr-2">🛎</span> On-trip concierge service</div>
                  <div className="flex items-center"><span className="mr-2">📝</span> Personalized trip crafting</div>
                  <div className="flex items-center"><span className="mr-2">✈</span> Entry & exit information and assistance</div>
                </div>
                <p className="text-sm text-gray-500 mt-4">*International flights and trip insurance not included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Top Things to See</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="relative">
              <img src={topImage1} alt="Top Thing 1" className="w-full h-64 object-cover rounded-lg shadow-lg" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white rounded-b-lg">
                The spectacular island of Fernando de Noronha, with gorgeous beaches and world-class diving
              </div>
            </div>
            <div className="relative">
              <img src={topImage2} alt="Top Thing 2" className="w-full h-64 object-cover rounded-lg shadow-lg" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white rounded-b-lg">
                The thunderous Iguaçu Falls
              </div>
            </div>
            <div className="relative">
              <img src={topImage3} alt="Top Thing 3" className="w-full h-64 object-cover rounded-lg shadow-lg" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white rounded-b-lg">
                The enchanting colonial centre of Salvador
              </div>
            </div>
            <div className="relative">
              <img src={topImage4} alt="Top Thing 4" className="w-full h-64 object-cover rounded-lg shadow-lg" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white rounded-b-lg">
                Ipanema Beach, Rio’s fabled stretch of coastline
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Get a Taste</h2>
          <div className="flex flex-col lg:flex-row justify-between items-start">
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <h3 className="text-2xl font-bold mb-4">Eat</h3>
              <ul className="list-disc pl-6">
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt</li>
              </ul>
            </div>
            <div className="lg:w-1/3 mb-8 lg:mb-0">
              <h3 className="text-2xl font-bold mb-4">Drink</h3>
              <ul className="list-disc pl-6">
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-8 bg-white text-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Discover the Best</h2>
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <img src={topImages[currentIndex]} alt="Discover the Best" className="w-full h-full object-cover" />
            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex items-center">
              <button onClick={handlePrev} className="bg-gray-800 text-white p-2 rounded-full mr-2">Prev</button>
              <button onClick={handleNext} className="bg-gray-800 text-white p-2 rounded-full">Next</button>
            </div>
            <div className="absolute top-4 left-4 w-20 h-20 rounded-full overflow-hidden border-4 border-white">
              <img src={topImages[(currentIndex + 1) % topImages.length]} alt="Thumbnail 1" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-4 right-4 w-20 h-20 rounded-full overflow-hidden border-4 border-white">
              <img src={topImages[(currentIndex + 2) % topImages.length]} alt="Thumbnail 2" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Munnar;