import React from "react";
import './style.css';

const Loader = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p className="loading-text">Loading, Please wait...</p>
    </div>
  );
};

export default Loader;
