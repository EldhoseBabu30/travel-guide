import React, { useState, useEffect, useRef } from 'react';
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

const initialStories = [
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
];

const Modal = ({ show, onClose, currentStory, handleNextStory, handlePrevStory }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-4 max-w-md mx-auto">
        {currentStory.type === 'image' ? (
          <img src={currentStory.img} alt={currentStory.user} className="w-full h-64 object-cover rounded-lg" />
        ) : (
          <video src={currentStory.img} className="w-full h-64 object-cover rounded-lg" autoPlay muted />
        )}
        <div className="mt-4 flex justify-between">
          <button onClick={handlePrevStory} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Previous</button>
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
          <button onClick={handleNextStory} className="bg-gray-200 text-gray-700 px-4 py-2 rounded">Next</button>
        </div>
      </div>
    </div>
  );
};

const UserStories = () => {
  const [stories, setStories] = useState(initialStories);
  const [currentStory, setCurrentStory] = useState(null);
  const fileInputRef = useRef(null);

  const sectionStyle = {
    width: '100%',
    maxHeight: '20vh',
    overflowY: 'hidden',
    position: 'relative',
    margin: 'auto',
    padding: '1rem',
    border: '1px solid #ddd',
  };

  const logoStyle = {
    width: '15%',
    position: 'absolute',
    top: '20%',
    left: '1%',
  };

  const storiesContainerStyle = {
    marginTop: '1%',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '1rem',
    flexWrap: 'wrap',
    width: '100%',
    paddingLeft: '12rem', // Added padding to create a gap from the left
  };

  const addStoryStyle = {
    width: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    flexDirection: 'column',
  };

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

  return (
    <div style={sectionStyle} className="relative bg-white rounded shadow mb-4">
      <img
        src={logo}
        alt="Njan Sanchari"
        className="rounded-full border-2 border-transparent"
        style={logoStyle}
      />
      <div style={storiesContainerStyle}>
        <div style={addStoryStyle} onClick={handleAddStory}>
          <div className="w-16 h-16 rounded-full border-2 border-blue-400 flex items-center justify-center ml-16">
            <span className="text-2xl">+</span>
          </div>
          <span className="text-xs mt-2 ml-16">Add Story</span>
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
      <Modal
        show={currentStory !== null}
        onClose={handleCloseModal}
        currentStory={currentStory}
        handleNextStory={handleNextStory}
        handlePrevStory={handlePrevStory}
      />
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default UserStories;
