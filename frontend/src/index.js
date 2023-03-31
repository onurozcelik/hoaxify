import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./bootstrap-override.scss";
import LoginPage from "./pages/LoginPage";
import UserSignupPage from "./pages/UserSignupPage";
import reportWebVitals from "./reportWebVitals";
import LanguageSelector from "./components/LanguageSelector";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import App from "./App";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const root = ReactDOM.createRoot(document.getElementById("root"));

const loggedInState = {
  isLoggedIn: true,
  username: 'user1',
  displayName: 'display1',
  image: null,
  password: 'P4ssword'
};

const defaultState = {
  isLoggedIn: false,
  username: undefined,
  displayName: undefined,
  image: null,
  password: undefined
};

const reducer = (state, action) => {
  if (action.type === 'logout-success') {
    return defaultState;
  }
  return state;
}

const store = createStore(reducer, loggedInState);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
