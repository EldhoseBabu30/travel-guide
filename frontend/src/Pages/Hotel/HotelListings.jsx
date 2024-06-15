import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import 'tailwindcss/tailwind.css';

const hotels = [
  {
    id: 1,
    name: "Metro Regency",
    rating: 3.9,
    price: "₹1146",
    star: "2-star hotel",
    address: "Some address in Tirur",
    facilities: "Free WiFi, Air-conditioned, Breakfast",
    location: { lat: 10.973, lng: 76.200 },
    image: 'https://via.placeholder.com/100?text=Metro+Regency',
  },
  {
    id: 2,
    name: "Regal Residency",
    rating: 4.0,
    price: "₹1157",
    star: "Hotel",
    address: "Some address in Tirur",
    facilities: "WiFi, Free WiFi",
    location: { lat: 10.974, lng: 76.201 },
    image: 'https://via.placeholder.com/100?text=Regal+Residency',
  },
  {
    id: 3,
    name: "Hi-TON Hotel",
    rating: 3.8,
    price: "₹1549",
    star: "3-star hotel",
    address: "Some address in Tirur",
    facilities: "Modern lodging with a restaurant",
    location: { lat: 10.975, lng: 76.202 },
    image: 'https://via.placeholder.com/100?text=Hi-TON+Hotel',
  },
  // Add more hotels here
];

const mapContainerStyle = {
  height: "100vh",
  width: "100%",
};

const center = {
  lat: 10.9743763,
  lng: 76.2003748,
};

const HotelMap = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [price, setPrice] = useState(2000);
  const mapRef = useRef();

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const nextHotel = () => {
    const currentIndex = hotels.findIndex(hotel => hotel.id === selectedHotel?.id);
    const nextIndex = (currentIndex + 1) % hotels.length;
    setSelectedHotel(hotels[nextIndex]);
  };

  const prevHotel = () => {
    const currentIndex = hotels.findIndex(hotel => hotel.id === selectedHotel?.id);
    const prevIndex = (currentIndex - 1 + hotels.length) % hotels.length;
    setSelectedHotel(hotels[prevIndex]);
  };

  useEffect(() => {
    if (selectedHotel) {
      mapRef.current.panTo(selectedHotel.location);
    }
  }, [selectedHotel]);

  return (
    <div className="flex">
      <div className="w-1/3 p-4 bg-white shadow-lg overflow-y-auto">
        <input type="text" placeholder="Search Property Address" className="w-full p-2 border rounded mb-4" />
        <div className="mb-4">
          <label>Price Range</label>
          <input
            type="range"
            min="0"
            max="5000"
            value={price}
            onChange={handlePriceChange}
            className="w-full"
          />
        </div>
        <div>
          {hotels.filter(hotel => parseInt(hotel.price.replace('₹', '').replace(',', '')) <= price).map(hotel => (
            <div
              key={hotel.id}
              className={`p-4 mb-4 border rounded shadow ${selectedHotel?.id === hotel.id ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedHotel(hotel)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">{hotel.name}</h2>
                  <p>Rating: {hotel.rating} ⭐</p>
                  <p>{hotel.star}</p>
                  <p>Price: {hotel.price}</p>
                  <p>Facilities: {hotel.facilities}</p>
                </div>
                <img src={hotel.image} alt={hotel.name} className="w-16 h-16 object-cover rounded ml-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3 relative">
        <LoadScript googleMapsApiKey="AIzaSyC35NX4I4MICHrydn6-sJKA2tOYv6m2Bxc
">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={14}
            onLoad={map => mapRef.current = map}
          >
            {hotels.map(hotel => (
              <Marker
                key={hotel.id}
                position={hotel.location}
                onClick={() => setSelectedHotel(hotel)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <button className="bg-white p-2 rounded" onClick={prevHotel}>‹</button>
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <button className="bg-white p-2 rounded" onClick={nextHotel}>›</button>
        </div>
      </div>
    </div>
  );
};

export default HotelMap;
