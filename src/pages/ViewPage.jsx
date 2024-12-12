import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useParams } from 'react-router-dom';

const ViewPage = () => {
  const { id } = useParams();
  const { data, error, get } = useFetch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await get(`/competency/${id}`);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const handleBackClick = () => {
    navigate('/competency');
  };

  const renderErrorMessage = (err) => {
    if (err && err.message) {
      return err.message; // Display just the error message
    } else if (err && err.response && err.response.data) {
      return err.response.data.message || 'An error occurred';
    }
    return 'An unknown error occurred';
  };

  // Check if the data object is available and if it's structured correctly
  const competencyData = data ? data.data : null;

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-primary" onClick={handleBackClick}>Back</button>
        <div>
          <button className="btn btn-warning mr-2">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>

      {/* Check if there is an error */}
      {error && (
        <div className="text-danger">
          <p>Error occurred:</p>
          <pre>{renderErrorMessage(error)}</pre>
        </div>
      )}

      {/* Check if competency data is available */}
      {competencyData ? (
        <div>
          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Competency Name:</strong>
            </div>
            <div className="col-md-8">
              <p>{competencyData.name || 'N/A'}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Duration (Weeks):</strong>
            </div>
            <div className="col-md-8">
              <p>{competencyData.noOfWeeks || 'N/A'} week(s)</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Competency Type:</strong>
            </div>
            <div className="col-md-8">
              <p>{competencyData.competencyType?.name || 'N/A'}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Description:</strong>
            </div>
            <div className="col-md-8">
              <p>{competencyData.description || 'N/A'}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="form-group">
              <label><strong>Units:</strong></label>
              <div className="row">
                {competencyData.units && competencyData.units.length > 0 ? (
                  competencyData.units.map((unit) => (
                    <div key={unit.id} className="col-md-4 mb-2">
                      <button 
                        className="btn btn-lg btn-secondary shadow p-3 mb-5 rounded w-100"
                        style={{ 
                          backgroundColor: 'white', // White background
    color: 'black', // Black text color
    marginBottom: '10px', // Margin at the bottom
    border: '1px solid #ddd', // Light border to give the box effect
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 2px 10px rgba(0, 0, 0, 0.1)', // Soft box shadow for depth
    borderRadius: '8px', // Rounded corners for the "box"
    padding: '15px', 
                        }}
                      >
                        {unit.name}
                      </button>
                    </div>
                  ))
                ) : (
                  <p>No units available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ViewPage;
