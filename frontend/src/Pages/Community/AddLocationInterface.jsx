import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const AddLocationInterface = ({ onBackClick }) => {
  const [viewport, setViewport] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 10,
  });
  const [marker, setMarker] = useState({ latitude: 37.7749, longitude: -122.4194 });
  const [locationDetails, setLocationDetails] = useState({
    name: '',
    description: '',
    category: '',
  });

  const handleMapClick = (event) => {
    const [longitude, latitude] = event.lngLat;
    setMarker({ longitude, latitude });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocationDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit location details to backend or perform desired actions
  };

  return (
    <div className="w-full mt-4 p-4">
      <button onClick={onBackClick} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Back</button>
      <form onSubmit={handleSubmit} className="border p-4 rounded bg-gray-100 mb-4">
        <div className="mb-4">
          <label className="block mb-2">Location Name</label>
          <input
            type="text"
            name="name"
            value={locationDetails.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={locationDetails.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={locationDetails.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Location</button>
      </form>
      <div className="border rounded overflow-hidden" style={{ height: '400px' }}>
        <Map
          {...viewport}
          width="100%"
          height="100%"
          mapStyle="mapbox://styles/mapbox/streets-v11"
          onViewportChange={setViewport}
          onClick={handleMapClick}
        >
          <Marker latitude={marker.latitude} longitude={marker.longitude}>
            <div className="bg-red-500 p-2 rounded-full" />
          </Marker>
        </Map>
      </div>
    </div>
  );
};

export default AddLocationInterface;
