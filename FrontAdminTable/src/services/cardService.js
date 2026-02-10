import http from "./httpService";
import { SERVER_URL } from "../config.js";

// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

const cards = [];

export async function dbCards() {
  const uri = `${SERVER_URL}/cards`;
  const { data: cards } = await http.get(uri);
  return cards;
}

export function addCardwithGet(newCard) {
  const { title, description, buttonText, landingPage, isVisible } = newCard;
  const newCardEndpoint = `http://localhost:4000/cards/new?title=${title}&description=${description}&buttonText=${buttonText}&landingPage=${landingPage}&isVisible=${isVisible}`;
  fetch(newCardEndpoint)
    .then(response => response)
    .catch(err => console.error(err));
}
export async function addCardwithPost(newCard) {
  const uri = `${SERVER_URL}/cards/new`;
  const serverResponse = await http.post(uri, newCard);
  return serverResponse;
}

export async function getCardById(id) {
  const uri = `${SERVER_URL}/cards/${id}`;
  const { data } = await http.get(uri);
  console.log("Server resopnse data: ", data);
  return data[0];
}

export async function updateCard(card, id) {
  console.log("Data to update -->", card);
  const uri = `${SERVER_URL}/cards/${id}`;
  const response = await http.put(uri, card);
  console.log(response);
}

export async function deleteCard(id) {
  const uri = `${SERVER_URL}/cards/${id}`;
  const response = await http.delete(uri);
  console.log(response);
}

export function fakeCards() {
  return cards;
}
