import React from 'react';
import logo from "../../assets/Sanchari logo high.png";
import google from "../../assets/icons/google.png";
import facebook from "../../assets/icons/facebook.png";
import apple from "../../assets/icons/apple.png";


const SignUp = () => {
  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-md rounded-lg overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-cover" style={{ backgroundImage: "url('/path-to-your-background-image.png')" }}>
          <div className="flex flex-col h-full p-8 bg-gray-800 bg-opacity-50">
            <div className="flex items-center mb-4">
              <div className="bg-white p-2 rounded-full">
                <img src={logo} alt="Logo" className="w-12 h-12" />
              </div>
              <span className="ml-4 text-white text-2xl font-bold">Njan<span className='text-orange-400'>Sanchari</span></span>
            </div>
            <div className="mt-auto">
              <div className="mb-4">
                <input
                  type="text"
                  placeholder="Search destinations, hotels"
                  className="w-full px-4 py-2 text-gray-800 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-teal-300"
                />
                <button className="mt-2 w-full py-2 text-white bg-orange-400 rounded-lg hover:bg-orange-500">
                  Search
                </button>
              </div>
              <p className="text-gray-200 mb-2">Most People Search: Bali, Lombok, Raja Ampat</p>
              <div className="bg-white bg-opacity-25 p-4 rounded-lg text-white">
                <div className="flex items-center mb-2">
                  <img src="/path-to-user-image.png" alt="User" className="w-10 h-10 rounded-full" />
                  <div className="ml-2">
                    <p className="text-sm font-bold">Janne April</p>
                    <p className="text-xs">Traveler</p>
                  </div>
                </div>
                <p className="text-sm">
                  "Traveling has never been easier with this platform. It has saved me time and money on every trip."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="mb-4 text-3xl font-bold">Travel Made Easy</h2>
          <p className="mb-6 text-gray-600">Join Our Community by Creating Your Account and Gain Access to Exclusive Travel Tips and Inspiration</p>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-teal-300"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder=""
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-teal-300"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder=""
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-teal-300"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Phone Number
              </label>
              <input
                type="text"
                placeholder=""
                className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-teal-300"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  placeholder=""
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-teal-300"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  placeholder=""
                  className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-teal-300"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input type="checkbox" className="form-checkbox text-teal-500" />
                <span className="ml-2 text-sm text-gray-700">I agree with the <a href="#" className="text-orange-400 hover:underline">terms and condition</a></span>
              </label>
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-orange-400 rounded-lg hover:bg-orange-500"
            >
              Create Account
            </button>
          </form>
          <div className="flex items-center justify-between mt-6">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-gray-500">or sign up with</span>
            <hr className="w-full border-gray-300" />
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
            <button className="flex-1 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 flex items-center justify-center">
              <img src={google} alt="Google" className="w-4 h-4 mr-2" />
              Google
            </button>
            <button className="flex-1 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 flex items-center justify-center">
              <img src={apple} alt="Apple" className="w-4 h-4 mr-2" />
              Apple
            </button>
            <button className="flex-1 py-2 text-gray-700 border rounded-lg hover:bg-gray-100 flex items-center justify-center">
              <img src={facebook} alt="Facebook" className="w-4 h-4 mr-2" />
              Facebook
            </button>
          </div>
          <p className="mt-4 text-center">
            Already have an account? <a href="#" className="text-orange-400 hover:underline">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
