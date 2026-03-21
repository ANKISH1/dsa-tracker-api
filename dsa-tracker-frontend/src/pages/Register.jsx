import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register(){
    const [formData, setFormData] = useState({
        username:'',
        email:'',
        password:'',
    });

    const navigate = useNavigate();

    const handleChange = (e)=>{
    setFormData({...formData, [e.target.name]:e.target.value});

    };

    const handleSubmit=() =>{
        axios.post('http://localhost:8000/api/users/register/',formData)
        .then(res=>{
            console.log('User Registered')
            navigate('/login')
        })
    };


    return(
    <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Register</h1>

        <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
        />

      <input
        type="text"
        name="email"
        placeholder="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-500"
        />
      <button onClick={handleSubmit} 
      className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Register
        </button>

      </div>
      </div>
    );

}

export default Register;