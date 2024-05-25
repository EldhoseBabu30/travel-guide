import React from 'react';

const Packages = () => {
  const packages = [
    {
      title: 'Munnar Adventure',
      description: '3 days and 2 nights in Munnar with adventure activities.',
      price: '$500',
      rating: '4.8/5',
      image: 'path-to-image',
    },
    {
      title: 'Lakshadweep Delight',
      description: '5 days and 4 nights in Lakshadweep with scuba diving and snorkeling.',
      price: '$1200',
      rating: '4.9/5',
      image: 'path-to-image',
    },
    {
      title: 'Ooty Getaway',
      description: '2 days and 1 night in Ooty with a toy train ride.',
      price: '$300',
      rating: '4.7/5',
      image: 'path-to-image',
    },
    // Add more packages as needed
  ];

  return (
    <div className="container mx-auto p-6 pt-20">
      <h1 className="text-4xl font-bold text-center my-6 text-orange-400">Our Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg p-4">
            <img src={pkg.image} alt={pkg.title} className="w-full h-48 object-cover rounded-t-lg" />
            <h2 className="text-2xl font-bold mt-4">{pkg.title}</h2>
            <p className="mt-2 text-gray-600">{pkg.description}</p>
            <div className="mt-4 flex justify-between items-center">
              <span className="text-orange-400 font-bold">{pkg.price}</span>
              <span className="text-gray-600">{pkg.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
