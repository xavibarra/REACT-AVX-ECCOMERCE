import { useNavigate } from "react-router-dom";

import { useTranslation } from "react-i18next";

import about from "../assets/img/aboutUs.jpg";
import "../styles/about-us.css";

const AboutUs = () => {
  const [t, i18n] = useTranslation("global");
  const navigate = useNavigate();

  const goToProjectInfo = () => {
    window.scrollTo(0, 0);
    navigate("/projectInfo");
  };

  return (
    <section className="ab-container">
      <div className="ab-description-container">
        <h2>About us</h2>
        <button className="idioma" onClick={() => i18n.changeLanguage("es")}>
          ES
        </button>
        <button className="idioma" onClick={() => i18n.changeLanguage("en")}>
          EN
        </button>
        <button className="idioma" onClick={() => i18n.changeLanguage("ca")}>
          CA
        </button>
        <p className="ab-description">{t("home.about_us.description1")}</p>
        <p className="ab-description">{t("home.about_us.description2")}</p>
        <p className="ab-description lastDescription">
          {t("home.about_us.description3")}
        </p>
        <button onClick={goToProjectInfo} className="ab-button">
          Know more!
        </button>
      </div>
      <div className="ab-image-container">
        <img className="ab-image" src={about} alt="About-us image" />
      </div>
    </section>
  );
};

export default AboutUs;
