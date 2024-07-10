import React, { useState } from 'react';

const Sidebar = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleAddLocationClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="w-64 bg-white p-4 md:w-1/2 lg:w-1/3 xl:w-64">
      <div className="mb-8">
        <img src="/assets/user.jpg" alt="User" className="w-16 h-16 rounded-full mx-auto"/>
        <h2 className="text-center mt-2 font-semibold">Tim Benners</h2>
        <p className="text-center text-gray-500">142 followers</p>
        <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2 w-full">My Profile</button>
      </div>
      <button className="bg-green-500 text-white py-2 px-4 rounded mb-4 w-full">Add a Snap +</button>
      <button 
        onClick={handleAddLocationClick} 
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 w-full"
      >
        Add New Location
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Add New Location</h2>
            <label className="block mb-2">Name</label>
            <input type="text" className="w-full p-2 border rounded mb-4"/>
            <label className="block mb-2">Details</label>
            <textarea className="w-full p-2 border rounded mb-4"></textarea>
            <label className="block mb-2">Media</label>
            <input type="file" className="w-full p-2 border rounded mb-4"/>
            <button 
              onClick={handleClosePopup} 
              className="bg-red-500 text-white py-2 px-4 rounded mt-2 w-full"
            >
              Close
            </button>
          </div>
        </div>
      )}
      <nav>
        <ul>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">My Posts</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Activity</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Marketplace</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Events</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Albums</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Videos</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">News</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Courses</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Lists</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Explore Now</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Upcoming for You</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Direct Message</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Notification</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Invites</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Saved</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Settings</span></a></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
