import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'; 
function CreateUser() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState(0);
    const [selectedClub, setSelectedClub] = useState('');
    const [clubs, setClubs] = useState([]);
    const [position, setPosition] = useState([]);
 
    const navigate = useNavigate();
 
    useEffect(() => {
        axios.get('http://localhost:3001/clubs')
            .then(response => {
                setClubs(response.data);
            })
            .catch(err => console.log(err));
    }, []);
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const selectedClubId = clubs.find(club => club.clubName === selectedClub)?._id;
        axios.post('http://localhost:3001/createuser', { name, email, age, club: selectedClubId, position })
            .then(res => {
                console.log(res);
                navigate('/users');
            })
            .catch(err => console.log(err));
    };

    return (
        <div>
            <Navbar /> 
            <div className="container-fluid d-flex justify-content-center align-items-center vh-110">
                <div className="w-50 bg-white rounded p-3">
                    <form onSubmit={handleSubmit}>
                        <h2>Add User</h2>
                        <div className="mb-2">
                            <label htmlFor="">Name</label>
                            <input
                                type="text"
                                placeholder="Enter Name"
                                className="form-control"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Age</label>
                            <input
                                type="number"
                                placeholder="Enter Age"
                                className="form-control"
                                value={age}
                                onChange={(e) => setAge(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Club</label>
                            <select
                                className="form-control"
                                value={selectedClub}
                                onChange={(e) => setSelectedClub(e.target.value)}
                            >
                                <option value="">Select Club</option>
                                {clubs.map(club => (
                                    <option key={club._id} value={club.clubName}>{club.clubName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Position</label>
                            <input
                                type="text"
                                placeholder="Enter Position"
                                className="form-control"
                                onChange={(e) => setPosition(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-outline-dark">Create User</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
