import React, { Component } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { dbCards, updateCard, deleteCard } from "../services/cardService";

import CardsTable from "./cardsTable";
// import Simulator from "./simulator";
import PhoneSimulator from "./phoneSimulator";
import CardSimulator from "./cardSimulator";
import SearchBox from "./searchBox";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from "lodash";

class Cards extends Component {
  state = {
    cards: [],
    currentPage: 1,
    pageSize: 4,
    searchQuery: "",
    sortColumn: { path: "id", order: "asc" },
    simulator: {
      display: false,
      title: "",
      description: "",
      buttonText: ""
    }
  };

  async componentDidMount() {
    try {
      const cards = await dbCards();
      this.setState({ cards });
    } catch (ex) {
      if (ex.response) {
        toast.error(`
          ---ERROR AL RECUPERAR LAS CAMPAÑAS---
          ${ex.response.data}
        `);
        return;
      } else {
        console.error("logging the error: ", ex);
      }
    }
  }

  handleDelete = async cardToDelete => {
    const originalCards = this.state.cards;
    const cards = this.state.cards.filter(c => c.id !== cardToDelete.id);
    this.setState({ cards });
    try {
      await deleteCard(cardToDelete.id);
      //throw new Error("fake error");
    } catch (ex) {
      this.setState({ cards: originalCards });
      if (ex.response) {
        toast.error(
          `No se pudo eliminar la tarjeta de la campaña "${cardToDelete.id}"
             ${ex.response.data}
          `
        );
        return;
      } else {
        console.error("logging the error: ", ex);
      }
    }
  };

  handleVisibility = async clickedCard => {
    //console.log("Eye clicked", clickedCard);
    const originalCards = this.state.cards;
    let cards = [...this.state.cards];
    const index = cards.indexOf(clickedCard);
    cards[index] = { ...cards[index] };
    cards[index].isVisible = !cards[index].isVisible;
    this.setState({ cards });
    // call the server to persist the changes
    try {
      await updateCard(cards[index], clickedCard.id);
    } catch (ex) {
      this.setState({ cards: originalCards });
      if (ex.response) {
        toast(
          `No se pudo editar la tarjeta de la campaña "${clickedCard.id}"
             ${ex.response.data}
          `
        );
        return;
      } else {
        console.error("logging the error: ", ex);
      }
    }
  };
  handleSimulator = card => {
    const { title, description, buttonText } = card;
    const simulator = { ...this.state.simulator };
    simulator.title = title;
    simulator.description = description;
    simulator.buttonText = buttonText;
    simulator.display = true;
    this.setState({ simulator });
    //console.log(" display it --> ", simulator);
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  updateDataSubset = () => {
    try {
      const {
        pageSize,
        currentPage,
        sortColumn,
        searchQuery,
        cards: AllCards
      } = this.state;
      let filtered = AllCards;
      if (searchQuery)
        filtered = AllCards.filter(c =>
          c.title.toLowerCase().startsWith(searchQuery.toLowerCase())
        );
      const sorted = _.orderBy(filtered, [sortColumn.path], sortColumn.order);
      const cards = paginate(sorted, currentPage, pageSize);
      return { totalCount: filtered.length, cards };
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { user } = this.props;
    const { totalCount, cards } = this.updateDataSubset();
    //if (totalCount === 0) return <p> No hay campañas en la base de datos. </p>;

    const {
      pageSize,
      currentPage,
      searchQuery,
      sortColumn,
      simulator
    } = this.state;

    return (
      <>
        <div className="row justify-content-around align-items-center mb-4">
          <div className="col-sm-4 d-flex justify-content-center">
            {user && user.isAdmin ? (
              <button className="submitButton">
                <Link to="/cards/new" className="btn">
                  <span>Nueva Campaña</span>
                </Link>
              </button>
            ) : null}
          </div>
          <div className="col-sm-6">
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </div>
        </div>

        {totalCount === 0 || (
          <div className="row">
            <div className="col d-flex justify-content-center">
              <h5>Se encontraron {totalCount} campañas en la base de datos.</h5>
            </div>
          </div>
        )}
        <div className="row justify-content-center">
          <div className="col">
            <CardsTable
              cards={cards}
              sortColumn={sortColumn}
              onVisibility={this.handleVisibility}
              //onSort={this.handleSort}
              onPreview={this.handleSimulator}
              onDelete={this.handleDelete}
            />
            <Pagination
              currentPage={currentPage}
              pageSize={pageSize}
              itemsCount={totalCount}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
        {totalCount === 0 || (
          <div className="row  justify-content-center">
            <div className="col-auto">
              <PhoneSimulator>
                {simulator.display && (
                  <CardSimulator
                    title={simulator.title}
                    description={simulator.description}
                    buttonText={simulator.buttonText}
                  />
                )}
              </PhoneSimulator>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Cards;
