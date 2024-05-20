import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/light logo.png";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState({});

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (index) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <nav className="fixed top-0 left-[2.5%] w-[95%] bg-black bg-opacity-50 p-4 px-8 flex items-center text-white z-40 mt-4 rounded-xl">
      <Link to="/" className="flex items-center">
        <img src={logo} alt="Sanchari Logo" className="w-28 h-auto object-contain" />
      </Link>
      <button className="text-white md:hidden ml-auto" onClick={toggleMenu}>
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
        </svg>
      </button>
      <div className={`flex-col md:flex md:flex-row md:items-center md:ml-40 gap-4 ${menuOpen ? 'absolute top-full left-0 right-0 mt-4 bg-black bg-opacity-50 p-4 rounded-xl z-50 flex' : 'hidden'} md:flex`}>
        <div className="relative ">
          <NavLink
            to=""
            className="nav-link relative text-white font-bold transition duration-300 ease-in-out transform hover:text-orange-400 hover:scale-110 hover:shadow-lg"
            activeClassName="active"
            onClick={() => toggleDropdown(1)}
          >
            Destinations
          </NavLink>
          {dropdownOpen[1] && (
            <div className="absolute mt-2 w-full md:w-48 bg-white text-black rounded shadow-lg z-50">
              <NavLink to="/destinations/place1" className="block px-4 py-2 hover:bg-gray-200">Place 1</NavLink>
              <NavLink to="/destinations/place2" className="block px-4 py-2 hover:bg-gray-200">Place 2</NavLink>
              <NavLink to="/destinations/place3" className="block px-4 py-2 hover:bg-gray-200">Place 3</NavLink>
            </div>
          )}
        </div>
        <div className="relative">
        <NavLink
            to=""
            className="nav-link relative text-white font-bold transition duration-300 ease-in-out transform hover:text-orange-400 hover:scale-110 hover:shadow-lg"
            activeClassName="active"
            onClick={() => toggleDropdown(2)}
          >
            Hotels
          </NavLink>
          {dropdownOpen[2] && (
            <div className="absolute mt-2 w-full md:w-48 bg-white text-black rounded shadow-lg z-50">
              <NavLink to="/hotels/hotel1" className="block px-4 py-2 hover:bg-gray-200">Hotel 1</NavLink>
              <NavLink to="/hotels/hotel2" className="block px-4 py-2 hover:bg-gray-200">Hotel 2</NavLink>
              <NavLink to="/hotels/hotel3" className="block px-4 py-2 hover:bg-gray-200">Hotel 3</NavLink>
            </div>
          )}
        </div>
        <div className="relative">
        <NavLink
            to=""
            className="nav-link relative text-white font-bold transition duration-300 ease-in-out transform hover:text-orange-400 hover:scale-110 hover:shadow-lg"
            activeClassName="active"
            onClick={() => toggleDropdown(3)}
          >
            Food Spots
          </NavLink>
          {dropdownOpen[3] && (
            <div className="absolute mt-2 w-full md:w-48 bg-white text-black rounded shadow-lg z-50">
              <NavLink to="/food-spots/spot1" className="block px-4 py-2 hover:bg-gray-200">Spot 1</NavLink>
              <NavLink to="/food-spots/spot2" className="block px-4 py-2 hover:bg-gray-200">Spot 2</NavLink>
              <NavLink to="/food-spots/spot3" className="block px-4 py-2 hover:bg-gray-200">Spot 3</NavLink>
            </div>
          )}
        </div>
        <div className="relative">
        <NavLink
            to=""
            className="nav-link relative text-white font-bold transition duration-300 ease-in-out transform hover:text-orange-400 hover:scale-110 hover:shadow-lg"
            activeClassName="active"
            onClick={() => toggleDropdown(4)}
          >
            Community
          </NavLink>
          {dropdownOpen[4] && (
            <div className="absolute mt-2 w-full md:w-48 bg-white text-black rounded shadow-lg z-50">
              <NavLink to="/community/event1" className="block px-4 py-2 hover:bg-gray-200">Event 1</NavLink>
              <NavLink to="/community/event2" className="block px-4 py-2 hover:bg-gray-200">Event 2</NavLink>
              <NavLink to="/community/event3" className="block px-4 py-2 hover:bg-gray-200">Event 3</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
