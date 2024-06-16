import React from 'react';
// import './App.css';

function App() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-4 shadow-lg">
        <div className="flex items-center space-x-4">
          <img src="path/to/logo.png" alt="Logo" className="h-10" />
          <span className="text-xl font-bold">Community</span>
        </div>
        <nav className="mt-10">
          <button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200">Clubs</button>
          <button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200">Explore</button>
          <button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200">Upcoming For You</button>
          <button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200">Direct Message</button>
          <button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200">Notification</button>
          <button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200">Invites</button>
          <button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200">Saved</button>
          <button className="block w-full text-left py-2 px-4 text-gray-700 hover:bg-gray-200">Settings</button>
        </nav>
        <div className="mt-10">
          <div className="flex items-center space-x-4">
            <img src="path/to/user-avatar.jpg" alt="User Avatar" className="h-10 rounded-full" />
            <span>Devon Lane</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          {/* Stories */}
          <div className="flex space-x-4">
            <div className="story viewed">
              <img src="path/to/story1.jpg" alt="Story 1" className="h-14 w-14 rounded-full border-2 border-gray-300" />
            </div>
            <div className="story viewable">
              <img src="path/to/story2.jpg" alt="Story 2" className="h-14 w-14 rounded-full border-2 border-orange-500" />
            </div>
            <div className="story viewable">
              <img src="path/to/story3.jpg" alt="Story 3" className="h-14 w-14 rounded-full border-2 border-orange-500" />
            </div>
          </div>
        </div>

        {/* Popular Groups */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Popular Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">Group 1</h3>
              <p>Details and engagement metrics...</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">Group 2</h3>
              <p>Details and engagement metrics...</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">Group 3</h3>
              <p>Details and engagement metrics...</p>
            </div>
          </div>
        </div>

        {/* Popular Influencers */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Popular Influencers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">Influencer 1</h3>
              <p>Details and engagement metrics...</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">Influencer 2</h3>
              <p>Details and engagement metrics...</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">Influencer 3</h3>
              <p>Details and engagement metrics...</p>
            </div>
          </div>
        </div>

        {/* Random Sections */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Random Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">Section 1</h3>
              <p>Engaging topic or content...</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">Section 2</h3>
              <p>Engaging topic or content...</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-bold">Section 3</h3>
              <p>Engaging topic or content...</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="w-72 bg-white p-4 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Popular Packages</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Package 1</h3>
            <p>Details and engagement metrics...</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Package 2</h3>
            <p>Details and engagement metrics...</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-bold">Package 3</h3>
            <p>Details and engagement metrics...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
