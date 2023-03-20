import React from "react";
import { signup, changeLanguage } from "../api/apiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";

class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
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
    if (name === "password" || name === "passwordRepeat") {
      if (name === "password" && value !== this.state.passwordRepeat) {
        errors.passwordRepeat = t("Password mismatch");
      } else if (name === "passwordRepeat" && value !== this.state.password) {
        errors.passwordRepeat = t("Password mismatch");
      } else {
        errors.passwordRepeat = undefined;
      }
    }
    this.setState({
      [name]: value,
      errors,
    });
  };

  onClickSignup = async (event) => {
    event.preventDefault();
    const { username, displayName, password } = this.state;

    console.log(username);

    const body = {
      username,
      displayName,
      password,
    };

    this.setState({ pendingApiCall: true });

    try {
      const response = await signup(body);
    } catch (error) {
      // Important to check
      if (error.response.data.validations) {
        this.setState({ errors: error.response.data.validations });
      }
    }
    this.setState({ pendingApiCall: false });
  };

  onChangeLanguage = (language) => {
    const { i18n } = this.props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };

  render() {
    const { t } = this.props;
    const { pendingApiCall, errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    return (
      <div className="container">
        <form>
          <h1 className="text-center">{t("Sign Up")}</h1>
          <Input
            name="username"
            label={t("Username")}
            error={username}
            onChange={this.onChange}
          />
          <Input
            name="displayName"
            label={t("Display Name")}
            error={displayName}
            onChange={this.onChange}
          />
          <Input
            name="password"
            label={t("Password")}
            error={password}
            onChange={this.onChange}
            type="password"
          />
          <Input
            name="passwordRepeat"
            label={t("Password Repeat")}
            error={passwordRepeat}
            onChange={this.onChange}
            type="password"
          />
          <div className="text-center">
            <button
              className="btn btn-primary"
              disabled={pendingApiCall || passwordRepeat !== undefined}
              onClick={this.onClickSignup}
            >
              {pendingApiCall && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              {t("Sign Up")}
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

export default withTranslation()(UserSignupPage);
