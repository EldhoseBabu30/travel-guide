// src/pages/Munnar.js
import React, { useState, useEffect } from 'react';
import { GoogleMap, useLoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import video from '../../assets/kovalam.mp4';
import mapOutline from '../../assets/kovalam-outline.png';
import topImage1 from '../../assets/conoor.jpg';
import topImage2 from '../../assets/ekm.jpg';
import topImage3 from '../../assets/fort.jpg';
import topImage4 from '../../assets/hero.jpg';
import itineraryMap from '../../assets/kovalam1.jpg'

// Data for attractions in Kovalam
const attractions = [
  {
    name: "Kovalam Beach",
    coords: { lat: 8.3985, lng: 76.9786 },
    image: topImage1,
    review: "Kovalam Beach is famous for its crescent-shaped shoreline and golden sands, perfect for sunbathing and swimming.",
  },
  {
    name: "Lighthouse Beach",
    coords: { lat: 8.3849, lng: 76.9772 },
    image: topImage2,
    review: "Lighthouse Beach is known for its iconic red and white striped lighthouse, offering stunning views of the coastline.",
  },
  {
    name: "Hawa Beach",
    coords: { lat: 8.3869, lng: 76.9738 },
    image: topImage3,
    review: "Hawa Beach, also known as Eve's Beach, is a serene spot with less crowd, perfect for a quiet evening by the sea.",
  },
  {
    name: "Samudra Beach",
    coords: { lat: 8.3911, lng: 76.9631 },
    image: topImage4,
    review: "Samudra Beach is a tranquil beach ideal for relaxing and watching the waves, away from the more crowded beaches.",
  },
];




// Data for deals in Kovalam
const deals = [
  { id: 1, category: "Room", name: "The Leela Kovalam", address: "Kovalam Beach Road", price: 400, image: "https://via.placeholder.com/400x300" },
  { id: 2, category: "Room", name: "Taj Green Cove Resort", address: "G.V. Raja Vattapara Road", price: 350, image: "https://via.placeholder.com/400x300" },
  { id: 3, category: "Room", name: "Uday Samudra Hotel", address: "Samudra Beach Road", price: 275, image: "https://via.placeholder.com/400x300" },
  { id: 4, category: "Room", name: "Niraamaya Retreats", address: "Pulinkudi Road", price: 300, image: "https://via.placeholder.com/400x300" },
  { id: 5, category: "Restroom", name: "Public Restroom - Kovalam Beach", address: "Near Kovalam Beach Entrance", price: 10, image: "https://via.placeholder.com/400x300" },
  { id: 6, category: "Restroom", name: "Public Restroom - Hawa Beach", address: "Hawa Beach Entrance", price: 10, image: "https://via.placeholder.com/400x300" },
  { id: 7, category: "EV Parking", name: "EV Parking - Lighthouse Beach", address: "Lighthouse Beach Parking Area", price: 80, image: "https://via.placeholder.com/400x300" },
  { id: 8, category: "EV Parking", name: "EV Parking - Kovalam Junction", address: "Kovalam Junction", price: 80, image: "https://via.placeholder.com/400x300" },
  { id: 9, category: "Parking", name: "Parking - Samudra Beach", address: "Samudra Beach Parking Area", price: 50, image: "https://via.placeholder.com/400x300" },
  { id: 10, category: "Parking", name: "Parking - Kovalam Beach", address: "Kovalam Beach Parking Area", price: 50, image: "https://via.placeholder.com/400x300" },
];

const Kovalam = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyC35NX4I4MICHrydn6-sJKA2tOYv6m2Bxc',
  });

  const [currentAttractionIndex, setCurrentAttractionIndex] = useState(0);
  const [placeDetails, setPlaceDetails] = useState({});
  const [selectedTab, setSelectedTab] = useState('Room');

  const currentAttraction = attractions[currentAttractionIndex];
  const incrementTravelers = () => setTravelers(travelers + 1);
  const decrementTravelers = () => travelers > 1 && setTravelers(travelers - 1);
  const incrementDays = () => setDays(days + 1);
  const decrementDays = () => days > 1 && setDays(days - 1);

  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(6);




  const handleNextAttraction = () => {
    setCurrentAttractionIndex((currentAttractionIndex + 1) % attractions.length);
  };

  const handlePreviousAttraction = () => {
    setCurrentAttractionIndex((currentAttractionIndex - 1 + attractions.length) % attractions.length);
  };

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    if (isLoaded) {
      fetchPlaceDetails(currentAttraction.coords);
    }
  }, [currentAttractionIndex, isLoaded]);

  const fetchPlaceDetails = async (coords) => {
    const service = new window.google.maps.places.PlacesService(document.createElement('div'));
    const request = {
      location: coords,
      radius: '500',
      type: ['tourist_attraction'],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        const place = results[0];
        const placeRequest = {
          placeId: place.place_id,
          fields: ['name', 'photos', 'reviews'],
        };

        service.getDetails(placeRequest, (placeDetailsResult, placeStatus) => {
          if (placeStatus === window.google.maps.places.PlacesServiceStatus.OK) {
            const photoUrl = placeDetailsResult.photos && placeDetailsResult.photos.length > 0
              ? placeDetailsResult.photos[0].getUrl()
              : '';
            const review = placeDetailsResult.reviews && placeDetailsResult.reviews.length > 0
              ? placeDetailsResult.reviews[0].text
              : 'No reviews available';

            setPlaceDetails((prevDetails) => ({
              ...prevDetails,
              [currentAttractionIndex]: {
                name: placeDetailsResult.name,
                photoUrl,
                review,
              },
            }));
          }
        });
      }
    });
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
      <header className="relative h-screen overflow-hidden text-white text-center">
  <div className="relative h-full">
    <video autoPlay loop muted className="absolute w-full h-full object-cover">
      <source src={video} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
      <div className="inline-block relative">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 mx-2">Travel to Kovalam</h1>
        <p className="text-md sm:text-lg md:text-xl mb-6 mx-2 sm:whitespace-pre-line">Whatever you want, our experts can make it happen.</p>
        <div className="flex justify-center gap-4 flex-wrap sm:flex-nowrap">
          <button className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-4 rounded-lg">Craft your trip</button>
          <button className="bg-gray-600 hover:bg-gray-800 bg-opacity-70 text-white py-2 px-4 rounded-lg">How it works</button>
        </div>
        <img src={mapOutline} alt="Map Outline" className="absolute top-0 left-full w-[60%] ml-4 hidden md:block" />
      </div>
    </div>
    <div className="absolute bottom-0 left-0 w-full text-center bg-black bg-opacity-60 p-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-white text-xs sm:text-sm md:text-base">
        <div className="flex flex-col items-center border-r border-gray-400">
          <p className="font-bold">Best time to visit:</p>
          <p>September to March</p>
        </div>
        <div className="flex flex-col items-center sm:border-r-0 md:border-r border-gray-400">
          <p className="font-bold">Nearest City:</p>
          <p>Trivandrum</p>
        </div>
        <div className="flex flex-col items-center border-r border-gray-400">
          <p className="font-bold">Population:</p>
          <p>~10000</p>
        </div>
        <div className="flex flex-col items-center sm:border-r-0 md:border-r border-gray-400">
          <p className="font-bold">Area:</p>
          <p> ~12 SQ KM</p>
        </div>
        <div className="flex flex-col items-center sm:border-none" id="languages-section">
          <p className="font-bold">Languages:</p>
          <p>Malayalam, English</p>
        </div>
      </div>
    </div>
  </div>
</header>

<style jsx>{`
  @media (max-width: 640px) {
    #languages-section {
      grid-column: span 2 / span 2;
    }
    .sm\\:border-r-0 {
      border-right: none;
    }
  }
`}</style>



      {/* Details Section */}
      <section className="py-16 px-8 bg-gray-100 text-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start">
          <div className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
            <h2 className="text-3xl font-bold mb-4">Beyond the city limits, nature comes unabashed and boundless</h2>
          </div>
          <div className="md:w-1/2">
            <p className="mb-8">
            Think big. Kovalam is renowned for its pristine beaches, palm-fringed shores, and picturesque landscapes. The pleasant climate and serene atmosphere make it a perfect escape from bustling city life. Kovalam offers countless opportunities for peaceful retreats and adventure activities alike. Slow down, embrace the tranquility, and immerse yourself in the beauty of nature.            </p>
          </div>
        </div>
      </section>

      {/* Explore on your own terms section */}
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
                <button className="mt-4 bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-6 rounded">View Itinerary</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Let's talk price section */}
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
              <p className="text-lg font-semibold mb-2">From USD 3400 per person</p>
              <p className="text-gray-500">Includes flights and private transfers</p>
            </div>
            <div className="lg:w-2/3 lg:pl-8">
              <h3 className="text-xl font-bold mb-2">Why book with us?</h3>
              <p className="mb-2">
                We offer an unparalleled level of service and attention to detail. Our itineraries are crafted with care to ensure you have the most immersive and unforgettable experience. We handle all the logistics so you can focus on enjoying your trip.
              </p>
              <ul className="list-disc pl-5 mb-2">
                <li className="mb-2">Expertly crafted itineraries</li>
                <li className="mb-2">24/7 support during your trip</li>
                <li className="mb-2">Exclusive experiences and access</li>
              </ul>
              <button className="bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 px-4 rounded">Get a quote</button>
            </div>
          </div>
        </div>
      </section>


      {/* Things to Do in Munnar Section */}
      <section className="py-16 px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Things to Do in Kovalam</h2>
          <div className="flex flex-wrap -mx-4">
            {attractions.map((attraction, index) => (
              <div key={index} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <img src={placeDetails[index]?.photoUrl || attraction.image} alt={attraction.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{placeDetails[index]?.name || attraction.name}</h3>
                    <p className="text-gray-700">{placeDetails[index]?.review || attraction.review}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Map Section */}
      <section className="py-16 px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Interactive Map of Kovalam</h2>
          <div className="relative h-96">
            <GoogleMap
              mapContainerStyle={{ height: '100%', width: '100%' }}
              center={currentAttraction.coords}
              zoom={12}
            >
              {attractions.map((attraction, index) => (
                <Marker key={index} position={attraction.coords}>
                  {currentAttractionIndex === index && (
                    <InfoWindow position={attraction.coords}>
                      <div>
                        <h3 className="font-semibold">{placeDetails[index]?.name || attraction.name}</h3>
                        <img src={placeDetails[index]?.photoUrl || attraction.image} alt={attraction.name} className="w-full h-32 object-cover mb-2" />
                        <p>{placeDetails[index]?.review || attraction.review}</p>
                      </div>
                    </InfoWindow>
                  )}
                </Marker>
              ))}
            </GoogleMap>
            <div className="absolute top-0 left-0 mt-2 ml-2 bg-white shadow-md rounded-md p-2">
              <button onClick={handlePreviousAttraction} className="mr-2">&larr; Previous</button>
              <button onClick={handleNextAttraction}>Next &rarr;</button>
            </div>
          </div>
        </div>
      </section>

      {/* Deals Section */}
      <section className="py-16 px-8 bg-gray-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-8">Deals of the day</h2>
          <div className="mb-8">
            <button
              className={`py-2 px-4 rounded-lg mr-4 ${selectedTab === 'Room' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
              onClick={() => handleTabChange('Room')}
            >
              Room
            </button>
            <button
              className={`py-2 px-4 rounded-lg mr-4 ${selectedTab === 'Restroom' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
              onClick={() => handleTabChange('Restroom')}
            >
              Restroom
            </button>
            <button
              className={`py-2 px-4 rounded-lg mr-4 ${selectedTab === 'EV Parking' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
              onClick={() => handleTabChange('EV Parking')}
            >
              EV Parking
            </button>
            <button
              className={`py-2 px-4 rounded-lg mr-4 ${selectedTab === 'Parking' ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}
              onClick={() => handleTabChange('Parking')}
            >
              Parking
            </button>
          </div>
          <div className="flex flex-wrap -mx-4">
            {deals
              .filter((deal) => deal.category === selectedTab)
              .map((deal) => (
                <div key={deal.id} className="w-full md:w-1/2 lg:w-1/4 px-4 mb-8">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={deal.image} alt={deal.name} className="w-full h-48 object-cover" />
                    <div className="p-4">
                      <h3 className="text-xl font-semibold mb-2">{deal.name}</h3>
                      <p className="text-gray-700 mb-2">{deal.address}</p>
                      <p className="text-gray-900 font-semibold">${deal.price}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Kovalam;
