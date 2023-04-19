import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import ButtonWithProgress from "../components/ButtonWithProgress";
import { withApiProgress } from "../shared/ApiProgress";
import { connect } from 'react-redux';
import { loginHandler } from "../redux/authActions";

const LoginPage = props => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  useEffect(() => setError(undefined), [username, password]);

  /* const onChange = (event) => {
     // Here we take controls name, value
     const { name, value } = event.target;
     this.setState({
       [name]: value,
       error: null
     });
   };*/

  const onClickLogin = async event => {
    event.preventDefault();
    const credentials = {
      username,
      password
    }

    setError(undefined);
    const { history, dispatch } = props;
    const { push } = history;
    try {
      await dispatch(loginHandler(credentials));
      push('/');
    } catch (apiError) {
      setError(apiError.response.data.message);
    }
  }

  const { t, pendingApiCall } = props;
  const buttonEnabled = username && password;
  return (
    <form className="container-md">
      <h1 className="text-center">{t("Login")}</h1>
      <Input
        name="username"
        label={t("Username")}
        onChange={(event) => setUsername(event.target.value)}
      />
      <Input
        name="password"
        label={t("Password")}
        onChange={(event) => setPassword(event.target.value)}
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
          onClick={onClickLogin} pendingApiCall={pendingApiCall} text={t("Login")}
        />
      </div>
    </form>
  );
}

const LoginPageWithTranslation = withTranslation()(LoginPage);
const LoginPageWithApiProgress = withApiProgress(LoginPageWithTranslation, '/api/1.0/auth');

export default connect()(LoginPageWithApiProgress);
