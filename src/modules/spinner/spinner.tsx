import React from "react";

const Spinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner-border text-primary" role="status">
        <div className="honeycomb">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
