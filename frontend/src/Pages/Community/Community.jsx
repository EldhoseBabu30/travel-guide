import React, { useState, useContext, createContext } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'tailwindcss/tailwind.css';
import { FaThumbsUp, FaThumbsDown, FaComment, FaUserCircle, FaRobot, FaMicrophone, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for leaflet's icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Context for managing spots
const SpotContext = createContext();
const useSpotContext = () => useContext(SpotContext);

const SpotProvider = ({ children }) => {
  const [spots, setSpots] = useState([]);
  const [user, setUser] = useState({
    name: 'Traveler',
    avatar: 'https://i.pravatar.cc/150',
  });
  const [stories, setStories] = useState([
    { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/151', viewed: false },
    { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/152', viewed: false },
    { id: 3, name: 'Charlie', avatar: 'https://i.pravatar.cc/153', viewed: true },
  ]);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Alice', avatar: 'https://i.pravatar.cc/151', text: 'Hello everyone!' },
    { id: 2, sender: 'Bob', avatar: 'https://i.pravatar.cc/152', text: 'Hi Alice!' },
    { id: 3, sender: 'You', avatar: 'https://i.pravatar.cc/150', text: 'Here is a text message demo.' },
    { id: 4, sender: 'You', avatar: 'https://i.pravatar.cc/150', isVoice: true },
  ]);

  const addSpot = (spot) => {
    setSpots([...spots, spot]);
    toast.success('New spot added!');
  };

  const markStoryAsViewed = (id) => {
    setStories(stories.map(story => story.id === id ? { ...story, viewed: true } : story));
  };

  const addMessage = (message) => {
    setMessages([...messages, message]);
  };

  return (
    <SpotContext.Provider value={{ spots, addSpot, user, setUser, stories, markStoryAsViewed, messages, addMessage }}>
      {children}
    </SpotContext.Provider>
  );
};

const Community = () => {
  return (
    <SpotProvider>
      <div className="min-h-screen bg-gray-100 p-4 pt-16 relative">
        <UserProfile />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SuggestionForm />
          <div className="col-span-1 md:col-span-2">
            <MapWithSpots />
            <MessageBox />
          </div>
          <SnapUpload />
          <PopularPackages />
        </div>
        <AIChatBot />
        <ToastContainer />
      </div>
    </SpotProvider>
  );
};

// User Profile Component
const UserProfile = () => {
  const { user, stories, markStoryAsViewed } = useSpotContext();
  return (
    <div className="flex items-center mb-4">
      <img src={user.avatar} alt="User Avatar" className="w-16 h-16 rounded-full mr-4" />
      <div>
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-gray-600">Welcome to the community!</p>
      </div>
      <div className="ml-auto flex">
        {stories.map(story => (
          <div key={story.id} className="ml-2 cursor-pointer" onClick={() => markStoryAsViewed(story.id)}>
            <img
              src={story.avatar}
              alt={`${story.name}'s story`}
              className={`w-12 h-12 rounded-full border-4 ${story.viewed ? 'border-gray-400' : 'border-orange-400'}`}
            />
            <p className="text-center text-xs mt-1">{story.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Suggestion Form Component
const SuggestionForm = () => {
  const { addSpot } = useSpotContext();
  const [place, setPlace] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (place && description) {
      addSpot({ place, description, coordinates: [10.8505, 76.2711], upvotes: 0, downvotes: 0, comments: [] });
      setPlace('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl mb-4">Add a Suggestion</h2>
      <input
        type="text"
        className="w-full mb-2 p-2 border rounded"
        placeholder="Place"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      />
      <textarea
        className="w-full mb-2 p-2 border rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Add Suggestion
      </button>
    </form>
  );
};

// Map with Spots Component
const MapWithSpots = () => {
  const { spots } = useSpotContext();
  const [selectedSpot, setSelectedSpot] = useState(null);

  return (
    <div className="bg-white rounded shadow relative">
      <h2 className="text-2xl mb-4 p-4">Map</h2>
      <MapContainer center={[10.8505, 76.2711]} zoom={8} className="w-full h-96 z-0">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {spots.map((spot, index) => (
          <Marker
            key={index}
            position={spot.coordinates}
            eventHandlers={{
              click: () => {
                setSelectedSpot(spot);
              },
            }}
          >
            <Popup>
              <b>{spot.place}</b><br />{spot.description}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {selectedSpot && <SpotDetailsModal spot={selectedSpot} onClose={() => setSelectedSpot(null)} />}
    </div>
  );
};

// Snap Upload Component
const SnapUpload = () => {
  const { addSpot } = useSpotContext();
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (image && description) {
      const newSpot = {
        place: 'New Snap',
        description,
        image: URL.createObjectURL(image),
        coordinates: [10.8505, 76.2711],
        upvotes: 0,
        downvotes: 0,
        comments: [],
      };
      addSpot(newSpot);
      setImage(null);
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl mb-4">Add a Snap</h2>
      <input
        type="file"
        className="mb-2"
        onChange={handleImageChange}
      />
      <textarea
        className="w-full mb-2 p-2 border rounded"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
        Add Snap
      </button>
      {image && (
        <img src={URL.createObjectURL(image)} alt="Preview" className="mt-4 rounded" />
      )}
    </form>
  );
};

// Popular Packages Component
const PopularPackages = () => {
  const packages = [
    { id: 1, name: 'Kerala Backwaters', description: 'Enjoy the serene backwaters of Kerala.', price: '₹30000' },
  ];

  return (
    <div className="bg-white p-4 rounded shadow mt-4 md:mt-0">
      <h2 className="text-2xl mb-4">Popular Package</h2>
      {packages.map(pkg => (
        <div key={pkg.id}>
          <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
          <p className="text-gray-600 mb-2">{pkg.description}</p>
          <p className="text-gray-800 font-bold">{pkg.price}</p>
        </div>
      ))}
    </div>
  );
};

// Message Box Component
const MessageBox = () => {
  const { messages, addMessage } = useSpotContext();
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText) {
      addMessage({ id: messages.length + 1, sender: 'You', avatar: 'https://i.pravatar.cc/150', text: messageText });
      setMessageText('');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-4 relative">
      <h2 className="text-2xl mb-4">Messages</h2>
      <div className="max-h-96 overflow-y-auto">
        {messages.map(message => (
          <div key={message.id} className="flex items-start mb-4">
            <img src={message.avatar} alt="User Avatar" className="w-10 h-10 rounded-full mr-4" />
            <div className={`bg-gray-100 p-2 rounded-lg shadow-md ${message.isVoice ? 'border-l-4 border-blue-500' : ''}`}>
              <p className="font-bold">{message.sender}</p>
              {message.isVoice ? (
                <div className="bg-gray-300 w-32 h-10 flex items-center justify-center rounded">
                  🎤 Voice Message Demo
                </div>
              ) : (
                <p>{message.text}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="flex mt-4">
        <input
          type="text"
          className="flex-grow p-2 border rounded-l"
          placeholder="Type a message"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 rounded-r flex items-center">
          <FaPaperPlane />
        </button>
        <button type="button" className="bg-blue-500 text-white px-4 ml-2 rounded flex items-center">
          <FaMicrophone />
        </button>
      </form>
    </div>
  );
};

// AI Chat Bot Component
const AIChatBot = () => {
  const [chatBotMessages, setChatBotMessages] = useState([
    { id: 1, sender: 'ChatBot', text: 'Hi! How can I assist you today?' },
  ]);
  const [chatBotInput, setChatBotInput] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user } = useSpotContext();

  const handleChatBotSend = (e) => {
    e.preventDefault();
    if (chatBotInput) {
      setChatBotMessages([...chatBotMessages, { id: chatBotMessages.length + 1, sender: 'You', text: chatBotInput }]);
      // Mocking AI response
      setChatBotMessages([
        ...chatBotMessages,
        { id: chatBotMessages.length + 1, sender: 'You', text: chatBotInput },
        { id: chatBotMessages.length + 2, sender: 'ChatBot', text: `Thank you for your message, ${user.name}. I will get back to you shortly!` },
      ]);
      setChatBotInput('');
    }
  };

  return (
    <>
      <div className="fixed bottom-20 right-4 bg-blue-500 text-white p-4 rounded-full shadow-lg" onClick={() => setIsChatOpen(true)}>
        <FaRobot size={24} />
      </div>
      {isChatOpen && (
        <Modal isOpen={isChatOpen} onRequestClose={() => setIsChatOpen(false)} className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white p-4 rounded shadow-lg w-full max-w-lg relative z-50">
            <button className="absolute top-2 right-2 text-gray-600" onClick={() => setIsChatOpen(false)}>
              <FaTimes size={24} />
            </button>
            <h2 className="text-2xl mb-4">AI Chat Bot</h2>
            <div className="max-h-96 overflow-y-auto mb-4">
              {chatBotMessages.map((message, index) => (
                <div key={index} className={`flex items-start mb-4 ${message.sender === 'You' ? 'flex-row-reverse' : ''}`}>
                  <div className={`rounded p-2 ${message.sender === 'You' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <p className="font-bold">{message.sender}</p>
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleChatBotSend}>
              <input
                type="text"
                className="w-full p-2 border rounded mb-2"
                placeholder="Ask me anything..."
                value={chatBotInput}
                onChange={(e) => setChatBotInput(e.target.value)}
              />
              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
                Send
              </button>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

// Spot Details Modal Component
const SpotDetailsModal = ({ spot, onClose }) => {
  const [comment, setComment] = useState('');

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment) {
      spot.comments.push({ text: comment });
      setComment('');
    }
  };

  return (
    <Modal isOpen onRequestClose={onClose} className="fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-white rounded p-4 shadow-lg w-full max-w-lg">
        <h2 className="text-2xl mb-4">{spot.place}</h2>
        <p className="mb-4">{spot.description}</p>
        {spot.image && <img src={spot.image} alt="Spot Image" className="mb-4 rounded" />}
        <div className="flex justify-between items-center mb-4">
          <button className="flex items-center text-green-500">
            <FaThumbsUp /> {spot.upvotes}
          </button>
          <button className="flex items-center text-red-500">
            <FaThumbsDown /> {spot.downvotes}
          </button>
        </div>
        <form onSubmit={handleCommentSubmit} className="mb-4">
          <textarea
            className="w-full mb-2 p-2 border rounded"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Submit
          </button>
        </form>
        <button onClick={onClose} className="w-full bg-gray-500 text-white py-2 rounded">
          Close
        </button>
        <div className="mt-4">
          {spot.comments.map((c, index) => (
            <div key={index} className="mb-2 p-2 border rounded">
              {c.text}
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

Modal.setAppElement('#root');

export default Community;
