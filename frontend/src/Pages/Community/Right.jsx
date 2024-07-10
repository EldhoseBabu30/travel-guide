import React from 'react';

const RightSidebar = () => {
  return (
    <div className="w-full md:w-64 bg-white p-4">
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Friend Requests</h3>
        <ul>
          <li className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <img src="/assets/user.jpg" alt="User" className="w-10 h-10 rounded-full"/>
              <span className="ml-2">Brendan Eich</span>
            </div>
            <div>
              <button className="text-blue-500 mr-2">✔</button>
              <button className="text-gray-500">✖</button>
            </div>
          </li>
          <li className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <img src="/assets/user.jpg" alt="User" className="w-10 h-10 rounded-full"/>
              <span className="ml-2">Gloria Pittman</span>
            </div>
            <div>
              <button className="text-blue-500 mr-2">✔</button>
              <button className="text-gray-500">✖</button>
            </div>
          </li>
          <li className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <img src="/assets/user.jpg" alt="User" className="w-10 h-10 rounded-full"/>
              <span className="ml-2">Wayne Burton</span>
            </div>
            <div>
              <button className="text-blue-500 mr-2">✔</button>
              <button className="text-gray-500">✖</button>
            </div>
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Upcoming Events</h3>
        <ul>
          <li className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-semibold">Photography Workshop</h4>
              <p className="text-gray-500">July 15, 2024, 10:00 AM</p>
              <p className="text-gray-500">Central Park, NYC</p>
            </div>
          </li>
          <li className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-semibold">Food Festival</h4>
              <p className="text-gray-500">July 20, 2024, 12:00 PM</p>
              <p className="text-gray-500">Downtown LA</p>
            </div>
          </li>
          <li className="flex justify-between items-center mb-2">
            <div>
              <h4 className="font-semibold">Travel Meetup</h4>
              <p className="text-gray-500">August 5, 2024, 5:00 PM</p>
              <p className="text-gray-500">Beachside Cafe, SF</p>
            </div>
          </li>
        </ul>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Birthdays</h3>
        <div>
          <button className="bg-blue-500 text-white py-2 px-4 rounded">Celebrate</button>
          <p className="text-gray-500 mt-2">See other 8 have upcoming birthdays</p>
        </div>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Sponsored Ads</h3>
        <div className="bg-gray-100 p-4 rounded">
          <img src="/assets/ad.jpg" alt="Ad" className="w-full rounded mb-2"/>
          <h4 className="font-semibold">BigChef Lounge</h4>
          <p className="text-gray-500">Craving delicious food and a relaxing atmosphere? BigChef Lounge offers upscale cuisine in a comfortable setting.</p>
          <button className="text-blue-500 mt-2">Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
