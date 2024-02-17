import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link className="nav-link fw-bold text-white px-3" to="/">
              Homepage
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold text-white px-3" to="/">
              Clubs
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link fw-bold text-white px-3" to="/users">
              User Management
            </Link>
          </li>
        </ul>

        {/* Search form */}
        {/* <form className="d-flex">
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-light" type="submit">
            Search
          </button>
        </form> */}
      </div>
    </nav>
  );
};

export default Navbar;
