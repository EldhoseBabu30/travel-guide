import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faUtensils, faHiking } from '@fortawesome/free-solid-svg-icons';

// Define custom icons for different event categories
const icons = {
  photography: new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/camera.svg',
    iconSize: [38, 38],
  }),
  travel: new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/hiking.svg',
    iconSize: [38, 38],
  }),
  food: new L.Icon({
    iconUrl: 'https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free/svgs/solid/utensils.svg',
    iconSize: [38, 38],
  }),
};

const EventCreation = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', description: '', lat: '', lng: '', category: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, newEvent]);
    setNewEvent({ name: '', description: '', lat: '', lng: '', category: '' });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <form className="w-full max-w-lg mb-8" onSubmit={handleSubmit}>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
              Event Name
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="name"
              type="text"
              value={newEvent.name}
              onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="description"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              required
            />
          </div>
          <div className="w-full px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="category">
              Category
            </label>
            <select
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="category"
              value={newEvent.category}
              onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
              required
            >
              <option value="">Select Category</option>
              <option value="photography">Photography</option>
              <option value="travel">Travel</option>
              <option value="food">Food</option>
            </select>
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lat">
              Latitude
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="lat"
              type="number"
              step="any"
              value={newEvent.lat}
              onChange={(e) => setNewEvent({ ...newEvent, lat: e.target.value })}
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lng">
              Longitude
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="lng"
              type="number"
              step="any"
              value={newEvent.lng}
              onChange={(e) => setNewEvent({ ...newEvent, lng: e.target.value })}
              required
            />
          </div>
          <div className="w-full px-3">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Event
            </button>
          </div>
        </div>
      </form>

      <MapContainer center={[10.8505, 76.2711]} zoom={10} className="w-full h-96">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {events.map((event, index) => (
          <Marker key={index} position={[event.lat, event.lng]} icon={icons[event.category]}>
            <Popup>
              <strong>{event.name}</strong>
              <br />
              {event.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default EventCreation;