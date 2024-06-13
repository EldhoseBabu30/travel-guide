import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const hotels = [
  {
    id: 1,
    name: "Luxury Stay",
    price: "$300",
    address: "123 Main St, New York, NY",
    bed: 2,
    bath: 1,
    size: "500 sqft",
    rating: 4.5,
    location: { lat: 40.712776, lng: -74.005974 }
  },
  {
    id: 2,
    name: "Cozy Retreat",
    price: "$200",
    address: "456 Elm St, New York, NY",
    bed: 1,
    bath: 1,
    size: "300 sqft",
    rating: 4.2,
    location: { lat: 40.758896, lng: -73.985130 }
  },
  // Add more hotels here
];

const mapContainerStyle = {
  height: "100vh",
  width: "50vw",
};

const center = {
  lat: 40.712776,
  lng: -74.005974,
};

const HotelMap = () => {
  const [selectedHotel, setSelectedHotel] = useState(null);

  return (
    <div className="flex">
      <div className="w-1/2 p-4 overflow-y-auto">
        <input
          type="text"
          placeholder="Search Property Address"
          className="p-2 w-full mb-4 border rounded"
        />
        <div className="grid gap-4">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="border rounded-lg p-4 cursor-pointer"
              onClick={() => setSelectedHotel(hotel)}
            >
              <img
                src={`https://via.placeholder.com/300?text=${hotel.name}`}
                alt={hotel.name}
                className="w-full h-32 object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-bold">{hotel.price}</h3>
              <p>{hotel.address}</p>
              <div className="flex justify-between">
                <span>{hotel.bed} Bed</span>
                <span>{hotel.bath} Bath</span>
                <span>{hotel.size}</span>
              </div>
              <div>Rating: {hotel.rating} ⭐</div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-1/2">
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={12}
          >
            {hotels.map((hotel) => (
              <Marker
                key={hotel.id}
                position={hotel.location}
                onClick={() => setSelectedHotel(hotel)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default HotelMap;
