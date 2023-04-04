import React from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from "react-redux";
import { signupHandler } from "../redux/authActions";

class UserSignupPage extends React.Component {
  state = {
    username: null,
    displayName: null,
    password: null,
    passwordRepeat: null,
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

    try {
      const {history, dispatch} = this.props;
      const {push} = history;
      await dispatch(signupHandler(body));
      push('/');
    } catch (error) {
      // Important to check
      if (error.response.data.validations) {
        this.setState({ errors: error.response.data.validations });
      }
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
    const { errors } = this.state;
    const { username, displayName, password, passwordRepeat } = errors;
    return (
      <div className="container-md">
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
            <ButtonWithProgress disabled={pendingApiCall || passwordRepeat !== undefined}
              onClick={this.onClickSignup} pendingApiCall={pendingApiCall} text={t("Sign Up")} />
          </div>
        </form>
      </div>
    );
  }
}

const UserSignupPageWithApiProgressForSignupRequest = withApiProgress(UserSignupPage, '/api/1.0/users');
const UserSignupPageWithApiProgressForAuthRequest = withApiProgress(UserSignupPageWithApiProgressForSignupRequest, '/api/1.0/auth');
const UserSignupPageWithTranslation = withTranslation()(UserSignupPageWithApiProgressForAuthRequest);

export default connect()(UserSignupPageWithTranslation); 
