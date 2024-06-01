import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import google from "../../assets/icons/google.png";
import rightarrow from "../../assets/icons/rightarrow.png";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Sign-up failed");
        setLoading(false);
        return;
      }

      navigate("/sign-in");
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 items-center justify-center p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Left Section */}
        <div
          className="hidden md:block rounded-2xl w-1/2 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://i.pinimg.com/736x/5d/bb/55/5dbb551d5ad0a8a1b2280ef247f61902.jpg)`,
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        >
          <div className="flex items-start justify-center h-full bg-gray bg-opacity-50">
            <div className="text-center text-white mt-8">
              <h1 className="text-4xl font-bold">Discover & See Places</h1>
              <p className="text-lg mt-2">Exploring unique destinations</p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 p-8">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:underline mb-4"
          >
            <img src={rightarrow} className="w-6 h-6 mr-2" alt="Right Arrow" />
            Back to website
          </Link>
          <h1 className="text-3xl font-bold text-center mb-4">
            Create an Account
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Please enter your details
          </p>
          {error && <p className="text-center text-red-600 mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  id="fullname"
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-orange-400"
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  onChange={handleChange}
                  placeholder="mail@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-orange-400"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-bold text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  onChange={handleChange}
                  placeholder="Min of 6 characters"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-orange-400"
                  autoComplete="new-password"
                  required
                />
              </div>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-orange-400 text-white px-5 py-3 rounded-lg hover:bg-orange-500 transition"
            >
              {loading ? 'Loading...' : 'Sign Up'}
            </button>
          </form>
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-3 text-gray-500">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <button
            type="button"
            className="w-full flex items-center justify-center bg-white text-black border border-gray-300 px-5 py-3 rounded-lg hover:bg-gray-100 transition"
          >
            <img src={google} className="w-5 h-5 mr-2" alt="Google Icon" />
            Sign up with Google
          </button>
          <div className="mt-4 text-center">
            <Link
              to="/sign-in"
              className="text-sm text-gray-600 hover:underline"
            >
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
