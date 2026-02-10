import { jwtDecode } from "jwt-decode";
import http from "./httpService";
import { SERVER_URL } from "../config.js";

const tokenKey = "purisima-token";
http.setJwt(getJwt());

export async function login(credentials) {
  const apiEndpoint = `${SERVER_URL}/login`;
  const response = await http.post(apiEndpoint, credentials);
  localStorage.setItem(tokenKey, response.headers["x-auth-token"]);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function storeJwt(token) {
  localStorage.setItem(tokenKey, token);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const authToken = getJwt();
    return jwtDecode(authToken);
    //console.log("jwt-decode --> ", user);
  } catch (ex) {
    return null;
  }
}

//export default { login, logout, getCurrentUser, storeJwt };
