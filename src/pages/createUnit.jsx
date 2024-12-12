import React, { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./createUnit.css";

const CreateUnit = () => {
    const navigate = useNavigate();
const [groupOptions, setGroupOptions] = useState([]); // State for storing group options
  useEffect(() => {
    const fetchCompetencyTypes = async () => {
      try {
        const response = await get('/group'); // Fetching group data
        setGroupOptions(response.data); // Updating state with fetched data
      } catch (err) {
        console.error('Error fetching competency types:', err);
      }
    };
    fetchCompetencyTypes();
  }, []); 
  const [unitName, setUnitName] = useState("");
  const [groupName, setGroupName] = useState({});
  const [unitDuration, setUnitDuration] = useState("");
  const [modules, setModules] = useState([""]);
  const [topics, setTopics] = useState([""]);
  const [errors, setErrors] = useState({});
  const { loading, error, post, get } = useFetch();

  const validateForm = () => {
    const newErrors = {};

    // Validate required fields
    if (!unitName.trim()) newErrors.unitName = "Unit name is required.";
    if (!groupName && !groupName.trim()) newErrors.groupName = "Group name is required.";
    if (!unitDuration) newErrors.unitDuration = "Unit duration is required.";

    // Validate modules and topics
    if (modules.some((module) => !module.trim())) {
      newErrors.modules = "All module names are required.";
    }
    if (topics.some((topic) => !topic.trim())) {
      newErrors.topics = "All topic names are required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleCreateUnit = async (e) => {
    e.preventDefault();

    // Validate before submission
    if (!validateForm()) {
      return;
    }

    const moduleTopics = [];
    for (let i = 0; i < topics.length; i++) {
      const topic = topics[i];
      const unit = [
        {
          topicName: topic,
          displayOrder: 1,
        },
      ];
      moduleTopics.push(unit);
    }

    const unitModules = [];
    for (let i = 0; i < modules.length; i++) {
      const module = modules[i];
      const unit = {
        moduleName: module,
        displayOrder: 1,
        isDragAndDropped: false,
        isModuleNameEmpty: false,
        unitModuleTopics: moduleTopics[i] || [],
      };
      unitModules.push(unit);
    }

    const payload = {
      name: unitName,
      duration: unitDuration,
      unitModules: unitModules,
      deletedUnitModuleIds: [],
      deletedUnitModuleTopicIds: [],
      isDeleted: false,
      isFromCompetencyView: false,
      isSelected: false,
      isUnitHasDependency: false,
      isUnitHasDependencyWithCompetency: false,
      unMappedUnitTagIds: [],
      unitTags:[groupName]
    };

    try {
      const res = await post("https://qa-ms.revature.com/apigateway/nexa/unit", payload);
      navigate('/unit/view/'+res.data.id)
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const handleModuleChange = (index, value) => {
    const newModules = [...modules];
    newModules[index] = value;
    setModules(newModules);
    if (errors.modules) setErrors((prev) => ({ ...prev, modules: null }));
  };

  const handleTopicChange = (index, value) => {
    const newTopics = [...topics];
    newTopics[index] = value;
    setTopics(newTopics);
    if (errors.topics) setErrors((prev) => ({ ...prev, topics: null }));
  };

  return (
    <div className="create-unit-container">
      <Link to="/unit">
        <button className="bg-blue-500 w-24 text-white rounded-2xl py-1 px-2 text-base hover:scale-105">
          ← Back
        </button>
      </Link>
      <h1>Create a Unit</h1>
      <form onSubmit={handleCreateUnit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter Unit name"
            value={unitName}
            onChange={(e) => {
              setUnitName(e.target.value);
              if (errors.unitName) setErrors((prev) => ({ ...prev, unitName: null }));
            }}
          />
          {errors.unitName && <p className="error">{errors.unitName}</p>}
        </div>
        <div className="form-group"><label>Group Name:</label>
<select
  value={groupName.id || ""}  // Set the value to the `id` of the selected object
  onChange={(e) => {
    const selectedGroup = groupOptions.find(option => option.id === Number(e.target.value));  // Find the entire object based on the selected id
    setGroupName(selectedGroup || {});  // Update state with the entire object
    if (errors.groupName) setErrors((prev) => ({ ...prev, groupName: null }));
  }}
>
  <option value="" disabled>Select or Enter group name</option>
  {groupOptions.map((option) => (
    <option key={option.id} value={option.id}> {/* Set the `id` as the value */}
      {option.name} {/* Display the `name` */}
    </option>
  ))}
</select>

{errors.groupName && <p className="error">{errors.groupName}</p>}
</div>

        <div className="form-group">
          <label>Unit Duration (in days):</label>
          <input
            type="number"
            min="1"
            placeholder="0"
            value={unitDuration}
            onChange={(e) => {
              setUnitDuration(e.target.value);
              if (errors.unitDuration) setErrors((prev) => ({ ...prev, unitDuration: null }));
            }}
          />
          {errors.unitDuration && <p className="error">{errors.unitDuration}</p>}
        </div>

        <div className="modules-topics">
          <div className="modules">
            <h3>Add Modules</h3>
            {modules.map((module, index) => (
              <input
                key={index}
                type="text"
                placeholder="Enter the module name"
                value={module}
                onChange={(e) => handleModuleChange(index, e.target.value)}
              />
            ))}
            <button type="button" onClick={() => setModules([...modules, ""])}>+ Add Module</button>
            {errors.modules && <p className="error">{errors.modules}</p>}
          </div>
          <div className="topics">
            <h3>Add Topics</h3>
            {topics.map((topic, index) => (
              <input
                key={index}
                type="text"
                placeholder="Enter the topic name"
                value={topic}
                onChange={(e) => handleTopicChange(index, e.target.value)}
              />
            ))}
            <button type="button" onClick={() => setTopics([...topics, ""])}>+ Add Topic</button>
            {errors.topics && <p className="error">{errors.topics}</p>}
          </div>
        </div>
        <button
          className="bg-blue-500 w-24 text-white rounded-2xl py-1 px-2 text-base hover:scale-105"
          type="submit"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateUnit;
