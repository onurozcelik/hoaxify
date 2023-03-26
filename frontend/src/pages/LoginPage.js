import React from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import { login } from "../api/apiCalls";

class LoginPage extends React.Component {
  state = {
    username: null,
    password: null,
    pendingApiCall: false,
    error: null
  };

  onChange = (event) => {
    // Here we take controls name, value
    const { name, value } = event.target;
    const { t } = this.props;

    this.setState({
      [name]: value,
      error: null
    });
  };

  onClickLogin = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    const crendetials = {
      username,
      password
    }
    this.setState({ error: null });
    try {
      await login(crendetials);
    } catch (apiError) {
      this.setState({ error: apiError.response.data.message });
    }
  }

  render() {
    const { t } = this.props;
    const { username, password, error, pendingApiCall } = this.state;
    const buttonEnabled = username && password;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Login")}</h1>
          <Input
            name="username"
            label={t("Username")}
            onChange={this.onChange}
          />
          <Input
            name="password"
            label={t("Password")}
            onChange={this.onChange}
            type="password"
          />
          {error &&
            <div className="alert alert-danger">
              {error}
            </div>
          }

          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={!buttonEnabled}
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
