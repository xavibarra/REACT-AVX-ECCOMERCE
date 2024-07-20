import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsTranslate } from "react-icons/bs";
import "../styles/languageSwitcher.css";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [showLanguages, setShowLanguages] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setShowLanguages(false);
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      i18n.changeLanguage("en"); // Default language
    }
  }, [i18n]);

  return (
    <div className="language-switcher">
      <button
        className="translate-button"
        onClick={() => setShowLanguages((prev) => !prev)}>
        <BsTranslate />
      </button>
      <div className={`languages ${showLanguages ? "show" : ""}`}>
        <button
          className="idioma en"
          onClick={() => changeLanguage("en")}
          title="English">
          EN
        </button>
        <button
          className="idioma es"
          onClick={() => changeLanguage("es")}
          title="Español">
          ES
        </button>
        <button
          className="idioma ca"
          onClick={() => changeLanguage("ca")}
          title="Català">
          CA
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
