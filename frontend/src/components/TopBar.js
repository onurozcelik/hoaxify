import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/hoaxify.png";

class TopBar extends Component {
  render() {
    const { t } = this.props;
    return (
      <div className="shadow-sm bg-light mb-2">
        <nav className="navbar navbar-light container navbar-expand-md">
          <Link className="navbar-brand" to="/">
            <img src={logo} width="60" alt="Hoaxify logo" />
          </Link>

          <ul className="navbar-nav">
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
        </nav>
      </div>
    );
  }
}

export default withTranslation()(TopBar);
