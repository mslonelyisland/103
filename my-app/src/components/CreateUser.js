import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'; // Import the navbar component

function CreateUser(){
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const [club, setClub] = useState();
    const [position, setPosition] = useState();
 
    const navigate = useNavigate();
 
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/createuser', {name, email, age, club, position})
        .then(res => {
            console.log(res);
            navigate('/');
        })
        .catch(err => console.log(err));
    };

    return(
        <div>
            <Navbar /> {/* Include the navbar component */}
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
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Email</label>
                            <input
                                type="email"
                                placeholder="Enter Email"
                                className="form-control"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Age</label>
                            <input
                                type="text"
                                placeholder="Enter Age"
                                className="form-control"
                                onChange={(e) => setAge(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Club</label>
                            <input
                                type="text"
                                placeholder="Enter Club"
                                className="form-control"
                                onChange={(e) => setClub(e.target.value)}
                            />
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
                        <button className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateUser;
