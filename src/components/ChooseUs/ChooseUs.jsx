import React from 'react';

const App = () => {
  return (
    <div className="container mx-auto p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Why You Should Choose Us</h1>
        <p className="text-lg text-gray-600">
          There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
        <div className="md:w-1/2 space-y-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
              01
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">We provide the best choice for you</h2>
              <p className="text-gray-600">There are many variations of passages of Lorem Ipsum available, but the majority.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
              02
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Low price with best quality</h2>
              <p className="text-gray-600">There are many variations of passages of Lorem Ipsum available, but the majority.</p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-bold">
              03
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-2">Can refund up to 100%</h2>
              <p className="text-gray-600">There are many variations of passages of Lorem Ipsum available, but the majority.</p>
            </div>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <img src="https://via.placeholder.com/600x400" alt="Beautiful landscape" className="rounded-lg shadow-lg w-full" />
          <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg flex items-center space-x-4">
            <img src="https://via.placeholder.com/40" alt="Cravic Mario" className="w-10 h-10 rounded-full"/>
            <div>
              <p className="font-semibold">Cravic Mario</p>
              <p className="text-sm text-gray-500">Give rating</p>
              <div className="flex items-center">
                <span className="text-yellow-500">★ 4.9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
