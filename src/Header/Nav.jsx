import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/light logo.png";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleDropdown = (index) => {
    setActiveDropdown(activeDropdown === index ? null : index);
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
        <Dropdown
          title="Destinations"
          items={{
            "": ["Munnar", "Ooty ", "Kodaikanal", "Kovalam", "Kanyakumari"]
          }}
          active={activeDropdown === 1}
          onClick={() => toggleDropdown(1)}
          ref={dropdownRef}
        />
        <Dropdown
          title="Hotels"
          items={{
            "Popular Hotels": ["Hotel 1", "Hotel 2", "Hotel 3"],
            "Boutique Hotels": ["Hotel 4", "Hotel 5"],
          }}
          active={activeDropdown === 2}
          onClick={() => toggleDropdown(2)}
          ref={dropdownRef}
        />
        <Dropdown
          title="Food Spots"
          items={{
            "Popular Spots": ["Spot 1", "Spot 2", "Spot 3"],
            "Street Food": ["Spot 4", "Spot 5"],
          }}
          active={activeDropdown === 3}
          onClick={() => toggleDropdown(3)}
          ref={dropdownRef}
        />
        <Dropdown
          title="Community"
          items={{
            "Events": ["Event 1", "Event 2", "Event 3"],
            "Meetups": ["Meetup 1", "Meetup 2"],
          }}
          active={activeDropdown === 4}
          onClick={() => toggleDropdown(4)}
          ref={dropdownRef}
        />
        <div className="hidden md:block">
          <input type="text" placeholder="Search" className="bg-transparent border-b border-white text-white placeholder-white focus:outline-none" />
          <button className="ml-4 text-white">Sign In</button>
        </div>
      </div>
    </nav>
  );
};

const Dropdown = React.forwardRef(({ title, items, active, onClick }, ref) => {
  return (
    <div className="relative" ref={ref}>
      <button
        className={`nav-link relative font-bold transition duration-300 ease-in-out transform hover:text-orange-400 hover:scale-105 focus:outline-none ${active ? 'text-orange-400' : ''}`}
        onClick={onClick}
      >
        {title}
      </button>
      {active && (
        <div className="absolute mt-2 w-56 rounded-lg shadow-lg z-50 border border-gray-200 bg-white">
          {Object.keys(items).map((category, idx) => (
            <div key={idx} className="py-2">
              <h3 className="px-4 py-2 text-gray-900 font-semibold">{category}</h3>
              {items[category].map((item, index) => (
                <NavLink
                  key={index}
                  to={`/${title.toLowerCase().replace(" ", "-")}/${item.toLowerCase().replace(" ", "-")}`}
                  className="block px-4 py-2 text-gray-800 hover:text-orange-500"
                >
                  {item}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Nav;
