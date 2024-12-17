import React from "react";
import { Link } from "react-router-dom";

const CustomButton = ({ title, width, redirectURL }) => {
  return (
    <>
      <Link to={redirectURL}>
        <button
          className={`${width} bg-blue-500 text-white rounded-md text-sm p-2 hover:scale-105 hover:bg-blue-600`}
        >
          {title}
        </button>
      </Link>
    </>
  );
};

export default CustomButton;
