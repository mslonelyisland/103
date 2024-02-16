import {Link,useParams} from "react-router-dom"
import React, {useState,useEffect} from 'react'
import axios from "axios";

function Users() {
    const {id} = useParams()
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get('https://localhost:3001')
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    },[])
    
    return (
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
            <div className="w-50 bg-white rounded p-3"> 
                <Link to = "/createuser" className="btn btn-success btn-sm">
                Add +
                </Link>
                   
                <table className="table">
                    <thead>
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
                        {
                            data.map((user,index) => {
                                return <tr key={index}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.age}</td>
                                    <td>{user.club.name}</td>
                                    <td>
                                    <Link to={'/edit/${user._id}'} className="btn btn-sm btn-success me-2">Update</Link>
                                    <button className="btn btn-sm btn-danger"></button>
                                    </td>
                                </tr>
                                    

                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Users;
