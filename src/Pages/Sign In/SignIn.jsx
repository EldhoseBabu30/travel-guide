import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { FiMail, FiLock } from 'react-icons/fi';
import google from '../../assets/icons/google.png';
import facebook from '../../assets/icons/facebook.png';



const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-orange-50 p-4">
      <div className="flex w-full justify-end">
        <div className="flex flex-col justify-center w-full pr-8">
          <h1 className="text-4xl font-bold mb-4">The trip of your dreams starts with NjanSanchari</h1>
          <p className="text-lg text-gray-700">
            Covering hundreds of destinations and countless experiences, NjanSanchari is your guide for traveling better and smarter.
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mr-16">
          <div className="flex flex-col items-center mb-8">
            <h1 className="text-3xl font-bold text-center">Welcome to Njan<span className='text-orange-400'>Sanchari</span></h1>
            <p className="text-center text-gray-600 mt-2">Sign in to continue</p>
          </div>
          <div className="flex flex-col space-y-4 mb-6">
            <button
              type="button"
              className="w-full flex items-center justify-center bg-white text-black border border-gray-300 px-5 py-3 rounded-md hover:bg-gray-100 transition"
            >
              <img src={google} className="w-5 h-5 mr-2" alt="Google Icon" />
              Continue with Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center bg-white text-black border border-gray-300 px-5 py-3 rounded-md hover:bg-gray-100 transition"
            >
              <img src={facebook} className="w-5 h-5 mr-2" alt="Facebook Icon" />
              Continue with Facebook
            </button>
          </div>
          <div className="flex items-center justify-between my-4">
            <span className="border-b w-1/5 lg:w-1/4"></span>
            <span className="text-xs text-gray-500 uppercase">or</span>
            <span className="border-b w-1/5 lg:w-1/4"></span>
          </div>
          <form className="space-y-6">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input

                value={email}
                onChange={(e) => setEmail(e.target.value)}

                type="email"
              
              
                placeholder="Email address"
                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input

                value={password}
                onChange={(e) => setPassword(e.target.value)}

                type="password"
              
                placeholder="Password"
               
                className="w-full p-3 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-400 text-white px-5 py-3 rounded-md hover:bg-blue-600 transition"
            >
              Sign in
            </button>
          </form>
          <div className="mt-4 text-center">
            <Link to="/sign-up" className="text-sm text-gray-600 hover:underline">Don't have an account? <span className='text-orange-400'>Sign up</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
