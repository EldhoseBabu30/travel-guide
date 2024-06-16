// UserBadgeSystem.jsx
import React, { useState } from 'react';

const UserBadgeSystem = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'John Doe',
      contributions: {
        explorer: 10,
        photographer: 5,
        foodie: 7,
      },
      badges: [],
    },
    {
      id: 2,
      name: 'Jane Smith',
      contributions: {
        explorer: 2,
        photographer: 3,
        foodie: 1,
      },
      badges: [],
    },
  ]);

  const awardBadges = () => {
    setUsers(users.map(user => {
      const badges = [];
      if (user.contributions.explorer > 5) badges.push('Explorer');
      if (user.contributions.photographer > 5) badges.push('Photographer');
      if (user.contributions.foodie > 5) badges.push('Foodie');
      return { ...user, badges };
    }));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Badge System</h1>
      <button onClick={awardBadges} className="mb-4 px-4 py-2 bg-blue-500 text-white rounded">Award Badges</button>
      <div className="grid grid-cols-1 gap-4">
        {users.map(user => (
          <div key={user.id} className="p-4 border rounded shadow-md">
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p>Explorer Contributions: {user.contributions.explorer}</p>
            <p>Photographer Contributions: {user.contributions.photographer}</p>
            <p>Foodie Contributions: {user.contributions.foodie}</p>
            <div className="mt-2">
              {user.badges.length > 0 ? (
                user.badges.map((badge, index) => (
                  <span key={index} className="inline-block px-3 py-1 bg-green-500 text-white rounded-full mr-2 mb-2">
                    {badge}
                  </span>
                ))
              ) : (
                <p>No badges earned yet.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserBadgeSystem;
