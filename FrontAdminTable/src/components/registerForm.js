import React from "react";
import ReactForm from "./common/reactForm";
import { toast } from "react-toastify";
import { register } from "../services/userService";
import { storeJwt } from "../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCog, faUserTimes } from "@fortawesome/free-solid-svg-icons";

class RegisterForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        username: "",
        email: "",
        password: "",
        isAdmin: true
      },
      errorMessages: {
        username: "",
        email: "",
        password: "",
        isAdmin: ""
      }
    };
  }

  customValidation = ({ name, value }) => {
    let errorMessages = this.state.errorMessages;
    const emailRegex = RegExp(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
    switch (name) {
      case "username":
        errorMessages.username =
          value.trim().length === 0
            ? "El nombre de usuario es obligatorio."
            : "";
        break;
      case "email":
        errorMessages.email =
          emailRegex.test(value) && value.trim().length > 0
            ? ""
            : "Introudzca un correo electrónico válido.";
        break;
      case "password":
        errorMessages.password =
          value.length < 6
            ? "La contraseña debe tener al menos 6 caracteres"
            : "";
        break;
      default:
        break;
    }

    this.setState({ errorMessages, [name]: value });
  };

  doSubmit = async () => {
    try {
      const response = await register(this.state.formData);
      storeJwt(response.headers["x-auth-token"]);

      alert(`
          ---NUEVO USUARIO CREADO---
          Nombre de Usuario: ${this.state.username}
          Email: ${this.state.email}
          `);
      window.location = "/";
    } catch (ex) {
      if (ex.response) {
        toast.error(`
          ---ERROR AL CREAR EL USUARIO---
          ${ex.response.data}
          `);
      } else {
        console.log(ex);
      }
    }
  };

  handleRadioBoolean = name => {
    let formData = { ...this.state.formData };
    const currentValue = formData.isAdmin;
    //console.log("Previous value", formData);
    formData[name] = !currentValue;
    this.setState({ formData });
  };

  render() {
    const { formData, errorMessages } = this.state;
    return (
      <div className="wrapper">
        <div className="my-sm-4">
          <h1 className="text-center">Nuevo Usuario</h1>
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
                autoComplete="username"
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
              <label htmlFor="email">Correo electrónico</label>
              <input
                className={
                  errorMessages.email ? "error form-control" : "form-control"
                }
                type="text"
                placeholder="Correo electrónico"
                autoComplete="email"
                name="email"
                noValidate
                onChange={this.handleChange}
              />
              {errorMessages.email && (
                <div className="errorMessage">
                  <span>{errorMessages.email}</span>
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
                autoComplete="current-password"
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
            <div className="row justify-content-around">
              <div className="col-5">
                <div className="form-check">
                  <input
                    value={formData.isAdmin}
                    onChange={() => this.handleRadioBoolean("isAdmin")}
                    name="isAdmin"
                    id="isAdmin0"
                    className="form-check-input"
                    type="radio"
                  />
                  <label className="custom-check-label" htmlFor="isAdmin0">
                    Usuario simple{" "}
                    <span>
                      <FontAwesomeIcon icon={faUserTimes} />
                    </span>
                  </label>
                </div>
                <div className="form-check">
                  <input
                    defaultChecked
                    value={formData.isAdmin}
                    onChange={() => this.handleRadioBoolean("isAdmin")}
                    name="isAdmin"
                    id="isAdmin1"
                    className="form-check-input"
                    type="radio"
                  />
                  <label className="form-check-label" htmlFor="isAdmin1">
                    Administrador{" "}
                    <span>
                      <FontAwesomeIcon
                        icon={faUserCog}
                        style={{ color: "#4f87ce" }}
                      />
                    </span>
                  </label>
                </div>
              </div>
              <div className="col-3">
                <button
                  //disabled={this.validate()}
                  className="submitButton btn-lg"
                >
                  <span>Guardar</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
