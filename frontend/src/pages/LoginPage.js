import React from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from 'react-redux';
import { loginHandler} from "../redux/authActions";

class LoginPage extends React.Component {

  state = {
    username: null,
    password: null,    
    error: null
  };

  onChange = (event) => {
    // Here we take controls name, value
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null
    });
  };

  onClickLogin = async event => {
    event.preventDefault();
    const { username, password } = this.state;
    const credentials = {
      username,
      password
    }
    this.setState({ error: null });
    const {history, dispatch} = this.props;
    const {push} = history;
    try {
      await dispatch(loginHandler(credentials));
      push('/');
    } catch (apiError) {
      this.setState({ error: apiError.response.data.message });
    }
  }

  render() {
    const { t, pendingApiCall } = this.props;
    const { username, password, error } = this.state;
    const buttonEnabled = username && password;
    return (
        <form className="container-md">
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
            <ButtonWithProgress
              disabled={!buttonEnabled || pendingApiCall}
              onClick={this.onClickLogin} pendingApiCall={pendingApiCall} text={t("Login")}
            />
          </div>
        </form>
    );
  }
}

const LoginPageWithTranslation = withTranslation()(LoginPage);
const LoginPageWithApiProgress = withApiProgress(LoginPageWithTranslation,'/api/1.0/auth'); 

export default connect()(LoginPageWithApiProgress);
