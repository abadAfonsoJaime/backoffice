import React, { Component } from "react";
import { Link } from "react-router-dom";
import Eye from "./common/eye";
import TableHeader from "./common/tableHeader";
import TableBody from "./common/tableBody";
import { getCurrentUser } from "../services/authService";

class CardsTable extends Component {
  constructor() {
    super();
    const user = getCurrentUser();
    if (user && user.isAdmin) {
      this.columns.push(this.editColumn);
      this.columns.push(this.deleteColumn);
    }
  }
  editColumn = {
    key: "edit",
    content: eachCard => (
      <Link
        to={`/cards/${eachCard.id}`}
        className="btn btn-warning btn-md"
        style={{ fontWeight: "bold" }}
      >
        Editar
      </Link>
    )
  };
  deleteColumn = {
    key: "delete",
    content: eachCard => (
      <button
        onClick={() => this.props.onDelete(eachCard)}
        className="btn btn-danger btn-md"
      >
        Eliminar
      </button>
    )
  };

  columns = [
    { path: "title", label: "Título" },
    // {
    //   path: "description",
    //   label: "Description",
    //   content: card => <Link to={`/cards/${card._id}`}>{card.description}</Link>
    // },
    { path: "buttonText", label: "Texto Botón" },
    {
      content: eachCard => (
        <a
          href={eachCard.landingPage}
          target="_blank"
          rel="noopener noreferrer"
        >
          {eachCard.landingPage}
        </a>
      ),
      label: "LandingPage"
    },
    {
      label: "Visible",
      content: eachCard => (
        <Eye
          isVisible={eachCard.isVisible}
          onToggleVisibility={() => this.props.onVisibility(eachCard)}
        />
      )
    },
    {
      key: "preview",
      content: eachCard => (
        <button
          onClick={() => this.props.onPreview(eachCard)}
          className="btn btn-outline-success btn-block"
          style={{ fontWeight: "bold" }}
        >
          Vista previa
        </button>
      )
    }
  ];
  render() {
    const {
      cards,
      //onSort,
      sortColumn
    } = this.props;
    return (
      <div className="container">
        <div className="table-responsive table-hover">
          <table className="table">
            <TableHeader
              columns={this.columns}
              sortColumn={sortColumn}
              //onSort={onSort}
            />
            <TableBody columns={this.columns} data={cards} itemValue="id" />
          </table>
        </div>
      </div>
    );
  }
}

export default CardsTable;
