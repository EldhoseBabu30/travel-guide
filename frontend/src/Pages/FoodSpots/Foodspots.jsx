import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Slider from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';
import 'tailwindcss/tailwind.css';

// Import images
import image1 from '../../assets/munnar.jpg';
import image2 from '../../assets/munnar1.jpg';
import image3 from '../../assets/kodaikanal.jpg';

const libraries = ['places'];
const mapContainerStyle = {
  height: "100vh",
  width: "100%"
};

const center = {
  lat: 10.972399,
  lng: 76.282667
};

// Declare the spots array with imported images
const spots = [
  { id: 1, name: 'Hamhdhi Restaurant and Catering', rating: 4.3, place: 'Kappumugam', open: '9:00 AM', close: '12:00 AM', facilities: 'Dine-in, Takeaway, Delivery', position: { lat: 10.971, lng: 76.283 }, image: image1 },
  { id: 2, name: 'EMS Hospital Canteen', rating: 3.4, place: 'X7G3+GVW', open: '9:00 AM', close: '10:00 PM', facilities: 'Dine-in, Takeaway', position: { lat: 10.973, lng: 76.285 }, image: image2 },
  { id: 3, name: 'Jidha\'s Restaurant', rating: 4.8, place: 'Valamkulam, Bus Stop', open: '10:00 AM', close: '10:00 PM', facilities: 'Dine-in, Takeaway', position: { lat: 10.974, lng: 76.286 }, image: image3 },
  // Add more spots with image imports
];

// Custom Tooltip component for slider
const handleRender = (node, { value }) => (
  <Tooltip
    overlay={`₹${value}`}
    placement="top"
    visible
  >
    {node}
  </Tooltip>
);

const App = () => {
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [price, setPrice] = useState([0, 10000]);
  const mapRef = useRef();

  const handlePriceChange = (value) => {
    setPrice(value);
  };

  const nextSpot = () => {
    const currentIndex = spots.findIndex(spot => spot.id === selectedSpot?.id);
    const nextIndex = (currentIndex + 1) % spots.length;
    setSelectedSpot(spots[nextIndex]);
  };

  const prevSpot = () => {
    const currentIndex = spots.findIndex(spot => spot.id === selectedSpot?.id);
    const prevIndex = (currentIndex - 1 + spots.length) % spots.length;
    setSelectedSpot(spots[prevIndex]);
  };

  useEffect(() => {
    if (selectedSpot) {
      mapRef.current.panTo(selectedSpot.position);
    }
  }, [selectedSpot]);

  return (
    <div className="flex">
      <div className="w-1/3 p-4 bg-white shadow-lg">
        <input type="text" placeholder="Search" className="w-full p-2 border rounded mb-4" />
        <div className="mb-4">
          <label>Price Range</label>
          <Slider
            min={0}
            max={10000}
            value={price}
            onChange={handlePriceChange}
            handleRender={handleRender}
            className="w-full"
          />
        </div>
        <div>
          {spots.map(spot => (
            <div
              key={spot.id}
              className={`p-4 mb-4 border rounded shadow ${selectedSpot?.id === spot.id ? 'bg-gray-200' : ''}`}
              onClick={() => setSelectedSpot(spot)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold">{spot.name}</h2>
                  <p>Rating: {spot.rating}</p>
                  <p>Location: {spot.place}</p>
                  <p>Open: {spot.open} - Close: {spot.close}</p>
                  <p>Facilities: {spot.facilities}</p>
                </div>
                <img src={spot.image} alt={spot.name} className="w-16 h-16 object-cover rounded ml-4" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-2/3 relative">
        <LoadScript googleMapsApiKey="AIzaSyC35NX4I4MICHrydn6-sJKA2tOYv6m2Bxc" libraries={libraries}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={center}
            onLoad={map => mapRef.current = map}
          >
            {spots.map(spot => (
              <Marker
                key={spot.id}
                position={spot.position}
                onClick={() => setSelectedSpot(spot)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <button className="bg-white p-2 rounded" onClick={prevSpot}>‹</button>
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <button className="bg-white p-2 rounded" onClick={nextSpot}>›</button>
        </div>
      </div>
    </div>
  );
};

export default App;
