import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/light logo.png";
import { FiSearch, FiUser } from "react-icons/fi";
import { MdLocationOn, MdHotel, MdRestaurant } from "react-icons/md";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from '../redux/user/UserSlice.js';
import Modal from "./Modal";

const Nav = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const dropdownRefs = useRef([]);
  const userDropdownRef = useRef();

  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthPage = location.pathname === "/sign-in" || location.pathname === "/sign-up";

  const { currentUser } = useSelector((state) => state.user);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch('http://localhost:3000/api/auth/sign-out');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      dropdownRefs.current.forEach((ref, index) => {
        if (ref && !ref.contains(event.target)) {
          setActiveDropdown((prev) => (prev === index ? null : prev));
        }
      });
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
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

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const confirmSignOut = () => {
    handleSignOut();
    closeModal();
  };

  if (isAuthPage) {
    return null; // Don't render the navbar on the authentication pages
  }

  return (
    <nav className="fixed top-0 left-[2.5%] w-[95%] bg-black bg-opacity-50 p-4 px-8 flex items-center text-white z-40 mt-4 rounded-xl h-16 md:h-auto transition-all duration-300">
      <Link to="/" className={`flex items-center ${searchOpen ? 'hidden md:flex' : 'flex'}`}>
        <img src={logo} alt="Sanchari Logo" className="w-28 h-auto object-contain" />
      </Link>
      <div className="flex items-center ml-auto gap-4 md:hidden">
        <div className={`flex items-center transition-all duration-500 ease-in-out ${searchOpen ? 'border-b border-white' : ''}`}>
          <input
            type="text"
            placeholder="Search"
            className={`bg-transparent text-white placeholder-white focus:outline-none transition-all duration-500 ease-in-out ${searchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
          />
          <button className="text-white" onClick={toggleSearch}>
            <FiSearch className="text-white cursor-pointer text-2xl transition-transform duration-1000 ease-in-out transform hover:text-orange-400 hover:scale-110" />
          </button>
        </div>
        <div className="relative" ref={userDropdownRef}>
          {currentUser ? (
            <img
              className="rounded-full h-7 w-7 object-cover cursor-pointer"
              src={currentUser.avatar}
              alt="profile"
              onClick={toggleUserDropdown}
            />
          ) : (
            <FiUser
              className="text-white cursor-pointer text-2xl transition-transform duration-500 ease-in-out transform hover:text-orange-400 hover:scale-110"
              onClick={toggleUserDropdown}
            />
          )}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg z-50">
              {currentUser ? (
                <>
                  <NavLink to="/profile" className="block px-4 py-2 rounded-lg hover:text-orange-400">Profile</NavLink>
                  <NavLink to="/my-trips" className="block px-4 py-2 rounded-lg hover:text-orange-400">My Trips</NavLink>
                  <button
                    onClick={openModal}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:text-orange-400"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <NavLink to="/sign-in" className="block px-4 py-2 rounded-lg hover:text-orange-400">Sign In</NavLink>
              )}
            </div>
          )}
        </div>
        <button className="text-white ml-auto" onClick={toggleMenu}>
          <svg className="w-6 h-6 transition-transform duration-500 ease-in-out transform hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}></path>
          </svg>
        </button>
      </div>
      <div className={`flex-col md:flex md:flex-row md:items-center md:ml-40 gap-4 ${menuOpen ? 'absolute top-full left-0 right-0 mt-4 bg-black bg-opacity-50 p-4 rounded-xl z-50 flex' : 'hidden'} md:flex transition-all duration-300`}>
        <Dropdown
          title="Destinations"
          items={[
            { label: "Munnar", path: "/munnar" },
            { label: "Ooty", path: "/ooty" },
            { label: "Kodaikanal", path: "/kodaikanal" },
            { label: "Kovalam", path: "/kovalam" },
            { label: "Kanyakumari", path: "/kanyakumari" },
            { label: "See All Destinations", path: "/destinations" }
          ]}
          active={activeDropdown === 1}
          onClick={() => toggleDropdown(1)}
          ref={(el) => (dropdownRefs.current[1] = el)}
          highlightItem="See All Destinations"
        />
       <NavLink
          to="/hotels"
          className="text-white font-semibold cursor-pointer transition-transform duration-500 ease-in-out transform hover:text-orange-400 hover:scale-110"
        >
          Hotels
        </NavLink>
        <NavLink
          to="/food-spots"
          className="text-white font-semibold cursor-pointer transition-transform duration-500 ease-in-out transform hover:text-orange-400 hover:scale-110"
        >
          Food Spots
        </NavLink>
        <NavLink
          to="/community"
          className="text-white font-semibold cursor-pointer transition-transform duration-500 ease-in-out transform hover:text-orange-400 hover:scale-110"
        >
          Community
        </NavLink>
        <NavLink
          to="/travelplanner/ai-home"
          className="text-white font-semibold cursor-pointer transition-transform duration-500 ease-in-out transform hover:text-orange-400 hover:scale-110"
        >
          Travel Planner
        </NavLink>
      </div>
      <div className="hidden md:flex items-center ml-auto gap-4">
        <div className={`flex items-center transition-all duration-500 ease-in-out ${searchOpen ? 'border-b border-white' : ''}`}>
          <input
            type="text"
            placeholder="Search"
            className={`bg-transparent text-white placeholder-white focus:outline-none transition-all duration-500 ease-in-out ${searchOpen ? 'w-full opacity-100' : 'w-0 opacity-0'}`}
          />
          <button className="text-white" onClick={toggleSearch}>
            <FiSearch className="text-white cursor-pointer hover:text-orange-400 text-2xl transition-transform duration-500 ease-in-out transform hover:scale-110" />
          </button>
        </div>
        <div className="relative" ref={userDropdownRef}>
          {currentUser ? (
            <img
              className="rounded-full h-7 w-7 object-cover cursor-pointer"
              src={currentUser.avatar}
              alt="profile"
              onClick={toggleUserDropdown}
            />
          ) : (
            <FiUser
              className="text-white cursor-pointer text-2xl transition-transform duration-500 ease-in-out transform hover:text-orange-400 hover:scale-110"
              onClick={toggleUserDropdown}
            />
          )}
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg z-50">
              {currentUser ? (
                <>
                  <NavLink to="/profile" className="block px-4 py-2 rounded-lg hover:text-orange-400">Profile</NavLink>
                  <NavLink to="/my-trips" className="block px-4 py-2 rounded-lg hover:text-orange-400">My Trips</NavLink>
                  <button
                    onClick={openModal}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:text-orange-400"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <NavLink to="/sign-in" className="block px-4 py-2 rounded-lg hover:text-orange-400">Sign In</NavLink>
              )}
            </div>
          )}
        </div>
      </div>
      <Modal isOpen={modalOpen} onClose={closeModal} onConfirm={confirmSignOut} />
    </nav>
  );
};

const Dropdown = React.forwardRef(({ title, items, active, onClick, highlightItem, icon }, ref) => {
  return (
    <div className="relative" ref={ref}>
      <button className="text-white font-semibold cursor-pointer transition-transform duration-500 ease-in-out transform hover:text-orange-400 hover:scale-110 flex items-center" onClick={onClick}>
        {icon} {title}
      </button>
      {active && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
          {items.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={`flex items-center px-4 py-2 ${item.label === highlightItem ? 'hover:bg-orange-400 hover:text-white rounded-lg shadow-lg' : 'hover:text-orange-400'}`}
            >
              {item.label === "See All Destinations" && <MdLocationOn className="mr-2" />}
              {item.label === "See All Hotels" && <MdHotel className="mr-2" />}
              {item.label !== "See All Destinations" && item.label !== "See All Hotels" && icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
});

const FoodSpotsDropdown = React.forwardRef(({ title, items, active, onClick, highlightItem, icon }, ref) => {
  return (
    <div className="relative" ref={ref}>
      <button className="text-white font-semibold cursor-pointer transition-transform duration-500 ease-in-out transform hover:text-orange-400 hover:scale-110 flex items-center" onClick={onClick}>
        {icon} {title}
      </button>
      {active && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50 grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
          {items.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={`flex items-center justify-center px-4 py-2 text-center ${item.label === highlightItem ? 'hover:bg-orange-400 hover:text-white rounded-lg shadow-lg' : 'hover:text-orange-400'}`}
            >
              {item.label === "See All Food Spots" && <MdRestaurant className="mr-2" />}
              {item.label !== "See All Food Spots" && icon}
              {item.label}
            </NavLink>
          ))}
        </div>
      )}
    </div>
  );
});

export default Nav;
