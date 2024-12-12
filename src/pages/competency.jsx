import React, { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import "./competencies.css";
import SidePushNav from "../components/SideNavbar/SideNavbar";

const Competency = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [curriculumLinks, setCurriculumLinks] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [selectedCompetencyId, setSelectedCompetencyId] = useState(null); // Track selected competency
  const { loading, error, post, get } = useFetch();

  const toggleNav = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    fetchCompetencies();
  }, []);

  const fetchCompetencies = async () => {
    const payload = {
      name: "",
      page: 1,
      size: 12,
      selectedCompetencyIds: [],
    };
    try {
      const res = await post(
        "https://qa-ms.revature.com/apigateway/nexa/competency/all",
        payload
      );
      setCompetencies(res.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const fetchCurriculum = async (id) => {
    try {
      const responseData = await get(
        `https://qa-ms.revature.com/apigateway/curriculum/secure/competency/${id}/curriculum`
      );
      console.log("Fetched Data:", responseData.data);
      setCurriculumLinks(responseData.data);
      setSelectedCompetencyId(id); // Track selected competency ID
      setIsVisible(true); // Open the nav
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  return (
    <div className="competency-container">
      <div className="card-container">
        {competencies.map((competency) => (
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
              <div
                className="viewIcon"
                onClick={() => fetchCurriculum(competency.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-view-stacked"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 0h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zm0 8h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Render SidePushNav independently */}
      {isVisible && (
        <SidePushNav
          links={curriculumLinks || []}
          isNavOpen={isVisible}
          toggleNav={toggleNav}
        />
      )}
    </div>
  );
};

export default Competency;
