import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateCompetency = () => {
  const [formData, setFormData] = useState({
    competencyName: '',
    competencyType: 'Foundation',
    competencyDuration: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
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
                  <option value="Expert">Expert</option>
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
            </div>
          </div>
        </div>
        <button
          type="submit"
          style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCompetency;

