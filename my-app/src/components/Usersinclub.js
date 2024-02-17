import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar'; // Import the navbar component


const UsersInClub = () => {
    const { id } = useParams(); // Get the club ID from the URL parameters
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/clubs/${id}/users`) // Fetch users for the specific club
            .then(response => {
                console.log(response.data);
                setUsers(response.data);
            })
            .catch(error => {
                console.error('Axios Error:', error);
            });
    }, [id]); // Include clubId in the dependency array

    return (
        <div>
            <Navbar /> {/* Include the navbar component */}
            <div className="container mt-3">
            
            <h4>Members: </h4>
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
