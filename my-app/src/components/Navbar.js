import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link text-white px-3" to="/">
              Homepage
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white px-3 clubs" to="/">
              Clubs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-white px-3 users" to="/users">
              User Management
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
