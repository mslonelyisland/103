import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; // Import the navbar component

const HomePage = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/clubs')
            .then(response => {
                console.log(response.data);
                setClubs(response.data);
            })
            .catch(error => {
                console.error('Axios Error:', error);
            });
    }, []);

    return (
        <div>
            <Navbar /> {/* Include the navbar component */}
            <div className="container-fluid">
                <div className="container mt-3 m-5">
                    <Link to="/createclub" className="btn btn-outline-dark">Add Club</Link>
                    <div className="row row-cols-1 row-cols-md-3 g-4 mt-3">
                        {clubs.map(club => (
                            <div key={club._id} className="col">
                                <div className="card h-100" style={{ backgroundColor: '#f8f9fa' }}>
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title">{club.clubName}</h5>
                                        <p className="card-text">{club.description}</p>
                                        <p className="card-text">Number of Members: {club.numberOfMembers}</p>
                                        <Link to={`/clubs/${club._id}`} className="btn btn-outline-dark mt-auto">View Members</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
