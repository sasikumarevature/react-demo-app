import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import "./competencies.css";
import Loader from "../components/loader";
import Card from "../components/card";
import CustomButton from "../components/button";
const Competency = () => {
  const { data, loading, error, post } = useFetch();

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

  if (error) return <p>Error: {error?.message}</p>;
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full flex justify-between py-3 px-4">
            <h1 className="text-2xl font-bold">All Competencies</h1>
            <CustomButton
              title="Create Competency"
              width={`w-40`}
              redirectURL={`/create-competency`}
            />
          </div>
          <div className="card-container px-3 pb-3">
            {data?.data.map((competency) => (
              <Card
                key={competency.id}
                title={competency.name}
                badge={`${competency.noOfWeeks} week(s)`}
                content={competency.competencyType?.name}
                link={`/view/${competency.id}`}
                linkText="View"
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Competency;
