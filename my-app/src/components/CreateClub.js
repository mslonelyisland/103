import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from './Navbar'; // Import the navbar component

function CreateClub() {
    const [clubName, setClubName] = useState('');
    const [description, setDescription] = useState('');
    const [numberOfMembers, setNumberOfMembers] = useState(0);
 
    const navigate = useNavigate();
 
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/createclub', { clubName, description, numberOfMembers })
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
                        <h2>Add Club</h2>
                        <div className="mb-2">
                            <label htmlFor="">Club Name</label>
                            <input
                                type="text"
                                placeholder="Enter Club Name"
                                className="form-control"
                                value={clubName}
                                onChange={(e) => setClubName(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Description</label>
                            <input
                                type="text"
                                placeholder="Enter Description"
                                className="form-control"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="mb-2">
                            <label htmlFor="">Number of Members</label>
                            <input
                                type="number"
                                placeholder="Enter Number of Members"
                                className="form-control"
                                value={numberOfMembers}
                                onChange={(e) => setNumberOfMembers(parseInt(e.target.value))}
                            />
                        </div>
                        <button className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CreateClub;
