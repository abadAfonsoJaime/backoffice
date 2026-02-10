import React from "react";
import ReactForm from "./common/reactForm";
import PhoneSimulator from "./phoneSimulator";
import CardSimulator from "./cardSimulator";
import { toast } from "react-toastify";

import {
  getCardById,
  //addCardwithGet,
  updateCard,
  addCardwithPost
} from "../services/cardService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import InputField from "./common/inputField";

class CardForm extends ReactForm {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        title: "",
        description: "",
        buttonText: "",
        landingPage: "",
        isVisible: true
      },
      errorMessages: {}
    };
  }

  customValidation = ({ name, value }) => {
    let errorMessages = this.state.errorMessages;

    switch (name) {
      case "title":
        errorMessages.title =
          value.trim().length === 0 ? "El Título es obligatorio." : "";
        break;
      case "description":
        if (value.trim().length === 0) {
          errorMessages.description = "La descripción es obligatoria.";
          return;
        }
        if (value.trim().length > 512) {
          errorMessages.description = "La descripción es obligatoria.";
          return;
        }
        break;
      case "buttonText":
        errorMessages.buttonText =
          value.trim().length === 0 ? "El texto del botón es obligatorio." : "";
        break;
      case "landingPage":
        errorMessages.landingPage =
          value.trim().length === 0
            ? "La URL de la landing page es obligatoria."
            : "";
        break;
      default:
        break;
    }

    this.setState({ errorMessages, [name]: value });
  };

  mapToViewModel(card) {
    return {
      title: card.title,
      description: card.description,
      buttonText: card.buttonText,
      landingPage: card.landingPage,
      isVisible: !!card.isVisible
    };
  }

  async populateCard() {
    try {
      const cardId = this.props.match.params.id;
      if (cardId === "new") return;

      const card = await getCardById(cardId);
      this.setState({ formData: this.mapToViewModel(card) }, () =>
        console.log(this.state)
      );
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("not-found");
      // If using history.push() redirection to an invalid card._id page
      // when clicking the back button will produce an inifinte loop to the "/not-found page"
    }
  }

  async componentDidMount() {
    await this.populateCard();
  }

  doSubmit = async () => {
    const cardId = this.props.match.params.id;
    const card = this.state.formData;
    if (cardId === "new") {
      try {
        await addCardwithPost(card);
        //console.log(data);
        window.location = "/";
        console.log(`
          ---TARJETA ${card.id} EDITADA---
          Título: ${card.title}
          Descripción: ${card.description}
          Landing Page: ${card.landingPage}
          Texto del Botón: ${card.buttonText}
          Visible: ${card.isVisible}
          `);
      } catch (ex) {
        if (ex.response) {
          toast.error(`
            ---ERROR AL CREAR LA TARJETA---
            ${ex.response.data}
          `);
          return;
        } else {
          console.error("logging the error: ", ex);
        }
      }
    } else {
      try {
        await updateCard(card, cardId);
        //console.log(data);
        window.location = "/";
        console.log(`
          ---NUEVO TARJETA CREADA---
          Título: ${card.title}
          Descripción: ${card.description}
          Landing Page: ${card.landingPage}
          Texto del Botón: ${card.buttonText}
          Visible: ${card.isVisible}
          `);
      } catch (ex) {
        if (ex.response) {
          toast.error(`
            ---ERROR AL EDITAR LA TARJETA---
            ${ex.response.data}
          `);
          return;
        } else {
          console.error("logging the error: ", ex);
        }
      }
    }
  };

  handleRadioBoolean = name => {
    let formData = { ...this.state.formData };
    formData[name] = !formData.isVisible;
    this.setState({ formData });
  };

  render() {
    const { formData, errorMessages } = this.state;
    return (
      <div style={{ backgroundColor: "#61c8ec" }}>
        <div className="row justify-content-center">
          <div className="my-4">
            <h1 className="text-center" style={{ fontWeight: "bold" }}>
              {" "}
              {this.props.match.params.id === "new"
                ? "Formulario de Campaña"
                : formData.title}{" "}
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="wrapper col-lg-7">
            <div className="form-wrapper">
              <form onSubmit={this.handleSubmit}>
                <InputField
                  name="title"
                  label="Título"
                  value={formData.title}
                  error={errorMessages.title}
                  onChange={this.handleChange}
                  autoFocus
                  // import directly without the render helper
                  // in order to apply the autoFocus attribute
                />
                {this.renderTextAreaField("description", "Descripción")}

                {this.renderInputField(
                  "landingPage",
                  "Landing Page (url)",
                  "url"
                )}
                {this.renderInputField("buttonText", "Texto del botón")}
                {/* {this.renderRadioBoolean} */}

                <div className="row justify-content-around">
                  <div className="col-4">
                    <div className="form-check">
                      <input
                        checked={!formData.isVisible}
                        value={formData.isVisible}
                        onChange={() => this.handleRadioBoolean("isVisible")}
                        name="isVisible"
                        id="isVisible0"
                        className="form-check-input"
                        type="radio"
                      />
                      <label
                        className="custom-check-label"
                        htmlFor="isVisible0"
                      >
                        Oculto{" "}
                        <span>
                          <FontAwesomeIcon icon={faEyeSlash} />
                        </span>
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        checked={formData.isVisible}
                        value={formData.isVisible}
                        onChange={() => this.handleRadioBoolean("isVisible")}
                        name="isVisible"
                        id="isVisible1"
                        className="form-check-input"
                        type="radio"
                      />
                      <label className="form-check-label" htmlFor="isVisible1">
                        Visible{" "}
                        <span>
                          <FontAwesomeIcon
                            icon={faEye}
                            style={{ color: "#4f87ce" }}
                          />
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="col-4">
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
          <div className="col">
            <div className="row justify-content-center"></div>
            <div className="row justify-content-center mt-sm-2 mt-md-3 mt-1">
              <PhoneSimulator>
                {formData.isVisible && (
                  <CardSimulator
                    title={formData.title}
                    description={formData.description}
                    buttonText={formData.buttonText}
                  />
                )}
              </PhoneSimulator>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardForm;
