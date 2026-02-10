import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Cards from "./components/cards";
import NavBar from "./components/navBar";
import CardForm from "./components/cardForm";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import ProtectedRoute from "./components/common/protectedRoute";

import Logout from "./components/logout";
import { getCurrentUser } from "./services/authService";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <>
        <ToastContainer />
        <div className="row justify-content-center">
          <span>
            <img
              style={{ backgroundColor: "white" }}
              className="img-fluid"
              src="/logo_130aniversario.svg"
              width="383"
              height="75"
              alt="Purisima"
            />
          </span>
        </div>
        <NavBar user={this.state.user} />
        <Switch>
          <ProtectedRoute path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/logout" component={Logout} />
          <Route path="/not-found" component={NotFound}></Route>
          <ProtectedRoute path="/cards/:id" component={CardForm} />
          <ProtectedRoute
            path="/cards"
            render={props => <Cards {...props} user={user} />}
          />
          <Redirect exact from="/" to="/cards" />
          <Redirect to="/not-found" />
        </Switch>
      </>
    );
  }
}

export default App;
