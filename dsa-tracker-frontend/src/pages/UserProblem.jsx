import { useState, useEffect} from 'react';
import API from '../services/api';

function UserProblem(){
    const [userproblem, setUserProblem] = useState([]);
    const [problems, setProblems] = useState([]);
    const[filters, setfilters] = useState({
        status:'',
        difficulty:'',
    });
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        problem_id:'',
        status:'IN_PROGRESS'
    });

    useEffect(() =>{
        API.get('/api/problems')
        .then(res =>{
            setProblems(res.data.results);
            console.log(res.data.results);
        })

        API.get('/api/users-problems/')
        .then(res =>{
            setUserProblem(res.data.results);
            console.log(res.data.results)
            setLoading(false);
        })

        API.get('/api/users-problems/', {params: filters})
        .then(res=>{
            setUserProblem(res.data.results);
            setLoading(false);
        });

    },[filters]) //whenever filters change, useeffect will run

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]:e.target.value});
    };
    const handleSubmit =() =>{
        API.post('api/users-problems/', formData)
        .then(res =>{
            setUserProblem([...userproblem, res.data]);
            setFormData({problem_id:'', status:'IN_PROGRESS'});
        });
    };

    const handleDelete = (id) =>{
        API.delete(`/api/users-problems/${id}/`)
        .then(() =>{
            setUserProblem(userproblem.filter(p => p.id!==id))
        });
    };

    const handleUpdate = (id, newStatus) =>{
        API.patch(`/api/users-problems/${id}/`, {status: newStatus})
        .then(res =>{
            setUserProblem(userproblem.map(p =>p.id===id?{...p, status:newStatus} : p))
        });

    };

    const handleFilterChange = (e) =>{
        setfilters({...filters, [e.target.name]: e.target.value});
    }

    if (loading){
        return <h2 style={{padding:'24px'}}>Loading user-problems...</h2>;

    }
    return(
        <div className='p-6 max-w-2xl mx-auto'>
            <h1 className="text-2xl font-bold text-violet-900 mb-6">Your Problems</h1>

            <select
                name = "status"
                onChange={handleFilterChange}
                className='border border-gray-300 rounded p-2 w-full mb-3'
                >
                <option value="">--All Status--</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="SOLVED">Solved</option>

                </select>
                <select
                name = "difficulty"
                onChange={handleFilterChange}
                className='border border-gray-300 rounded p-2 w-full mb-3'
                >
                <option value="">--All Difficulty--</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value = "HARD">Hard</option>

                </select>

            <div className='border border-gray-300 p-4 rounded-lg mb-3'>
            <select
                name="problem_id"       //name and formData key must be same for handlechange to work
                value={formData.problem_id}
                onChange={handleChange}
                className='border border-gray-300 rounded p-2 w-full mb-3'
                >
                <option value="">-- Select Problem --</option>
                {problems.map(p => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                ))}
            </select>

            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className='border border-gray-300 rounded p-2 w-full mb-3'
                >
                <option value="IN_PROGRESS">In Progress</option>
                <option value="SOLVED">Solved</option>
            </select>

            <button onClick={handleSubmit} className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'>
                Add Problem
            </button>
            </div>


            {userproblem.map(p => (
            <div key={p.id} className="border border-gray-300 p-2 mb-3 rounded-lg">
            <h4>{p.problem.title}</h4>
            <p>Difficulty: {p.problem.difficulty}</p>
            <select
                value = {p.status}
                onChange={(e) => handleUpdate(p.id, e.target.value)}
                className='border border-gray-300 rounded'
                >
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="SOLVED">Solved</option>
                </select>
            <button onClick={() => handleDelete(p.id)} className='bg-red-500 text-white px-2 py-0.5 rounded hover:bg-red-600'>Delete</button>
            </div>
        ))}
    </div>

    );
}
export default UserProblem;