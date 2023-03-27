import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap-override.scss';
import LoginPage from './pages/LoginPage';
import UserSignupPage from './pages/UserSignupPage';
import reportWebVitals from './reportWebVitals';
import LanguageSelector from './components/LanguageSelector';
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
        <LoginPage/>
      <LanguageSelector />
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
