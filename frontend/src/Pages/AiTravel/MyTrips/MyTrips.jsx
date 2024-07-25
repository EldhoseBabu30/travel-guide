import React, { useState, useEffect } from 'react';
import { FaPlane, FaHotel, FaMapMarkerAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const TripCard = ({ destination, date, hotel, activities }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105">
    <div className="bg-orange-400 text-white p-4">
      <h3 className="text-xl font-bold">{destination}</h3>
      <p className="text-sm">{date}</p>
    </div>
    <div className="p-4">
      <p className="flex items-center mb-2"><FaHotel className="mr-2 text-orange-400" /> {hotel}</p>
      <p className="flex items-center"><FaMapMarkerAlt className="mr-2 text-orange-400" /> {activities}</p>
    </div>
  </div>
);

const MyTrips = () => {
  const [trips, setTrips] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const token = localStorage.getItem('authorization');
        if (!token) {
          throw new Error('No authorization token found');
        }

        if (!currentUser || !currentUser.id) {
          return; // Exit if user is not authenticated
        }

        const response = await axios.get('http://localhost:3000/api/travelplanner', {
          headers: {
            Authorization: `${token}`
          }
        });

        setTrips(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching trips:', err);
        setError(err.response?.data?.message || 'An error occurred while fetching trips');
        setLoading(false);
        if (err.response?.status === 401) {
          // Unauthorized, redirect to login
          navigate('/sign-in');
        }
      }
    };

    fetchTrips();
  }, [currentUser, navigate]);

  if (!currentUser) {
    return <div className="text-center mt-20">Please log in to view your trips.</div>;
  }

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen pt-20">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-orange-400">My Trips</h1>
        {trips.length === 0 ? (
          <p className="text-center text-gray-600">You haven't planned any trips yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trips.map((trip, index) => (
              <TripCard key={index} {...trip} />
            ))}
          </div>
        )}
        <div className="mt-12 text-center">
          <Link 
            to="/travelplanner/ai-home" 
            className="bg-orange-400 text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-500 transition-colors duration-300 inline-flex items-center"
          >
            <FaPlane className="mr-2" /> Plan a New Trip
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyTrips;
