import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './bootstrap-override.scss';
import LoginPage from './pages/LoginPage';
import UserSignupPage from './pages/UserSignupPage';
import reportWebVitals from './reportWebVitals';
import LanguageSelector from './components/LanguageSelector';
import ApiProgress from './shared/ApiProgress';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div>
      {/* path property shall be /api/1.0/users for UserSignupPage */}
      <ApiProgress path="/api/1.0/auth">
        <LoginPage />
        {/*<UserSignupPage />*/}
      </ApiProgress>
      <LanguageSelector />
    </div>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
