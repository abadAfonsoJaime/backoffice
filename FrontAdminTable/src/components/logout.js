import { Component } from "react";
import { logout } from "../services/authService";

class Logout extends Component {
  componentDidMount() {
    logout();
  }
  render() {
    return (window.location = "/login");
  }
}

export default Logout;
