import React from 'react';

const MessagingInterface = ({ onBackClick }) => {
  return (
    <div className="w-full mt-4 p-4">
      <button onClick={onBackClick} className="bg-blue-500 text-white py-2 px-4 rounded mb-4">Back</button>
      <div className="border p-4 rounded bg-gray-100">
        <h2 className="text-xl font-bold mb-2">Messages</h2>
        {/* Add message display and input fields */}
      </div>
    </div>
  );
};

export default MessagingInterface;
