import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const UnitPage = () => {

  const [unitData, setUnitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { get } = useFetch();
  const { unitId } = useParams();

  useEffect(() => {
    const fetchUnitData = async () => {
      try {
        const response = await get(`https://qa-ms.revature.com/apigateway/nexa/unit/${unitId}`);
        if (response && response.data) {
          setUnitData(response.data);
        }
      } catch (err) {
        setError("Error fetching unit data");
      } finally {
        setLoading(false);
      }
    };
    fetchUnitData();
  }, [unitId]);
  const handleGoBack = () => {
    navigate(-1);
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="container mx-auto p-5">
      <div className="mb-4 d-flex justify-content-between">
        <Button onClick={handleGoBack} className="text-blue-500">Back</Button>
        <div className="d-flex gap-2">
          <Button variant="secondary">Delete</Button>
          <Button variant="primary">Edit</Button>
        </div>
      </div>
      {/* Unit Information */}
      <div className="row mb-4">
        {/* Unit Name */}
        <div className="col-md-6 d-flex mb-3">
          <div className="font-semibold text-xl w-25">Unit name:</div>
          <div className="w-75">
            <h1 className="text-xl font-semibold">
              {unitData?.name || <span className="text-gray-500 font-italic">No data available</span>}
            </h1>
          </div>
        </div>
        {/* Duration Button */}
        <div className="col-md-6 d-flex mb-3">
          <div className="font-semibold text-xl w-25">Duration:</div>
          <div className="w-75">
            {unitData?.duration ? (
              <Button variant="primary" className="bg-blue-500 text-white px-3 py-1">
                {unitData.duration} day(s)
              </Button>
            ) : (
              <span className="text-gray-500 font-italic">No data available</span>
            )}
          </div>
        </div>
        {/* Group Name */}
        <div className="col-md-6 d-flex mb-3">
          <div className="font-semibold text-xl w-25">Group name:</div>
          <div className="w-75 text-xl">
            {unitData?.unitTags?.length > 0 ? (
              unitData.unitTags.map((tag) => (
                <span
                  key={tag.id}
                  className={`badge ${tag.name === "Without url" ? "bg-secondary" : "bg-info"} ml-2`}
                >
                  {tag.name}
                </span>
              ))
            ) : (
              <span className="text-gray-500 font-italic">No data available</span>
            )}
          </div>
        </div>
        {/* Content URL */}
        <div className="col-md-6 d-flex mb-3">
          <div className="font-semibold text-xl w-25">Content URL:</div>
          <div className="w-75">
            <div className="text-gray-500 text-xl">
              {unitData?.unitTags?.length > 0 ? 'Available' : 'Not available'}
            </div>
          </div>
        </div>
      </div>
      <hr className="my-4" />
      {/* Module and Topics */}
      <div className="text-xl font-semibold mb-3">
        {unitData?.name || <span className="text-gray-500 font-italic">No data available</span>}
      </div>
      <div className="card shadow-lg bg-gradient mb-4">
        <div className="card-body">
          <div className="d-flex">
            {/* Modules Column */}
            <div className="w-1/2 text-xl">
              <h6 className="text-blue-500">Modules</h6>
              {unitData?.unitModules?.length > 0 ? (
                <ul className="list-unstyled">
                  {unitData.unitModules.map((module) => (
                    <li key={module.id} className="py-1">{module.moduleName}</li>
                  ))}
                </ul>
              ) : (
                <span className="text-gray-500 font-italic">No data available</span>
              )}
            </div>
            {/* Topics Column */}
            <div className="w-1/2 text-xl">
              <h6 className="text-blue-500">Topics</h6>
              {unitData?.unitModules?.length > 0 ? (
                <ul className="list-unstyled">
                  {unitData.unitModules.flatMap((module) =>
                    module.unitModuleTopics.map((topic) => (
                      <li key={topic.id} className="py-1">{topic.topicName}</li>
                    ))
                  )}
                </ul>
              ) : (
                <span className="text-gray-500 font-italic">No data available</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UnitPage;