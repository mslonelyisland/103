import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from './Navbar'; // Import the navbar component

function UpdateUser() {
    const { id } = useParams();
    
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [age, setAge] = useState();
    const [club, setClub] = useState();
    const [position, setPosition] = useState();
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3001/get/" + id);
                console.log("User Data:", response.data); // Log the entire user data object
                setName(response.data.name);
                setEmail(response.data.email);
                setAge(response.data.age);
                setPosition(response.data.position);
                setClub(response.data.club);
            } catch (err) {
                console.log(err);
            }
        };
        fetchData();
    }, [id]);
    
    const navigate = useNavigate();
    
    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/updateuser/' + id, {name, email, age, club, position})
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    
    return ( 
        <div>
             <Navbar /> 
             <div className="container-fluid">
           
           <div className="container d-flex justify-content-center align-items-center vh-110">
               <div className="w-50 bg-white rounded p-3">
                   <form onSubmit={handleUpdate}>
                       <h2>Update User</h2>
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
                               type="text"
                               placeholder="Enter Age"
                               className="form-control"
                               value={age}
                               onChange={(e) => setAge(e.target.value)}
                           />
                       </div>
                       <div className="mb-2">
                           <label htmlFor="">Club</label>
                           <input
                               type="text"
                               placeholder="Enter Club"
                               className="form-control"
                               value={club}
                               onChange={(e) => setClub(e.target.value)}
                           />
                       </div>
                       <div className="mb-2">
                           <label htmlFor="">Position</label>
                           <input
                               type="text"
                               placeholder="Enter Position"
                               className="form-control"
                               value={position}
                               onChange={(e) => setPosition(e.target.value)}
                           />
                       </div>
                       <button className="btn btn-success">Update</button>
                   </form>
               </div>
           </div>
       </div></div>
       
    );
}

export default UpdateUser;
