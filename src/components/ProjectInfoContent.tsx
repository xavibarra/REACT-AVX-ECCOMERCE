import { useTranslation } from "react-i18next";
import alex from "../assets/img/alex_avx.png";
import xavi from "../assets/img/xavi_avx.png";
import alvaro from "../assets/img/alvaro_avx.png";
import "../styles/project-info.css";
import CreatorFlipCard from "./CreatorFlipCard";

const ProjectInfoContent = () => {
  const { t } = useTranslation("global");
  const creators = [
    {
      name: "Álvaro Monfort",
      foto: alvaro,
      cssClass: "alvaro-photo",
      offer: true,
      rating: 5,
    },
    {
      name: "Xavi Barrachina",
      foto: xavi,
      cssClass: "xavi-photo",
      offer: true,
      rating: 5,
    },
    {
      name: "Àlex Virgili",
      foto: alex,
      cssClass: "alex-photo",
      offer: true,
      rating: 5,
    },
  ];

  return (
    <div className="info-content-container">
      <div className="info-card-container">
        {creators.map((creator, index) => (
          <CreatorFlipCard
            key={index}
            name={creator.name}
            foto={creator.foto}
            cssClass={creator.cssClass}
            offer={creator.offer}
            rating={creator.rating}
          />
        ))}
      </div>
      <div className="info-historia-container">
        <h3>{t("about_us.information_title")}</h3>
        <p>
          {t("about_us.information_text_1")}
          <br></br>
          <br></br>
          {t("about_us.information_text_2")}
        </p>
      </div>
      <div className="info-informacion-container">
        <h3>{t("about_us.history_title")}</h3>
        <div className="info-informacion-bloques-container">
          <p>
            {t("about_us.history_text_1")}
            <br></br>
            <br></br>
            {t("about_us.history_text_2")}
            <br></br>
            <br></br>
            {t("about_us.history_text_3")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfoContent;
