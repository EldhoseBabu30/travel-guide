import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../../redux/UserSlice';
import google from "../../assets/icons/google.png";

import logo from "../../assets/Sanchari logo high.png";
import vintage_car from '../../assets/vintagecar.png';



const SignIn = () => {


    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        dispatch(signInStart());
        const res = await fetch('/api/auth/sign-in', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data);
        if (data.success === false) {
          dispatch(signInFailure(data.message));
          return;
        }
        dispatch(signInSuccess(data));
        navigate('/');
      } catch (error) {
        dispatch(signInFailure(error.message));
      }
    };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-white shadow-md rounded-tl-3xl rounded-br-3xl rounded-tr-md rounded-bl-md overflow-hidden">
        <div className="lg:w-2/5 w-full flex flex-col items-center p-8">
          <div className="flex items-center mb-6">
            <div className=" p-4">
              <span className="text-white w-28 text-xl font-bold"><img className='w-32' src={logo} alt="" /></span>
            </div>
          </div>
          <h2 className="mb-2 text-3xl font-bold">Hi 👋</h2>
          <p className="mb-6 text-gray-600">Join to the adventure Trips!</p>
          <form onSubmit={handleSubmit} className="w-full" >
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Email
              </label>
              <div className="relative">
                <input
                 onChange={handleChange}
                 id='email'
                  type="email"
                  className="w-full pl-4 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Password
              </label>
              <div className="relative">
                <input
                onChange={handleChange}
                  type="password"
                  id='password'
                  className="w-full pl-4 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-orange-400"
                />
              </div>
            </div>
            <p className="mb-4 text-xs text-gray-600">
              Already have an account? <Link to='/sign-up' className="text-orange-400 hover:underline">Sign up</Link>
            </p>
            <button
            disabled={loading}
              type="submit"
              className="w-full py-2 mt-4 text-white bg-orange-400 rounded-lg hover:bg-orange-500"
            >
            {loading ? 'Loading...' : 'Sign In'}
            </button>
          </form>
          <div className="flex items-center justify-between mt-6 w-full">
            <hr className="w-full border-gray-300" />
            <span className="px-3 text-gray-500">OR</span>
            <hr className="w-full border-gray-300" />
          </div>
          <button className="w-full py-2 mt-4 border rounded-lg text-gray-700 hover:bg-gray-100">
            <img
              src={google}
              alt="Google"
              className="inline w-4 h-4 mr-2"
            />
            Sign in with Google
          </button>
        </div>
        <div className="hidden lg:block lg:w-3/5 w-full h-64 lg:h-auto bg-cover bg-center lg:p-4 lg:overflow-hidden">
          <div className="h-full rounded-tl-3xl rounded-bl-md rounded-tr-md rounded-br-3xl w-full bg-cover bg-center" 
          > <img className='rounded-tl-3xl rounded-bl-md rounded-tr-md rounded-br-3xl' src={vintage_car} alt="" /></div>
        </div>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
};

export default SignIn;
