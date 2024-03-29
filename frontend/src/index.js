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
import configureStore from "./redux/configureStore";

const root = ReactDOM.createRoot(document.getElementById("root"));

const store = configureStore();

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
