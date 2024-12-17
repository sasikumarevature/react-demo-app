import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./competencies.css";
const Competency = () => {
  const { data,loading, error, post } = useFetch();
  
  const payload = {
    name: "",
    page: 1,
    size: 12,
    selectedCompetencyIds: [],
  };
  const fetchData = async () => {
    try {
      await post("/competency/all", payload);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };
  useEffect(() => {
  fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message}</p>;
  return (
    <>
      <div className="w-full flex justify-end p-3">
        <Link to="/create-competency">
          <button className="bg-blue-800 w-40 text-white rounded-md text-sm p-2 hover:scale-105 hover:bg-blue-600">
            Create Competency
          </button>
        </Link>
      </div>
      <div className="card-container px-3">
        {data?.data.map((competency) => (
            <div key={competency.id} className="card">
              <div className="card-header bg-transparent px-1 border-0 py-1 mb-0">
                <h2>{competency.name}</h2>
                <span className="duration-badge bg-blue-800 px-2 py-[0.1rem]">
                  {competency.noOfWeeks} week(s)
                </span>
              </div>
              <div className="card-body px-1">
                <p className="border w-fit px-1 rounded-md bg-slate-200 text-xs ">{competency.competencyType?.name}
                </p>
                <Link to={`/view/${competency.id}`}>
                  <button className="px-3 border-2 border-blue-800 rounded-md text-xs font-semibold py-1 my-2 mb-0 bg-transparent text-blue-800">View</button>
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Competency;
