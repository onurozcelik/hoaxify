import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/hoaxify.png";
import { Authentication } from "../shared/AuthenticationContext";

class TopBar extends Component {
  static contextType = Authentication;

  render() {
    const { t } = this.props;
    const { state, onLogoutSuccess } = this.context;
    const { username, isLoggedIn } = state;
    let links = (
      <ul className="navbar-nav ms-auto">
        <li>
          <Link className="nav-link" to="/login">
            {t("Login")}
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/signup">
            {t("Signup")}
          </Link>
        </li>
      </ul>
    );
    if (isLoggedIn) {
      links = (
        <ul className="navbar-nav ms-auto">
          <li>
            <Link className="nav-link" to={`/user/${username}`}>
              {username}
            </Link>
          </li>
          <li
            className="nav-link"
            onClick={onLogoutSuccess}
            style={{ cursor: "pointer" }}
          >
            Logout
          </li>
        </ul>
      );
    }
    return (
      <div className="shadow-sm bg-light mb-2">
        <nav className="navbar navbar-light container navbar-expand-md">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="60" alt="Hoaxify logo" />
          </Link>
          {links}
        </nav>
      </div>
    );
  }
}

export default withTranslation()(TopBar);
