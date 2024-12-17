import React, { useEffect } from "react";
import useFetch from "../hooks/useFetch";
import "./card.css";
import { Link } from "react-router-dom";
import Card from "../components/card";
import Loader from "../components/loader";
import CustomButton from "../components/button";

const Unit = () => {
  const { data, loading, error, post } = useFetch();

  useEffect(() => {
    const data = {
      name: "",
      page: 2,
      selectedCompetencyIds: [],
      size: 12,
    };
    const fetchData = async () => {
      try {
        await post("/unit/filter?isTemplatesRequired=false", data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  // if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full flex justify-between py-3 px-4">
            <h1 className="text-2xl font-bold">Units</h1>

            <CustomButton
              title={`Create Unit`}
              width={`w-40`}
              redirectURL={`/unit/create`}
            />
          </div>
          <div className="card-container px-3 pb-3">
            {data?.data.map((unit) => (
              <Card
                key={unit.id}
                title={unit.name}
                badge={`${unit.duration} day(s)`}
                tags={unit.unitTags}
                link={`/unit/view/${unit.id}`}
                linkText="View"
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default Unit;
