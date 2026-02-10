import http from "./httpService";
import { SERVER_URL } from "../config.js";

export function register(user) {
  const apiEndpoint = `${SERVER_URL}/users/new`;
  return http.post(apiEndpoint, {
    username: user.username,
    email: user.email,
    password: user.password,
    isAdmin: user.isAdmin
  });
}
