import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TripContext } from '../AiTravel/context/TripContext';

const AiTraveller = () => {
  const { tripData, setTripData } = useContext(TripContext);
  const [travelerType, setTravelerType] = useState('');
  const [peopleCount, setPeopleCount] = useState(0);
  const navigate = useNavigate();

  const handleIncrement = () => setPeopleCount(peopleCount + 1);
  const handleDecrement = () => setPeopleCount(Math.max(0, peopleCount - 1));

  const handleContinue = () => {
    if ((travelerType === 'Family' || travelerType === 'Friends' || travelerType === 'Work') && peopleCount === 0) {
      alert('Please select the number of people traveling.');
    } else if (travelerType === 'Only Me') {
      setTripData({
        ...tripData,
        travelers: { type: travelerType, count: 1 },
      });
      navigate('/select');
    } else {
      setTripData({
        ...tripData,
        travelers: { type: travelerType, count: travelerType === 'A Couple' ? 2 : peopleCount },
      });
      navigate('/select');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-2xl p-6">
        <h1 className="text-4xl font-bold text-orange-400 mb-8 text-center">👫 Select Traveler Type 👨‍👩‍👧‍👦</h1>
        <div className="flex flex-col items-center space-y-4">
          {['Only Me', 'A Couple', 'Family', 'Friends', 'Work'].map(type => (
            <button
              key={type}
              className={`w-full max-w-xs p-4 text-lg rounded-lg border-2 transition-colors duration-300 ${
                travelerType === type
                  ? 'bg-orange-200 text-black border-orange-400'
                  : 'bg-white text-black border-orange-400 hover:bg-orange-100 hover:text-black'
              }`}
              onClick={() => {
                setTravelerType(type);
                if (type === 'Only Me') {
                  setPeopleCount(1);
                } else if (type === 'A Couple') {
                  setPeopleCount(2);
                } else {
                  setPeopleCount(0);
                }
              }}
            >
              {type} {type === 'Only Me' && '👤'} {type === 'A Couple' && '❤️'} {type === 'Family' && '👨‍👩‍👧‍👦'} {type === 'Friends' && '👯‍♂️'} {type === 'Work' && '💼'}
            </button>
          ))}
        </div>
        {(travelerType === 'Family' || travelerType === 'Friends' || travelerType === 'Work') && (
          <div className="flex justify-center items-center mt-8">
            <button onClick={handleDecrement} className="bg-orange-300 text-black w-10 h-10 mr-4 rounded-lg">-</button>
            <span className="text-xl">{peopleCount} {peopleCount === 1 ? 'person' : 'people'}</span>
            <button onClick={handleIncrement} className="bg-orange-300 text-black w-10 h-10 ml-4 rounded-lg">+</button>
          </div>
        )}
        <div className="flex justify-center mt-8">
          <button onClick={handleContinue} className="bg-orange-400 hover:bg-orange-500 text-white w-48 h-12 text-lg rounded-lg">
            👉 Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiTraveller;
