import React , {useEffect} from 'react'
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import './competencies.css'
const Competency = () => {
  const { data, loading, error, post } = useFetch();
 
  useEffect(()=>{
    const data ={
        "name": "",
        "page": 1,
        "size": 12,
        "selectedCompetencyIds": []
    }
    const fetchData = async () => {
      try {
        await post('https://qa-ms.revature.com/apigateway/nexa/competency/all',data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  },[]);
   
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
    <div className='header'>
    <h1 className='text-3xl  w-24'>Competencies</h1>
          <Link to="/create-competency"><button className="bg-blue-500 text-white rounded-2xl py-1 px-2 text-base hover:scale-105 hover:bg-green-600 float-right">
              Create Competency
            </button></Link>
            </div>
    <div className="card-container">
      {data?.data?.map((competency) => (
        <div key={competency.id} className="card">
          <div className="card-header">
            <h2>{competency.name}</h2>
            <span className="duration-badge">{competency.noOfWeeks} week(s)</span>
          </div>
          <div className="card-body">
            <p><strong>Type:</strong> {competency.competencyType?.name} ({competency.competencyType?.description})</p>
            <p style={{ color: competency.isDeleted ? '#f44336' : '#4CAF50' }}>
              <strong>Status:</strong> {competency.isDeleted ? 'Deleted' : 'Active'}
            </p>
            <Link to={`/view/${competency.id}`}>
  <button className="btn btn-primary">View</button>
</Link>
          </div>
        </div>
      ))}
    </div>
    </>
  );
}

export default Competency
