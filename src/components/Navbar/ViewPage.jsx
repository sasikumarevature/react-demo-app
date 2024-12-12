import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ViewPage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const token = '7rL8RebbpebrWj1OwMowZwC2xR6f7J7J68tKw8DZbuzpt+Mgk7Bt0WBcKMVCIdsSOmgf4A30iqnkOFDF0KJkg3XZTTKitrvM77SHpbPVAd1uF5ynpgb22ON8zgbSCikWh2aXCBdONv1Eh4tUHpNOnqNkfF24f+bPkk44grt1qjhQI6NaOiQt3JwpKbR3gDoPs+g8TicLipK8479/2B6uczmlj1tMtWIkLGmOvWPlluImbwFGYVHa0XzgskvCXZ8b6khWkZgcTyCHGsIWayx4/Q0cy4q9GGXtWmf+t0de55OVtkF1klbDYhLl3tDNybmHnkHyuwxMmQngbHMHPhWTFF+D5sexHNq9jU/+MOfEzV9L8ht0NfQNY4m9MaNHO/DXgWtavpc7muYEoqCjN86O8UmoO7Sltw3j98Bj5dlF39LynOkc0PbQjheUtTADg9ynPQCO9WQNxQmaWWG3HIHqdAqS9QQzV90G0n2/Vth/7wCgvrYixhqVCGMf5ualBrknngwbIJbCh/P5g62kdqCVfNJEOpBDTuYyNAKNfFzeES+tzFPJ8MqYncVyXJ4Zn/trTFOZ6xQAnY0R5Cl67k/eNuSbNyVYS/hOpUoo2lzNzjWsoqnTtgoyHyZ4EBNfTP6OOBt0gKgRPfoZlnlOT4OzeCYwXdZH5C5lLAAuv0FT6oSVrz7mfNMZvLIYwq9sIo5s8O5dKRARdnLY5LZIJPxB3BZSSaA9qrzXIDVdO9EtwCM=';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          'Content-Type': 'application/json',
          'encryptedToken': `${token}`,
        };

        const response = await fetch('https://qa-ms.revature.com/apigateway/nexa/competency/169', {
          method: 'GET',
          headers: headers,
        });

        if (response.ok) {
          const result = await response.json();
          if (result && result.data) {
            setData(result.data);
          } else {
            setError('Data not found in the response.');
          }
        } else {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, [token]);

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between mb-4">
        <button className="btn btn-primary" onClick={handleBackClick}>Back</button>
        <div>
          <button className="btn btn-warning mr-2">Edit</button>
          <button className="btn btn-danger">Delete</button>
        </div>
      </div>

      {error && <p className="text-danger">Error: {error}</p>}

      {data ? (
        <div>
        
          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Competency Name:</strong>
            </div>
            <div className="col-md-8">
              <p>{data.name || 'N/A'}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Duration (Weeks):</strong>
            </div>
            <div className="col-md-8">
              <p>{data.noOfWeeks || 'N/A'} week(s)</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Competency Type:</strong>
            </div>
            <div className="col-md-8">
              <p>{data.competencyType?.name || 'N/A'}</p>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-4">
              <strong>Description:</strong>
            </div>
            <div className="col-md-8">
              <p>{data.description || 'N/A'}</p>
            </div>
          </div>

          <div className="mt-4">
            <div className="form-group">
              <label><strong>Units:</strong></label>
              <div className="row">
                {data.units && data.units.length > 0 ? (
                  data.units.map((unit) => (
                    <div key={unit.id} className="col-md-4 mb-2">
                      <button 
                        className="btn btn-lg btn-secondary shadow p-3 mb-5 rounded w-100"
                        style={{ 
                          backgroundColor: '#6c757d', 
                          borderColor: '#6c757d',
                          marginBottom: '10px' 
                        }}>
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
