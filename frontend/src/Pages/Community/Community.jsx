import React, { useState } from 'react';
import LeftColumn from './Left';
import CenterColumn from './Center';
import RightColumn from './Right';
import MessagingInterface from './MessagingInterface';
import AddLocationInterface from './AddLocationInterface';
import UserStories from './UserStories';

const Community = () => {
  const [activeComponent, setActiveComponent] = useState('center');

  const handleDirectMessageClick = () => setActiveComponent('messaging');
  const handleAddNewLocationClick = () => setActiveComponent('addLocation');
  const handleBackClick = () => setActiveComponent('center');

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 mt-20">
      <UserStories />
      <div className="flex flex-grow mt-8">
        <LeftColumn
          onDirectMessageClick={handleDirectMessageClick}
          onAddNewLocationClick={handleAddNewLocationClick}
        />
        {activeComponent === 'center' && <CenterColumn />}
        {activeComponent === 'messaging' && <MessagingInterface onBackClick={handleBackClick} />}
        {activeComponent === 'addLocation' && <AddLocationInterface onBackClick={handleBackClick} />}
        <RightColumn />
      </div>
    </div>
  );
};

export default Community;