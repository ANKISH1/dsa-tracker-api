import { useEffect, useState } from "react";
import ProblemCard from "../Problemcard";
import API from "../services/api";

function Problems(){
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    API.get('api/problems/')
    .then(res =>{
      setProblems(res.data.results);
      setLoading(false);
    })
  }, [])
  if (loading){
    return <h2 style={{padding:'24px'}}>Loading problems...</h2>;

  }

  return(
    <div className="p-6 max-w-2xl mx-auto">
      <h1>DSA Tracker</h1>
      {problems.map(p=>(
        <ProblemCard
        key = {p.id}
        title = {p.title}
        difficulty={p.difficulty}
        />
      ))}
    </div>

  );
}

export default Problems;