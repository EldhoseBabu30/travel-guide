import React, { useState } from 'react';

const Destination = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const destinations = {
    "South America": ["Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "More..."],
    "Europe": ["Armenia", "Bosnia and Herzegovina", "Corsica", "Croatia", "England", "More..."],
    "Africa & Middle East": ["Benin", "Botswana", "Egypt", "Ghana", "Jordan", "More..."],
    "Asia": ["India", "Japan", "Maldives", "Mongolia", "Nepal", "More..."],
    "North & Central America": ["Canada", "Costa Rica", "Dominican Republic", "Mexico", "Panama", "More..."],
  };

  const toggleDropdown = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
  };

  return (
    <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 pt-20">
      <div
        className="relative bg-cover bg-center bg-no-repeat h-auto flex flex-col items-center justify-center"
        style={{
          backgroundImage: `url('https://img.freepik.com/free-vector/grey-world-map_1053-431.jpg?t=st=1717874654~exp=1717878254~hmac=54a0e00fdd4d45d1be189a4c9ce407d3945b924d3c7be065a845276d5cf21c7f&w=740')`,
        }}
      >
        <div className=" bg-opacity-50 p-6 rounded-lg text-center mb-6">
          <h2 className="text-4xl font-bold text-orange-500 mb-4">Remarkable places.</h2>
          <h2 className="text-4xl font-bold text-orange-500 mb-4">Wildly unique experiences.</h2>
          <h2 className="text-4xl font-bold text-orange-500 mb-4">Positive impact travel.</h2>
        </div>
        <div className="text-center mb-6">
          <div className="flex flex-wrap justify-center">
            {Object.keys(destinations).map((category) => (
              <div key={category} className="mb-4 mx-2">
                <button
                  onClick={() => toggleDropdown(category)}
                  className="text-2xl font-bold text-gray-900 dark:text-gray-100 bg-gray-200 dark:bg-gray-700 p-2 rounded-lg w-full text-left"
                >
                  {category}
                </button>
                {selectedCategory === category && (
                  <ul className="mt-2 bg-gray-200 dark:bg-gray-700 rounded-lg p-4">
                    {destinations[category].map((place) => (
                      <li key={place} className="text-gray-700 dark:text-gray-300 py-1">
                        {place}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden mt-10 p-6 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Join our travel revolution</h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Sign up to stay in the know - hot new travel spots, how we strive to make the world a better place, and all sorts of surprises.
        </p>
        <form className="flex justify-center">
          <input
            type="email"
            className="p-2 rounded-l-lg border border-gray-300 dark:border-gray-600 focus:outline-none"
            placeholder="Your email"
          />
          <button className="p-2 bg-orange-400 text-white rounded-r-lg hover:bg-orange-500">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Destination;
