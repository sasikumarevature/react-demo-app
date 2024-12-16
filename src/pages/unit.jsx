import React, { useEffect } from 'react'
import useFetch from '../hooks/useFetch'
import './card.css'; 
import { Link } from 'react-router-dom';

const Unit = () => {
  const { data, loading, error, post } = useFetch();

useEffect(()=>{
  const data ={
    name:"",
    page:2,
    selectedCompetencyIds:[],
    size:12
  }
  const fetchData = async () => {
    try {
      await post('/unit/filter?isTemplatesRequired=false',data);
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
  <h1 className='text-3xl'>Units</h1>
  <Link to="/unit/create"><button className="bg-blue-500 w-24 text-white rounded-2xl py-1 px-2 text-base hover:scale-105">
          Create Unit
        </button></Link>
 </div>
  <div className="card-container">
    {data?.data?.map((unit) => (
      <div key={unit.id} className="card hover:scale-105">
        <div className="card-header">
          <h2>{unit.name}</h2>
          <span className="duration-badge">{unit.duration} day(s)</span>
        </div>
        <div className="card-body">
          <div className="tags">
            {unit.unitTags?.map((tag) => (
              <span key={tag.id} className="tag">
                {tag.name}
              </span>
            ))}
          </div>
         
          <Link to={`/unit/view/${unit.id}`}> <button className="view-button">view</button></Link>
        </div>
      </div>
    ))}
  </div>
  </>
);
};

export default Unit
