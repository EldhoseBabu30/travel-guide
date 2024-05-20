import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import munnar from '../../assets/munnar.jpg';
import varkala from '../../assets/varkala.jpg';
import kodai from '../../assets/kodai.jpg';
import ooty from '../../assets/ooty.jpg';
import fort from '../../assets/fort.jpg';

const DestinationCard = ({ image, title, description, price, rating, isActive }) => (
  <div className={`card bg-white shadow-xl rounded-lg overflow-hidden m-2 transform transition-transform duration-300 ${isActive ? 'scale-105 shadow-2xl' : ''}`}>
    <div className={`relative ${isActive ? 'h-48' : 'h-full'}`}>
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    {isActive && (
      <div className={`p-4 transition-opacity duration-300`}>
        <h3 className="font-bold text-xl mb-2">{title}</h3>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-orange-400 font-bold">${price}</span>
          <span className="flex items-center">
            <svg
              className="w-5 h-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 15l-5.878 3.09 1.122-6.545L.367 7.09l6.564-.955L10 0l2.09 6.135 6.543.955-4.874 4.455 1.122 6.545L10 15z" />
            </svg>
            <span className="ml-1">{rating}</span>
          </span>
        </div>
      </div>
    )}
  </div>
);

const NextArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 transition-colors duration-200 z-10"
    onClick={onClick}
  >
    <svg
      className="w-6 h-6 text-gray-700"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-lg hover:bg-gray-300 transition-colors duration-200 z-10"
    onClick={onClick}
  >
    <svg
      className="w-6 h-6 text-gray-700"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fillRule="evenodd" d="M12.707 14.707a1 1 0 010-1.414L9.414 10l3.293-3.293a1 1 0 10-1.414-1.414l-4 4a1 1 0 000 1.414l4 4a1 1 0 001.414 0z" clipRule="evenodd" />
    </svg>
  </button>
);

const App = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const destinations = [
    {
      image: munnar,
      title: 'Munnar best tour',
      description: 'Hiking our | Stoke on Trent',
      price: '250.00',
      rating: '4.4/5 Ratings'
    },
    {
      image: varkala,
      title: 'Varkala best tour',
      description: 'Hiking our | Stoke on Trent',
      price: '803.50',
      rating: '4.4/5 Ratings'
    },
    {
      image: kodai,
      title: 'Kodaikanal tour',
      description: 'Hiking our | Stoke on Trent',
      price: '360.00',
      rating: '4.4/5 Ratings'
    },
    {
      image: ooty,
      title: 'Ooty tour',
      description: 'Hiking our | Stoke on Trent',
      price: '250.00',
      rating: '4.4/5 Ratings'
    },
    {
      image: fort,
      title: 'Fort Kochi tour',
      description: 'Hiking our | Stoke on Trent',
      price: '299.99',
      rating: '4.5/5 Ratings'
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1280, // Large screens (lg)
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1024, // Medium screens (md)
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 640, // Small screens (sm)
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  };

  return (
    <div className="h-screen container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">
        Find your best <span className="text-orange-400">destination</span>
      </h1>
      <p className="text-center mb-12">We have more than 350+ destinations you can choose</p>
      <div className="flex justify-center mb-12">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Destinations..."
            className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <svg
            className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.9 14.32a8 8 0 111.42-1.42l4.38 4.37-1.42 1.42-4.38-4.37zm-6.4-11.44a6 6 0 100 12 6 6 0 000-12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      <Slider {...settings}>
        {destinations.map((destination, index) => (
          <DestinationCard key={index} {...destination} isActive={currentSlide === index} />
        ))}
      </Slider>
    </div>
  );
};

export default App;
