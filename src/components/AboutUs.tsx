import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import about from "../assets/img/aboutUs.jpg";
import "../styles/about-us.css";

const AboutUs = () => {
  const { t } = useTranslation("global");
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
<<<<<<< HEAD
        <p className="ab-description">{t("home.about_us.description1")}</p>
        <p className="ab-description">{t("home.about_us.description2")}</p>
        <p className="ab-description lastDescription">
          {t("home.about_us.description3")}
        </p>
=======
        <p className="ab-description">{t("home.description1")}</p>
        <p className="ab-description">{t("description2")}</p>
        <p className="ab-description lastDescription">{t("description3")}</p>

>>>>>>> 88cdaca87b4f067e707cc8e1a341debac57d3145
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
