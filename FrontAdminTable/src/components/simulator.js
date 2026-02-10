import React from "react";

const Simulator = ({ title, description, buttonText, display }) => {
  return display ? (
    <div className="image phone">
      <div className="inner">
        <div className="altura">
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
        </div>
      </div>
    </div>
  ) : (
    <p> display = false</p>
  );
};

export default Simulator;
