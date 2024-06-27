import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const TripPlanner = () => {
  const [itinerary, setItinerary] = useState([]);
  const [markers, setMarkers] = useState([]);

  const addMarker = (e) => {
    const newMarker = { lat: e.latlng.lat, lng: e.latlng.lng };
    setMarkers([...markers, newMarker]);
  };

  const AddMarkerToMap = () => {
    useMapEvents({
      click: addMarker,
    });
    return null;
  };

  const addActivity = (activity) => {
    setItinerary([...itinerary, activity]);
  };

  const removeActivity = (index) => {
    const newItinerary = itinerary.filter((_, i) => i !== index);
    setItinerary(newItinerary);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Plan Your Trip</h1>
      <div className="mb-4">
        <input type="text" placeholder="Add an activity" className="border p-2 mr-2" />
        <button onClick={() => addActivity('New Activity')} className="bg-blue-500 text-white p-2">Add</button>
      </div>
      <ul>
        {itinerary.map((activity, index) => (
          <li key={index} className="mb-2 flex justify-between">
            {activity}
            <button onClick={() => removeActivity(index)} className="text-red-500">Remove</button>
          </li>
        ))}
      </ul>
      <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "500px", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <AddMarkerToMap />
        {markers.map((position, idx) => (
          <Marker key={idx} position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default TripPlanner;
