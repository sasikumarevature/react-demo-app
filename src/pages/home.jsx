import React from "react";
import './home.css'
const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600">
      <div className="text-center">
        {/* Nexa SVG */}
        <svg
          viewBox="0 0 57 11"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="main-icon mx-auto mb-7 max-sm:w-[300px] md:w-[650px] xl:w-[1000px]"
        >
          <path
            d="M0.3125 11V0.5H1.67969L12.2275 9.37988H12.2412V0.5H13.5537V11H12.1865L1.63867 2.04492H1.625V11H0.3125ZM16.1855 11V0.5H26.4941V1.59375H17.498V5.09375H26.1182V6.1875H17.498V9.90625H26.6855V11H16.1855ZM27.5605 11L33.5283 5.46289L27.998 0.5H29.8574L34.4375 4.61523L38.874 0.5H40.7334L35.3877 5.46289L41.5605 11H39.7012L34.4717 6.31055L29.4199 11H27.5605ZM42.4355 11L48.5605 0.5H50.3105L56.4355 11H54.9043L53.5918 8.59375H45.2793L43.9668 11H42.4355ZM45.9355 7.5H52.9355L49.4355 1.375L45.9355 7.5Z"
          />
        </svg>
        <h1 className="text-white max-sm:text-2xl md:text-4xl font-bold mb-2">Welcome to Nexa</h1>
        <p className="text-white max-sm:text-md md:text-lg opacity-90">
          Experience a professional and engaging UI
        </p>
      </div>
    </div>
  );
};

export default Home;
