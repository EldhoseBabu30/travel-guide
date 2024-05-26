import React from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import google from '../../assets/icons/google.png'; 
import apple from '../../assets/icons/apple.png'; 

const SignIn = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-3xl font-bold text-center">Welcome back to Njan<span className="text-orange-400">Sanchari</span></h1>
          <p className="text-center text-gray-600 mt-2">Sign in to your account below</p>
        </div>
        <form className="space-y-6">
          <div className="relative">
            <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="E-mail"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="relative">
            <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <a href="#" className="text-sm text-orange-500 hover:underline">Don't have an account? Sign up</a>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white px-5 py-3 rounded-md hover:bg-orange-600 transition"
          >
            Sign in
          </button>
          <div className="flex flex-col space-y-4">
            <button
              type="button"
              className="w-full flex items-center justify-center bg-white text-black border border-gray-300 px-5 py-3 rounded-md hover:bg-gray-100 transition"
            >
              <img src={google} className="w-4 h-4 mr-2" alt="Google Icon" />
             Sign in with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center bg-white text-black border border-gray-300 px-5 py-3 rounded-md hover:bg-gray-100 transition"
            >
              <img src={apple} className="w-5 h-5 mr-2" alt="Apple Icon" />
               Sign in with Apple
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
