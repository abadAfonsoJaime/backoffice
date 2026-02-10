import React from "react";

const InputText = ({ name, label, error, ...rest }) => {
  return (
    <div className="col form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default InputText;
