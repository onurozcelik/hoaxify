import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/hoaxify.png";
import { connect } from 'react-redux';

class TopBar extends Component {

  onClickLogout = () => {
    const action = {
      type: 'logout-success'
    };
    this.props.dispatch(action);
  }

  render() {
    const { t, isLoggedIn, username } = this.props;
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
            onClick={this.onClickLogout}
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

const TopBarWithTranslation = withTranslation()(TopBar);

// Maps redux state to components props
const mapStateToProps = (store) => {
  return {
    username: store.username,
    isLoggedIn: store.isLoggedIn
  }
}

export default connect(mapStateToProps)(TopBarWithTranslation);
