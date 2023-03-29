import React from "react";
import "./App.css";
import LanguageSelector from "./components/LanguageSelector";
import {HashRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPageWithApiProgress from "./pages/LoginPage";
import UserSignupPageWithApiProgress from "./pages/UserSignupPage";
import UserPage from "./pages/UserPage";
import TopBar from "./components/TopBar";

class App extends React.Component {
  state = {
    isLoggedIn: false,
    username: undefined
  }
  onLoginSuccess = (username) => {
    this.setState({
      username,
      isLoggedIn: true
    });
  }

  onLogoutSuccess = () => {
    this.setState({
      username: undefined,
      isLoggedIn: false
    });
  }

  render() {
    const {isLoggedIn, username} = this.state;
    return (
      <div>
        <Router>
          <TopBar username={username} isLoggedIn={isLoggedIn} onLogoutSuccess={this.onLogoutSuccess} />
          <Switch>
            {/*exact is required to unmatch home page when the url is /login */}
            <Route exact path="/" component={HomePage} />
            {
              !isLoggedIn &&
            <Route path="/login" component={(props) => {
              return <LoginPageWithApiProgress {...props} onLoginSuccess={this.onLoginSuccess} />
            }} />
          }
            <Route path="/signup" component={UserSignupPageWithApiProgress} />
            <Route path="/user/:username" component={UserPage} />
            <Redirect to="/" />
          </Switch>
        </Router>
        <LanguageSelector />
      </div>
    );
  } 
}

export default App;
