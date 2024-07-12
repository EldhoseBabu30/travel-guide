import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { TripContext } from '../AiTravel/context/TripContext';
import video from '../../assets/ai-video.mp4';
import Lottie from 'react-lottie';
import lottiefile1 from '../../assets/Lottiefiles/ai section 1.json';
import lottiefile2 from '../../assets/Lottiefiles/ai section 2.json';
import lottiefile3 from '../../assets/Lottiefiles/ai section 3.json';
import lottiefile4 from '../../assets/Lottiefiles/ai section 4.json';
import lottiefile5 from '../../assets/Lottiefiles/ai section 5.json';
import lottiefile6 from '../../assets/Lottiefiles/ai section 6.json';
import lottiefile7 from '../../assets/Lottiefiles/ai section 7.json';
import lottiefile8 from '../../assets/Lottiefiles/ai section 8.json';
import support from '../../assets/Lottiefiles/customer support.json';
import abshan from '../../assets/testimonials/abshan.jpg';
import eldho from '../../assets/testimonials/eldho.jpg';
import jamshi from '../../assets/testimonials/jamshi.jpg';
import video2 from '../../assets/banner-video.mp4';
import Footer from '../../components/Footer/Footer';

mapboxgl.accessToken = 'pk.eyJ1IjoiYWJzaGFuIiwiYSI6ImNseHZ1ajUybTBtbGcyanF6eGFid216OHAifQ.1AXCW22VbJsmDC-2oIm0yw';

const AiTravelHome = () => {
  const navigate = useNavigate();
  const { tripData, setTripData } = useContext(TripContext);
  const [showModal, setShowModal] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState('');
  const geocoderContainerRef = useRef(null);
  const geocoderRef = useRef(null);
  const modalRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [geocoder, setGeocoder] = useState(null);

  useEffect(() => {
    if (showModal && geocoderContainerRef.current && !geocoder) {
      const newGeocoder = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        types: 'place',
        placeholder: 'Search for your destination',
        mapboxgl: mapboxgl,
      });

      newGeocoder.addTo(geocoderContainerRef.current);

      // Adjust width of the geocoder input
      const geocoderEl = geocoderContainerRef.current.querySelector('.mapboxgl-ctrl-geocoder');
      if (geocoderEl) {
        geocoderEl.style.width = '100%';
        geocoderEl.style.maxWidth = '100%';
      }

      newGeocoder.on('result', (e) => {
        setTripData({
          ...tripData,
          destination: e.result.place_name,
          destinationCoordinates: e.result.center,
        });
        setSelectedDestination(e.result.place_name);
      });

      newGeocoder.on('clear', () => {
        setSelectedDestination('');
      });

      setGeocoder(newGeocoder);
    }

    return () => {
      if (geocoder) {
        geocoder.onRemove();
      }
    };
  }, [showModal, tripData, setTripData]);

  useEffect(() => {
    if (geocoder && selectedDestination) {
      geocoder.setInput(selectedDestination);
    }
  }, [selectedDestination, geocoder]);

  const handleSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowModal(false);
      setIsLoading(false);
      navigate('/traveller');
    }, 1000);
  };

  const handleCloseModal = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      window.addEventListener('mousedown', handleCloseModal);
    } else {
      window.removeEventListener('mousedown', handleCloseModal);
    }

    return () => {
      window.removeEventListener('mousedown', handleCloseModal);
    };
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showModal]);

  const lottieOptions = (animationData) => ({
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    }
  });

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center">
      <div className="relative w-full h-screen overflow-hidden">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative flex flex-col items-center justify-center min-h-screen text-white text-center px-4 z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Your Perfect Trip with NjanSanchari's AI Travel Planner</h1>
          <p className="text-lg md:text-xl mb-6">Personalized Itineraries, Seamless Booking, Budget-Friendly Options</p>
          <button
            className="bg-orange-400 text-white text-lg font-semibold py-3 px-8 rounded-lg transition transform hover:scale-105"
            onClick={() => setShowModal(true)}
          >
            Create a New Trip
          </button>
        </div>
      </div>

      {showModal && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"></div>
        <div
          ref={modalRef}
          className="relative bg-white rounded-lg shadow-lg w-11/12 md:w-1/3 h-auto p-8 flex flex-col items-center z-60"
        >
          <h2 className="text-2xl font-bold text-center mb-4">🌍 Let's Plan Your Dream Trip! ✈️</h2>
          <div ref={geocoderContainerRef} className="w-full mb-4"></div>
          <button
            className="bg-orange-400 text-white text-lg font-semibold py-2 px-6 rounded-lg w-full transition transform hover:scale-105 flex items-center justify-center"
            onClick={handleSearch}
            disabled={!tripData.destination || isLoading}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            ) : null}
            {isLoading ? 'Planning...' : 'Start Planning 🚀'}
          </button>
        </div>
      </div>
    )}

      {/* New Section Start */}
      <div className="relative flex flex-col items-center justify-center py-12 bg-white text-black text-center lg:px-[15%]">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose NjanSanchari's AI-Powered Trip</h2>

        <div className="flex flex-col md:flex-row items-center justify-center mb-8 w-full">
          <div className="md:w-1/2 p-4">
            <h3 className="text-2xl font-semibold mb-2">Personalized Exploration</h3>
            <p>NjanSanchari's AI Travel Planner crafts a unique itinerary tailored to your interests. Whether you're an adventurer, culture enthusiast, or foodie, our AI analyzes your preferences and curates a trip that perfectly matches your desires. Say goodbye to generic travel plans and hello to a personalized journey.</p>
          </div>
          <div className="md:w-1/2 p-4">
            <Lottie options={lottieOptions(lottiefile1)} height={150} width={150} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="md:w-1/2 p-4 order-2 md:order-1">
            <Lottie options={lottieOptions(lottiefile2)} height={150} width={150} />
          </div>
          <div className="md:w-1/2 p-4 order-1 md:order-2">
            <h3 className="text-2xl font-semibold mb-2">Stay Ahead with Trends</h3>
            <p>Discover trending travel spots and hidden gems through our integration with social media. Extract top recommendations from Instagram and TikTok, and seamlessly add them to your itinerary. NjanSanchari ensures you're always in the know about the latest must-visit locations, making your trip exciting and contemporary.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-8 w-full">
          <div className="md:w-1/2 p-4">
            <h3 className="text-2xl font-semibold mb-2">Budget-Friendly Options</h3>
            <p>Travel smart with NjanSanchari. Our AI optimizes your itinerary to fit your budget, offering the best deals on accommodations, food, and activities. Enjoy memorable experiences without breaking the bank, as our planner finds the most cost-effective options for your trip.</p>
          </div>
          <div className="md:w-1/2 p-4">
            <Lottie options={lottieOptions(lottiefile3)} height={150} width={150} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="md:w-1/2 p-4 order-2 md:order-1">
            <Lottie options={lottieOptions(lottiefile4)} height={150} width={150} />
          </div>
          <div className="md:w-1/2 p-4 order-1 md:order-2">
            <h3 className="text-2xl font-semibold mb-2">Seamless Planning</h3>
            <p>From start to finish, NjanSanchari's AI handles all the details. Book flights, hotels, and activities effortlessly through our platform. Our AI ensures every aspect of your journey is well-coordinated, leaving you to relax and enjoy your travel experience.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-8 w-full">
          <div className="md:w-1/2 p-4">
            <h3 className="text-2xl font-semibold mb-2">Local Insights</h3>
            <p>Gain deeper insights into your destination with NjanSanchari's AI. Learn about local culture, customs, and off-the-beaten-path spots that traditional guides might miss. Our AI taps into local knowledge, providing a richer, more authentic travel experience.</p>
          </div>
          <div className="md:w-1/2 p-4">
            <Lottie options={lottieOptions(lottiefile8)} height={150} width={150} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="md:w-1/2 p-4 order-2 md:order-1">
            <Lottie options={lottieOptions(lottiefile6)} height={150} width={150} />
          </div>
          <div className="md:w-1/2 p-4 order-1 md:order-2">
            <h3 className="text-2xl font-semibold mb-2">Eco-Friendly Choices</h3>
            <p>Travel sustainably with NjanSanchari. Our AI prioritizes eco-friendly options, suggesting green hotels, sustainable dining, and activities that minimize your environmental impact. Enjoy your travels while contributing to the preservation of the places you visit.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center mb-8 w-full">
          <div className="md:w-1/2 p-4">
            <h3 className="text-2xl font-semibold mb-2">Effortless Adjustments</h3>
            <p>Plans change, and NjanSanchari adapts. Our AI allows you to make real-time adjustments to your itinerary, ensuring flexibility throughout your journey. Whether you want to extend your stay or explore a new area, our AI has you covered.</p>
          </div>
          <div className="md:w-1/2 p-4">
            <Lottie options={lottieOptions(lottiefile7)} height={150} width={150} />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center w-full">
          <div className="md:w-1/2 p-4 order-2 md:order-1">
            <Lottie options={lottieOptions(support)} height={150} width={150} />
          </div>
          <div className="md:w-1/2 p-4 order-1 md:order-2">
            <h3 className="text-2xl font-semibold mb-2">Comprehensive Support</h3>
            <p>Enjoy 24/7 support with NjanSanchari. Our AI is always available to assist with any travel-related queries or issues. Experience peace of mind knowing that expert help is just a tap away.</p>
          </div>
        </div>

      </div>
      {/* New Section End */}

      {/* Testimonial Section Start */}
      <div className="relative flex flex-col items-center justify-center py-12 bg-white text-black text-center px-[15%]">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Don't Take Our Word for It</h2>
        <p className="text-lg md:text-xl mb-6">See what our users have to say about revolutionizing their travel experiences with Trip Planner AI.</p>

        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-6">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full md:w-[30%]">
            <img src={abshan} alt="User 1" className="w-20 h-20 rounded-full mb-4" />
            <h3 className="text-xl font-semibold mb-2">Abshan</h3>
            <div className="flex mb-4">
              {[...Array(5)].map((star, index) => (
                <svg key={index} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431L24 9.168l-6 5.841 1.416 8.257L12 18.896l-7.416 4.37L6 15.01 0 9.168l8.332-1.15L12 .587z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700">"NjanSanchari’s AI Travel Planner made my trip planning a breeze! Highly recommend it to anyone looking to simplify their travel experience."</p>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full md:w-[30%]">
            <img src={jamshi} alt="User 2" className="w-20 h-20 rounded-full mb-4" />
            <h3 className="text-xl font-semibold mb-2">Jamsheed</h3>
            <div className="flex mb-4">
              {[...Array(5)].map((star, index) => (
                <svg key={index} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431L24 9.168l-6 5.841 1.416 8.257L12 18.896l-7.416 4.37L6 15.01 0 9.168l8.332-1.15L12 .587z" />
                </svg>
              ))}

            </div>
            <p className="text-gray-700">"The personalized itineraries were spot on. I discovered so many hidden gems thanks to the AI recommendations."</p>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center w-full md:w-[30%]">
            <img src={eldho} alt="User 3" className="w-20 h-20 rounded-full mb-4" />
            <h3 className="text-xl font-semibold mb-2">Eldhose Parayil Babu</h3>
            <div className="flex mb-4">
              {[...Array(5)].map((star, index) => (
                <svg key={index} className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .587l3.668 7.431L24 9.168l-6 5.841 1.416 8.257L12 18.896l-7.416 4.37L6 15.01 0 9.168l8.332-1.15L12 .587z" />
                </svg>
              ))}
            </div>
            <p className="text-gray-700">"Traveling on a budget has never been this easy. The AI found me great deals on everything!"</p>
          </div>
        </div>
      </div>
      {/* Testimonial Section End */}

      {/* Video Banner Section */}

      <div className="flex justify-center px-4 my-12">
        <div className="relative w-full max-w-screen-lg h-60 overflow-hidden rounded-3xl">
          <video autoPlay loop muted className="absolute inset-0 w-full h-full object-cover rounded-3xl">
            <source src={video2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center rounded-3xl">
            <h2 className="text-3xl font-bold mb-4 text-white text-center px-4">Ready to Plan Your Perfect Trip?</h2>
            <button
              className="bg-orange-400 hover:bg-orange-500 text-white text-lg font-semibold py-2 px-8 rounded-lg transition duration-300"
              onClick={() => navigate('/contact')}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>   

  );
};

export default AiTravelHome;
