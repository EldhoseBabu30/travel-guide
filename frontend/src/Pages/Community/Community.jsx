import React, { useState, useEffect, useRef } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// Import user images (assuming these are available)
import user1 from '../../assets/Community/user1.jpg';
import user2 from '../../assets/Community/user2.jpg';
import user3 from '../../assets/Community/user3.jpg';
import user4 from '../../assets/Community/user4.jpg';
import user5 from '../../assets/Community/user5.jpg';
import user6 from '../../assets/Community/user6.jpg';
import user7 from '../../assets/Community/user7.jpg';
import user8 from '../../assets/Community/user8.jpg';
import user9 from '../../assets/Community/user9.jpg';
import user10 from '../../assets/Community/user10.jpg';
import logo from '../../assets/Sanchari logo high.png';

const Community = () => {
  const [activeComponent, setActiveComponent] = useState('center');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [stories, setStories] = useState([
    { id: 1, user: 'Oscar', img: user1, viewed: false, type: 'image', timestamp: new Date().getTime() - 10000 },
    { id: 2, user: 'Rebecca', img: user2, viewed: false, type: 'image', timestamp: new Date().getTime() - 20000 },
    { id: 3, user: 'Harold', img: user3, viewed: false, type: 'image', timestamp: new Date().getTime() - 30000 },
    { id: 4, user: 'Anna', img: user4, viewed: false, type: 'image', timestamp: new Date().getTime() - 40000 },
    { id: 5, user: 'Garrett', img: user5, viewed: false, type: 'image', timestamp: new Date().getTime() - 50000 },
    { id: 6, user: 'Chloe', img: user6, viewed: false, type: 'image', timestamp: new Date().getTime() - 60000 },
    { id: 7, user: 'Emma', img: user7, viewed: false, type: 'image', timestamp: new Date().getTime() - 70000 },
    { id: 8, user: 'James', img: user8, viewed: false, type: 'image', timestamp: new Date().getTime() - 80000 },
    { id: 9, user: 'Lucas', img: user9, viewed: false, type: 'image', timestamp: new Date().getTime() - 90000 },
    { id: 10, user: 'Mia', img: user10, viewed: false, type: 'image', timestamp: new Date().getTime() - 100000 },
  ]);
  const [currentStory, setCurrentStory] = useState(null);
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

  const fileInputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setStories(prevStories => prevStories.filter(story => (new Date().getTime() - story.timestamp) < 24 * 60 * 60 * 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentStory) {
      const duration = currentStory.type === 'image' ? 5000 : 15000;
      timerRef.current = setTimeout(() => {
        handleNextStory();
      }, duration);
    }
    return () => clearTimeout(timerRef.current);
  }, [currentStory]);

  const handleDirectMessageClick = () => setActiveComponent('messaging');
  const handleAddNewLocationClick = () => setActiveComponent('addLocation');
  const handleBackClick = () => setActiveComponent('center');
  const handleGroupSelect = (group) => setSelectedGroup(group);
  const handleAddLocationClick = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  const handleStoryClick = (story) => {
    setCurrentStory(story);
    setStories(prevStories => prevStories.map(s => s.id === story.id ? { ...s, viewed: true } : s));
  };

  const handleNextStory = () => {
    setStories(prevStories => prevStories.map(s => s.id === currentStory.id ? { ...s, viewed: true } : s));
    const currentIndex = stories.findIndex(s => s.id === currentStory.id);
    if (currentIndex < stories.length - 1) {
      setCurrentStory(stories[currentIndex + 1]);
    } else {
      setCurrentStory(null);
    }
  };

  const handlePrevStory = () => {
    setStories(prevStories => prevStories.map(s => s.id === currentStory.id ? { ...s, viewed: true } : s));
    const currentIndex = stories.findIndex(s => s.id === currentStory.id);
    if (currentIndex > 0) {
      setCurrentStory(stories[currentIndex - 1]);
    }
  };

  const handleCloseModal = () => {
    setStories(prevStories => prevStories.map(s => s.id === currentStory.id ? { ...s, viewed: true } : s));
    setCurrentStory(null);
  };

  const handleAddStory = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newStory = {
          id: stories.length + 1,
          user: 'You',
          img: reader.result,
          viewed: false,
          type: file.type.startsWith('image/') ? 'image' : 'video',
          timestamp: new Date().getTime(),
        };
        setStories(prevStories => [newStory, ...prevStories]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMapClick = (event) => {
    const [longitude, latitude] = event.lngLat;
    setMarker({ longitude, latitude });
  };

  const handleLocationDetailsChange = (e) => {
    const { name, value } = e.target;
    setLocationDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    // Submit location details to backend or perform desired actions
  };

  const LeftColumn = () => (
    <div className="w-full md:w-64 bg-white p-4 md:block hidden">
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
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
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
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded" onClick={handleDirectMessageClick}><span className="ml-2">Direct Message</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Notification</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Invites</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Saved</span></a></li>
          <li className="mb-4"><a href="#" className="flex items-center text-gray-700 hover:bg-gray-200 p-2 rounded"><span className="ml-2">Settings</span></a></li>
        </ul>
      </nav>
    </div>
  );

  const CenterColumn = () => (
    <div className="flex-1 p-4">
      {!selectedGroup ? (
        <>
          <div className="bg-white p-4 rounded shadow mb-4">
            <textarea className="w-full p-2 border rounded" placeholder="What's on your mind?"></textarea>
            <div className="flex flex-wrap justify-between items-center mt-2">
              <div className="flex flex-wrap">
                <button className="text-blue-500 mr-2 mb-2">Photo</button>
                <button className="text-blue-500 mr-2 mb-2">Video</button>
                <button className="text-blue-500 mr-2 mb-2">Poll</button>
                <button className="text-blue-500 mr-2 mb-2">Event</button>
              </div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Send</button>
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
              <p className="mt-2">Just had to share this incredible light! My phone picture doesn't even do it justice, the sky was like a giant watercolor painting in blues and greens.</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-semibold mb-4">Groups</h3>
            <div className="flex flex-wrap gap-4">
              <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2" onClick={() => handleGroupSelect('Photography')}>Photography</button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2" onClick={() => handleGroupSelect('Food')}>Food</button>
              <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2" onClick={() => handleGroupSelect('Travel')}>Travel</button>
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
          <button onClick={() => setSelectedGroup(null)} className="text-blue-500 mb-4">Back</button>
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

  const RightColumn = () => (
    <div className="w-full md:w-64 bg-white p-4 md:block hidden">
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

  const UserStories = () => (
    <div className="w-full max-h-[20vh] overflow-y-hidden relative mx-auto p-4 border border-gray-200 bg-white rounded shadow mb-4">
      <img
        src={logo}
        alt="Njan Sanchari"
        className="rounded-full border-2 border-transparent absolute top-[20%] left-[1%] w-[15%] md:w-[10%]"
      />
      <div className="mt-[1%] flex justify-start gap-4 flex-wrap w-full pl-16 md:pl-32">
        <div className="w-[10%] flex justify-center items-center cursor-pointer flex-col" onClick={handleAddStory}>
          <div className="w-16 h-16 rounded-full border-2 border-blue-400 flex items-center justify-center">
            <span className="text-2xl">+</span>
          </div>
          <span className="text-xs mt-2">Add Story</span>
        </div>
        {stories.map(story => (
          <div key={story.id} className="flex flex-col items-center cursor-pointer" onClick={() => handleStoryClick(story)}>
            <div className={`w-16 h-16 rounded-full border-2 ${story.viewed ? 'border-gray-400' : 'border-orange-400'} flex items-center justify-center`}>
              <img src={story.img} alt={story.user} className="w-full h-full rounded-full" />
            </div>
            <span className="text-xs mt-2">{story.user}</span>
          </div>
        ))}
      </div>
      {currentStory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-4 max-w-md mx-auto w-full">
            {currentStory.type === 'image' ? (
              <img src={currentStory.img} alt={currentStory.user} className="w-full h-64 object-cover rounded-lg" />
            ) : (
              <video src={currentStory.img} className="w-full h-64 object-cover rounded-lg" autoPlay muted />
            )}
            <div className="mt-4 flex justify-between">
              <button onClick={handlePrevStory} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Previous</button>
              <button onClick={handleCloseModal} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
              <button onClick={handleNextStory} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Next</button>
            </div>
          </div>
        </div>
      )}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );

  const MessagingInterface = () => (
    <div className="w-full mt-4 p-4">
      <button onClick={handleBackClick} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Back</button>
      <div className="border p-4 rounded bg-gray-100">
        <h2 className="text-xl font-bold mb-2">Messages</h2>
        {/* Add message display and input fields */}
      </div>
    </div>
  );

  const AddLocationInterface = () => (
    <div className="w-full mt-4 p-4">
      <button onClick={handleBackClick} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Back</button>
      <form onSubmit={handleLocationSubmit} className="border p-4 rounded bg-gray-100 mb-4">
        <div className="mb-4">
          <label className="block mb-2">Location Name</label>
          <input
            type="text"
            name="name"
            value={locationDetails.name}
            onChange={handleLocationDetailsChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Description</label>
          <textarea
            name="description"
            value={locationDetails.description}
            onChange={handleLocationDetailsChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2">Category</label>
          <input
            type="text"
            name="category"
            value={locationDetails.category}
            onChange={handleLocationDetailsChange}
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 mt-20">
      <UserStories />
      <div className="flex flex-col md:flex-row flex-grow mt-8">
        <LeftColumn />
        <div className="flex-grow">
          {activeComponent === 'center' && <CenterColumn />}
          {activeComponent === 'messaging' && <MessagingInterface />}
          {activeComponent === 'addLocation' && <AddLocationInterface />}
        </div>
        <RightColumn />
      </div>
    </div>
  );
};

export default Community;