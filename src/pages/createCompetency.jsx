import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UnitCard from '../components/UnitCard';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

const CreateCompetency = () => {
  const { get, post } = useFetch();
  const [formData, setFormData] = useState({
    competencyName: '',
    competencyType: 'Foundation',
    competencyDuration: '',
    description: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle loading state
  const [units, setUnits] = useState([]);
  const [selectedUnits, setSelectedUnits] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); 
  const navigate = useNavigate();

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

  const fetchUnits = async () => {
    const payload = {
      name: '',
      page: 1,
      size: 12,
      selectedCompetencyIds: [],
    };

    try {
      const response = await post(
        '/unit/filter?isTemplatesRequired=true',
        payload
      );
      setUnits(response.data || []);
    } catch (err) {
      console.error('Error fetching units:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
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
    const payload = {
      isSelected: false,
      isDeleted: false,
      name: formData.competencyName,
      noOfWeeks: formData.competencyDuration,
      competencyTypeName: formData.competencyType,
      units: selectedUnits.map((unitId, index) => {
        const unit = units.find((u) => u.id === unitId);
        return {
          id: unit.id,
          name: unit.name,
          isDeleted: false,
          duration: unit.duration,
          isSelected: true,
          displayOrder: index + 1,
        };
      }),
      competencyTypeId: formData.competencyType === 'Foundation' ? 1 : 2, 
      competencyType: null,
    };
    try {
      const response = await post('/competency', payload); 
      console.log('API Response:', response);
      alert('Competency created successfully!');
      navigate('/competency');
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
      description: '',
    });
    setErrors({});
    setSelectedUnits([]);
  };


const filteredUnits = Array.isArray(units)
  ? units.filter((unit) =>
      unit.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  : [];


  const handleSelect = (unitId) => {
    setSelectedUnits((prev) =>
      prev.includes(unitId)
        ? prev.filter((id) => id !== unitId)
        : [...prev, unitId]
    );
  };
 

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to='/competency'>
        <button
          style={{
            marginBottom: '20px',
            background: 'none',
            border: 'none',
            color: 'blue',
            cursor: 'pointer',
          }}
        >
          &lt; Back
        </button>
      </Link>
      <h1>Create a Competency</h1>
      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: '20px',
          }}
        >
          <div style={{ flex: '1' }}>
            <div style={{ marginBottom: '20px' }}>
              <label>
                Competency name:
                <input
                  type='text'
                  name='competencyName'
                  value={formData.competencyName}
                  onChange={handleInputChange}
                  placeholder='Type name'
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                  }}
                />
              </label>
              {errors.competencyName && (
                <p style={{ color: 'red', marginTop: '5px' }}>
                  {errors.competencyName}
                </p>
              )}
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>
                Competency type:
                <select
                  name='competencyType'
                  value={formData.competencyType}
                  onChange={handleInputChange}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                  }}
                >
                  <option value='Foundation'>Foundation</option>
                  <option value='Advanced'>Advanced</option>
                </select>
              </label>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label>
                Description:
                <textarea
                  name='description'
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder='Type description'
                  maxLength='500'
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                    resize: 'none',
                  }}
                />
                <small style={{ display: 'block', textAlign: 'right' }}>
                  {formData.description.length}/500
                </small>
              </label>
            </div>
          </div>

          <div style={{ flex: '0.5' }}>
            <div style={{ marginBottom: '20px' }}>
              <label>
                Competency duration:
                <input
                  type='number'
                  name='competencyDuration'
                  value={formData.competencyDuration}
                  onChange={handleInputChange}
                  placeholder='(in weeks)'
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '8px',
                    marginTop: '5px',
                  }}
                />
              </label>
              {errors.competencyDuration && (
                <p style={{ color: 'red', marginTop: '5px' }}>
                  {errors.competencyDuration}
                </p>
              )}
            </div>
          </div>
        </div>
        <div>
        </div>
        <Container>
          <h5>Add units</h5>
          <p className='text-muted'>Click to select and deselect</p>
          <Row className='mb-3 align-items-center'>
            <Col md={6}>
              <Form
                type='checkbox'
                label={`Show selected (${selectedUnits.length})`}
                onChange={(e) => {
                  if (e.target.checked) {
                    setSearchTerm(''); // Reset search term if checkbox is toggled
                  }
                }}
              />
            </Col>
            <Col md={4}>
              <InputGroup>
                <Form.Control
                  type='text'
                  placeholder='Search units...'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={2} className='text-end'>
              <Link to = "/unit/create"><Button variant='primary' className="bg-blue-500 text-white rounded-2xl py-1 px-2 text-base hover:scale-105 float-right">Create Unit</Button></Link>
            </Col>
          </Row>
          <Row>
            {filteredUnits.map((unit, index) => (
              <Col md={3} key={index} className='mb-4'>
                <Card
                  onClick={() => handleSelect(unit.id)}
                  className={`border ${
                    selectedUnits.includes(unit.id) ? 'border-primary' : ''
                  }`}
                >
                  <UnitCard
                    name={unit.name}
                    duration={unit.duration}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

        <br />
                  <button
            type='submit'
            style={{
              padding: '10px 20px',
              backgroundColor: isSubmitting ? '#6c757d' : '#007BFF',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginRight: '10px',
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Create'}
          </button>
          <button
            type='button'
            onClick={handleReset}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
      </form>
    </div>
  );
};

export default CreateCompetency;
