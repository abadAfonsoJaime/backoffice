import React from "react";

const CardSimulator = ({ title, description, buttonText }) => {
  return (
    <div className="card">
      <div className="cardContainer">
        <p className="title">{title}</p>
        <p className="subtitle">{description}</p>
        <div className="buttonContainer">
          <div className="customButton">
            <div className="buttonText">
              <p>{buttonText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSimulator;
