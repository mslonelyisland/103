import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar"; // Import the navbar component

function Users() {
  // eslint-disable-next-line no-unused-vars
  const { id: _ } = useParams();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/")
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.error("Axios Error:", error);
      });
  }, []);

  // to delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:3001/deleteuser/${id}`)
      .then((res) => {
        console.log(res);
        navigate("/users");
      })
      .catch((err) => console.log(err));
  };
  // Search button
  const filteredUsers = data.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Navbar /> {/* Include the navbar component */}
      <div className="container mt-3">
        <div className="row"> {/* Added row div */}
          <div className="col"> {/* Added col div */}
            <Link to="/createuser" className="btn btn-outline-primary mb-2">
              Add User
            </Link>
          </div>
          <div className="col"> {/* Added col div */}
            {/* Search input by name only */}
            <input
              type="text"
              placeholder="Search by name"
              className="form-control mb-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        {/* User table */}
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Club</th>
              <th>Position</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.age}</td>
                  <td>{user.club}</td>
                  <td>{user.position}</td>
                  <td>
                    <Link
                      to={`/edit/${user._id}`}
                      className="btn btn-outline-primary mx-2"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="btn btn-outline-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
