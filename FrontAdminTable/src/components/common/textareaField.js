import React from "react";

const TextareaInput = ({ name, label, error, ...rest }) => {
  return (
    <div className="col form-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        {...rest}
        id={name}
        name={name}
        className="form-control"
      ></textarea>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default TextareaInput;
