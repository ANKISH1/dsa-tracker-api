import { useState,useEffect } from "react"
import API from "../services/api"

function Dashboard(){

    const [problems_attempted, setProblems_attempted] = useState({})
    
    useEffect(() =>{
        API.get('api/userstats/')
        .then(res =>{
            setProblems_attempted(res.data)
        })
    },[])

    return(
        <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Problems Attempted</h1>
        <p className="text-4xl font-bold text-blue-600">{problems_attempted.problems_attempted}</p>
        </div>
        </div>
    )
}

export default Dashboard;