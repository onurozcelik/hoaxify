import React from "react";
import { withTranslation } from "react-i18next";
import { changeLanguage } from "../api/apiCalls";

const LanguageSelector = (props) => {
  const onChangeLanguage = (language) => {
    const { i18n } = props;
    i18n.changeLanguage(language);
    changeLanguage(language);
  };
  return (
    <div className="container">
      <img
        className="me-1"
        src="https://flagcdn.com/w40/tr.png"
        srcset="https://flagcdn.com/w80/tr.png 2x"
        width="40"
        alt="Turkey"
        onClick={() => onChangeLanguage("tr")}
        style={{ cursor: "pointer" }}
      />
      <img
        src="https://flagcdn.com/w40/us.png"
        srcset="https://flagcdn.com/w80/us.png 2x"
        width="40"
        alt="United States"
        onClick={() => onChangeLanguage("en")}
        style={{ cursor: "pointer" }}
      />
    </div>
  );
};

export default withTranslation()(LanguageSelector);
