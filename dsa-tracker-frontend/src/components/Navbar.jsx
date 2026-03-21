import { Link, useNavigate} from "react-router-dom";

function Navbar(){
    const navigate = useNavigate()

    const Logout=() =>{
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/login')
    }
    
    return (
        <nav className="flex items-center gap-6 px-6 py-4 border-b border-gray-200 bg-white shadow-sm">
            <span className="font-bold text-lg text-blue-600 mr-4">DSA Tracker</span>
            <Link to="/" className="text-gray-600 hover:text-blue-600">Problems</Link>
            <Link to="/userproblem" className="text-gray-600 hover:text-blue-600">My Problems</Link>
            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600">Dashboard</Link>
            <div className="ml-auto flex gap-3">
                <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
                <Link to="/register" className="text-gray-600 hover:text-blue-600">Register</Link>
                <button onClick={Logout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Logout</button>
            </div>


        </nav>
    );
}

export default Navbar;