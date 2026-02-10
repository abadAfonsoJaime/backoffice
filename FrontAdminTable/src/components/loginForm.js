import React from "react";
import ReactForm from "./common/reactForm";
import { login } from "../services/authService";

class LoginForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "",
        password: ""
      },
      errorMessages: {
        username: "",
        password: ""
      }
    };
  }

  //customValidation = ({ name, value }) => {};
  customValidation = () => null;

  doSubmit = async () => {
    try {
      //console.log("Try submit");
      await login(this.state.formData);
      window.location = "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        let errorMessages = this.state.errorMessages;
        errorMessages["username"] = ex.response.data;
        errorMessages["password"] = ex.response.data;
        this.setState({ errorMessages });
      }
    }
  };
  render() {
    const { errorMessages } = this.state;
    return (
      <div className="wrapper">
        <div className="my-sm-4">
          <h1 className="text-center" style={{ fontWeight: "bold" }}>
            Iniciar sesión
          </h1>
        </div>
        <div className="form-wrapper">
          <form onSubmit={this.handleSubmit} noValidate>
            <div className="form-group">
              <label htmlFor="username">Nombre de Usuario</label>
              <input
                className={
                  errorMessages.username ? "error form-control" : "form-control"
                }
                type="text"
                placeholder="Usuario"
                name="username"
                noValidate
                onChange={this.handleChange}
              />
              {errorMessages.username && (
                <div className="errorMessage">
                  <span>{errorMessages.username}</span>
                </div>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                className={
                  errorMessages.password ? "error form-control" : "form-control"
                }
                type="password"
                placeholder="Contraseña"
                name="password"
                noValidate
                onChange={this.handleChange}
              />
              {errorMessages.password && (
                <div className="errorMessage">
                  <span>{errorMessages.password}</span>
                </div>
              )}
            </div>

            <div className="row justify-content-center">
              <button
                //disabled={this.validate()}
                className="submitButton btn-lg"
              >
                Acceder
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginForm;
