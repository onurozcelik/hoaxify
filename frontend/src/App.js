import React from "react";
import "./App.css";
import LanguageSelector from "./components/LanguageSelector";
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPageWithApiProgress from "./pages/LoginPage";
import UserSignupPageWithApiProgress from "./pages/UserSignupPage";
import UserPage from "./pages/UserPage";
import TopBar from "./components/TopBar";
import { connect } from 'react-redux';

class App extends React.Component {
  render() {
    const {isLoggedIn} = this.props;
    return (
      <div>
        <Router>
          <TopBar />
          <Switch>
            {/*exact is required to unmatch home page when the url is /login */}
            <Route exact path="/" component={HomePage} />
            {!isLoggedIn && (
              <Route
                path="/login"
                component={LoginPageWithApiProgress}
              />
            )}
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

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn
  }
}

export default connect(mapStateToProps, null)(App);
