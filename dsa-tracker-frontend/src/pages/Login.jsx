import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Login(){
    const [formData, setFormData] = useState({
        username: '',
        password:'',
    });

    const navigate = useNavigate(); //this will redirect on login click

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value});
    };

    const handleSubmit = () =>{
        axios.post('http://localhost:8000/api/users/login/', formData)
        .then (res => {
            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
            console.log('Tokens saved!');
            navigate('/')
        })
    };

    return(
    <div className="min-h-[50vh] flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Login</h1>


      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
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
        Login
      </button>
    </div>
    </div>
    );
}

export default Login;