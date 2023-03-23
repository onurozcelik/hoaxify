import React from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";

class LoginPage extends React.Component {
  state = {
    username: null,
    password: null,
    pendingApiCall: false,
    errors: {},
  };

  onChange = (event) => {
    // Here we take controls name, value
    const { name, value } = event.target;
    const { t } = this.props;
    // Created copy of errors object
    const errors = { ...this.state.errors };
    errors[name] = undefined;
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickLogin = event => {
    event.preventDefault();
    const { username, password } = this.state;
    const crendetials = {
      username,
      password
    }
    login(crendetials);
  }

  render() {
    const { t } = this.props;
    const { pendingApiCall, errors } = this.state;
    const { username, password } = errors;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Login")}</h1>
          <Input
            name="username"
            label={t("Username")}
            error={username}
            onChange={this.onChange}
          />
          <Input
            name="password"
            label={t("Password")}
            error={password}
            onChange={this.onChange}
            type="password"
          />
          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={pendingApiCall}
              onClick={this.onClickLogin}
            >
              {pendingApiCall && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {t("Login")}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(LoginPage);
