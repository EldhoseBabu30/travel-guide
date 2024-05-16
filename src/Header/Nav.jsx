import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Sanchari logo high light.png";
import "./Nav.css";

const Nav = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="flex items-center gap-2 text-white">
        <img
          src={logo}
          alt="Sanchari Logo"
          className="h-16 w-16 object-contain"
        />
      </Link>

      <div className="nav-links-container"> 
        <NavLink to="/destinations" className="nav-link" activeClassName="active">
          Destinations
        </NavLink>
        <NavLink to="/hotels" className="nav-link" activeClassName="active">
          Hotels
        </NavLink>
        <NavLink to="/food-spots" className="nav-link" activeClassName="active">
          Food Spots
        </NavLink>
        <NavLink to="/community" className="nav-link" activeClassName="active">
          Community
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
