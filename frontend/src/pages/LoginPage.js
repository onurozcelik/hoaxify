import React from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";

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
          <div>
            <img
              src="https://flagcdn.com/24x18/tr.png"
              srcset="https://flagcdn.com/48x36/tr.png 2x,
    https://flagcdn.com/72x54/tr.png 3x"
              width="24"
              height="18"
              alt="Turkey"
              onClick={() => this.onChangeLanguage("tr")}
              style={{ cursor: "pointer" }}
            />
            <img
              src="https://flagcdn.com/24x18/us.png"
              srcset="https://flagcdn.com/48x36/us.png 2x,
    https://flagcdn.com/72x54/us.png 3x"
              width="24"
              height="18"
              alt="United States"
              onClick={() => this.onChangeLanguage("en")}
              style={{ cursor: "pointer" }}
            />
          </div>
        </form>
      </div>
    );
  }
}

export default withTranslation()(LoginPage);
