import React from 'react';

const Destination = () => {
  const destinations = [
    {
      id: 1,
      name: 'Munnar',
      image: 'path-to-munnar-image.jpg', // Replace with actual image path
      description: 'Explore the beautiful tea gardens and scenic hills of Munnar.',
      price: '$250',
      rating: '4.5/5',
    },
    {
      id: 2,
      name: 'Lakshadweep',
      image: 'path-to-lakshadweep-image.jpg', // Replace with actual image path
      description: 'Enjoy the pristine beaches and crystal clear waters of Lakshadweep.',
      price: '$300',
      rating: '4.7/5',
    },
    {
      id: 3,
      name: 'Ooty',
      image: 'path-to-ooty-image.jpg', // Replace with actual image path
      description: 'Experience the charm of the Queen of Hill Stations.',
      price: '$200',
      rating: '4.4/5',
    },
    // Add more destinations as needed
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-100 dark:bg-gray-900 pt-20">
      <h1 className="text-4xl font-bold text-center my-6 text-orange-400">Destinations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {destinations.map((destination) => (
          <div key={destination.id} className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
            <img src={destination.image} alt={destination.name} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{destination.name}</h2>
              <p className="mt-2 text-gray-700 dark:text-gray-300">{destination.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-orange-400 font-bold">{destination.price}</span>
                <span className="text-gray-600 dark:text-gray-400">{destination.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destination;
