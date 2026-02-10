import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListUl,
  faLock,
  //faUser,
  faUsers,
  faPowerOff,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

const NavBar = ({ user }) => {
  //console.log("NavBar User: ", user);
  return (
    <div className="row no-gutters">
      <div className="col-12">
        <nav className="navbar navbar-expand-sm">
          <div className="navbar-nav nav-fill w-100">
            {user && user.isAdmin ? (
              <NavLink className="tab nav-item nav-link active" to="/">
                <h4>
                  <span>
                    <FontAwesomeIcon icon={faListUl} />
                  </span>{" "}
                  Listado
                </h4>
              </NavLink>
            ) : null}

            {user && user.isAdmin ? (
              <NavLink className="tab nav-item nav-link" to="/cards/new">
                <h4>
                  <span>
                    <FontAwesomeIcon icon={faPlusCircle} />
                  </span>{" "}
                  Nueva Campaña
                </h4>
              </NavLink>
            ) : null}

            {!user && (
              <NavLink className="tab nav-item nav-link" to="/login">
                <h4>
                  <span>
                    <FontAwesomeIcon icon={faLock} />
                  </span>{" "}
                  Login
                </h4>
              </NavLink>
            )}
            {user && user.isAdmin ? (
              <NavLink className="tab nav-item nav-link" to="/register">
                <h4>
                  <span>
                    <FontAwesomeIcon icon={faUsers} />
                  </span>{" "}
                  Registrar Usuarios
                </h4>
              </NavLink>
            ) : null}
            {user && (
              <>
                {/* <NavLink className="tab nav-item nav-link" to="/me">
                  <h4>
                    <span>
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    {` ${user.username}`}
                  </h4>
                </NavLink> */}

                <NavLink className="tab nav-item nav-link" to="/logout">
                  <h4>
                    <span>
                      <FontAwesomeIcon icon={faPowerOff} />
                    </span>{" "}
                    Cerrar Sesión
                  </h4>
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
