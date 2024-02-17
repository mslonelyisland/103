import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'; // Import the navbar component


const UsersInClub = () => {
    const { id } = useParams(); 
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); 

    useEffect(() => {
        axios.get(`http://localhost:3001/clubs/${id}/users`) // get users for the specific club they belong to
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Axios Error:', error);
            });
    }, [id]); 

    return (
        <div>
            <Navbar /> {/* for the the navbar component */}
            <div className="container mt-3">
            <h5>Club Members: </h5>
            <div className='row'>
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
                
            <table className="table table-striped">
                <thead className='thead-dark'>
                    <tr>
                        <th >Name</th>
                        <th>Email</th>
                        <th>Age</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody className="">
                    {users.map(user => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>{user.position}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
       
    );
}

export default UsersInClub;
