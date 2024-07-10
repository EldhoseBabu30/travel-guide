import React, { useState } from 'react';

const Feed = () => {
  const [selectedGroup, setSelectedGroup] = useState(null);

  const handleGroupSelect = (group) => {
    setSelectedGroup(group);
  };

  const handleBack = () => {
    setSelectedGroup(null);
  };

  return (
    <div className="flex-1 p-4">
      {!selectedGroup ? (
        <>
          <div className="bg-white p-4 rounded shadow mb-4">
            <textarea className="w-full p-2 border rounded" placeholder="What's on your mind?"></textarea>
            <div className="flex justify-between items-center mt-2">
              <div>
                <button className="text-blue-500">Photo</button>
                <button className="text-blue-500 ml-2">Video</button>
                <button className="text-blue-500 ml-2">Poll</button>
                <button className="text-blue-500 ml-2">Event</button>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded">Send</button>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow mb-4">
            <div className="flex items-center mb-4">
              <img src="/assets/user.jpg" alt="User" className="w-10 h-10 rounded-full"/>
              <div className="ml-4">
                <h3 className="font-semibold">Jack McBride</h3>
                <p className="text-gray-500">1 day ago</p>
              </div>
            </div>
            <div>
              <img src="/assets/photo.jpg" alt="Post" className="w-full rounded"/>
              <p className="mt-2">Just had to share this incredible light! My phone picture doesn’t even do it justice, the sky was like a giant watercolor painting in blues and greens.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-semibold mb-4">Groups</h3>
            <div className="flex gap-4 overflow-x-auto">
              <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleGroupSelect('Photography')}>Photography</button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleGroupSelect('Food')}>Food</button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => handleGroupSelect('Travel')}>Travel</button>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-semibold mb-4">Upcoming Events</h3>
            <form>
              <label className="block mb-2">Event Name</label>
              <input type="text" className="w-full p-2 border rounded mb-4"/>
              <label className="block mb-2">Location</label>
              <input type="text" className="w-full p-2 border rounded mb-4"/>
              <label className="block mb-2">Date and Time</label>
              <input type="datetime-local" className="w-full p-2 border rounded mb-4"/>
              <label className="block mb-2">Category</label>
              <select className="w-full p-2 border rounded mb-4">
                <option>Photography</option>
                <option>Food</option>
                <option>Travel</option>
              </select>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">Upload Event</button>
            </form>
          </div>
        </>
      ) : (
        <div className="bg-white p-4 rounded shadow mb-4">
          <button onClick={handleBack} className="text-blue-500 mb-4">Back</button>
          <h3 className="font-semibold mb-4">{selectedGroup} Group Chat</h3>
          <div className="flex flex-col h-96">
            <div className="flex-1 overflow-y-auto mb-4">
              {/* Messages */}
              <div className="flex mb-2">
                <img src="/assets/user.jpg" alt="User" className="w-8 h-8 rounded-full"/>
                <div className="ml-2 bg-gray-200 p-2 rounded">Hello everyone!</div>
              </div>
            </div>
            <div className="flex items-center">
              <textarea className="w-full p-2 border rounded" placeholder="Type a message"></textarea>
              <button className="bg-blue-500 text-white py-2 px-4 rounded ml-2">Send</button>
            </div>
            <div className="flex items-center mt-2">
              <input type="file" accept="audio/*" className="hidden" id="voice-message"/>
              <label htmlFor="voice-message" className="bg-blue-500 text-white py-2 px-4 rounded cursor-pointer">Voice Message</label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feed;
