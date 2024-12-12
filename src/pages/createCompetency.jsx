import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

const CreateCompetency = () => {
  const { data, loading, error, get, post } = useFetch();
  const [formData, setFormData] = useState({
    competencyName: '',
    competencyType: 'Foundation',
    competencyDuration: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const [units, setUnits] = useState([]);


  useEffect(() => {
    const fetchCompetencyTypes = async () => {
      try {
        await get('/competency/types');
      } catch (err) {
        console.error('Error fetching competency types:', err);
      }
    };
 
    fetchCompetencyTypes();
    fetchUnits();
  }, []);

  // Post request to fetch units
  const fetchUnits = async () => {
    const payload = {
      name: '',
      page: 1,
      size: 12,
      selectedCompetencyIds: [],
    };

    try {
      const response = await post('/unit/filter?isTemplatesRequired=true', payload);
      setUnits(response);
    } catch (err) {
      console.error('Error fetching units:', err);
    }
  };


const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.competencyName.trim()) {
      newErrors.competencyName = 'Please provide a name for competency';
    }
    if (!formData.competencyDuration.trim()) {
      newErrors.competencyDuration = 'Weeks is required.';
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    // Prepare API payload
    const payload = {
      isSelected: false,
      isDeleted: false,
      name: formData.competencyName,
      noOfWeeks: formData.competencyDuration,
      competencyTypeName: formData.competencyType,
      units: [
        {
          id: 188,
          name: 'nan',
          isDeleted: false,
          duration: 5,
          isSelected: true,
          displayOrder: 1,
        },
      ],
      competencyTypeId: formData.competencyType === 'Foundation' ? 1 : 2, // Example mapping
      competencyType: null,
    };
    try {
      const response = await post('/competency', payload); // POST request using useFetch
      console.log('API Response:', response);
      alert('Competency created successfully!');
      handleReset(); // Reset form on success
    } catch (err) {
      console.error('Error during API call:', err);
      alert('An error occurred. Please try again.');
    }
  };

  const handleReset = () => {
    setFormData({
      competencyName: '',
      competencyType: 'Foundation',
      competencyDuration: '',
      description: ''
    });
    setErrors({});
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to='/competency'>
        <button style={{ marginBottom: '20px', background: 'none', border: 'none', color: 'blue', cursor: 'pointer' }}>
          &lt; Back
        </button>
      </Link>
      <h1>Create a Competency</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ flex: '1' }}>
            <div style={{ marginBottom: '20px' }}>
              <label>
                Competency name:
                <input
                  type="text"
                  name="competencyName"
                  value={formData.competencyName}
                  onChange={handleInputChange}
                  placeholder="Type name"
                  style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </label>
              {errors.competencyName && <p style={{ color: 'red', marginTop: '5px' }}>{errors.competencyName}</p>}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>
                Competency type:
                <select
                  name="competencyType"
                  value={formData.competencyType}
                  onChange={handleInputChange}
                  style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                >
                  <option value="Foundation">Foundation</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>
                Description:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Type description"
                  maxLength="500"
                  style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px', resize: 'none' }}
                />
                <small style={{ display: 'block', textAlign: 'right' }}>{formData.description.length}/500</small>
              </label>
            </div>
          </div>

          <div style={{ flex: '0.5' }}>
            <div style={{ marginBottom: '20px' }}>
              <label>
                Competency duration:
                <input
                  type="number"
                  name="competencyDuration"
                  value={formData.competencyDuration}
                  onChange={handleInputChange}
                  placeholder="(in weeks)"
                  style={{ display: 'block', width: '100%', padding: '8px', marginTop: '5px' }}
                />
              </label>
              {errors.competencyDuration && <p style={{ color: 'red', marginTop: '5px' }}>{errors.competencyDuration}</p>}
            </div>
          </div>
        </div>
        <div>
          <button
            type="submit"
            style={{
              padding: '10px 20px',
              backgroundColor: isSubmitting ? '#6c757d' : '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginRight: '10px'
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Create'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCompetency;

