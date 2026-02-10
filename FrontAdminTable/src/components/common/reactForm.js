import React, { Component } from "react";
import InputField from "./inputField";
import TextareaField from "./textareaField";

class ReactForm extends Component {
  state = {
    formData: {},
    errorMessages: {}
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.isFormValid(this.state)) {
      // call the server and redirect the user
      this.doSubmit();
    } else {
      const entries = Object.entries(this.state.formData);
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE", entries);
      entries.forEach(item => {
        this.customValidation({ name: item[0], value: item[1] });
      });
    }
  };

  isFormValid = ({ errorMessages, formData }) => {
    let valid = true;

    Object.values(errorMessages).forEach(val => {
      !val &&
        Object.values(formData).forEach(val => {
          val.length === 0 && (valid = false);
        });
    });

    return valid;
  };

  handleChange = e => {
    const formData = { ...this.state.formData };
    formData[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ formData });
    this.customValidation(e.currentTarget);
  };

  renderInputField(name, label, type = "text") {
    const { formData, errorMessages } = this.state;
    return (
      <InputField
        type={type}
        name={name}
        label={label}
        value={formData[name]}
        error={errorMessages[name]}
        onChange={this.handleChange}
      />
    );
  }

  renderTextAreaField(name, label, rows = "5") {
    const { formData, errorMessages } = this.state;
    return (
      <TextareaField
        name={name}
        label={label}
        value={formData[name]}
        error={errorMessages[name]}
        rows={rows}
        onChange={this.handleChange}
      />
    );
  }
}

export default ReactForm;
