import React, { useEffect, useState } from "react";
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
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error?.message}</p>;
  return (
    <>
      <div className="w-full flex justify-end p-3">
        <Link to="/create-competency">
          <button className="bg-blue-500 w-44 text-white rounded-2xl py-1 px-2 text-base hover:scale-105 hover:bg-blue-600">
            Create Competency
          </button>
        </Link>
      </div>
      <div className="card-container px-3">
        {data?.data.map((competency) => (
            <div key={competency.id} className="card">
              <div className="card-header">
                <h2>{competency.name}</h2>
                <span className="duration-badge">
                  {competency.noOfWeeks} week(s)
                </span>
              </div>
              <div className="card-body">
                <p>
                  <strong>Type:</strong> {competency.competencyType?.name} (
                  {competency.competencyType?.description})
                </p>
                <p
                  style={{
                    color: competency.isDeleted ? "#f44336" : "#4CAF50",
                  }}
                >
                  <strong>Status:</strong>{" "}
                  {competency.isDeleted ? "Deleted" : "Active"}
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
};

export default Competency;
