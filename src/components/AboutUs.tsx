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
        <p className="ab-description">{t("prueba.about")}</p>
        <p className="ab-description">
          At Components Portions, we believe in the power of technology to
          transform lives. Our mission is to offer premium products at
          competitive prices, combined with exceptional customer service. Our
          knowledgeable team is here to guide you through every step of your
          purchase, ensuring you find the perfect components to meet your
          specific needs.
        </p>
        <p className="ab-description lastDescription">
          Thank you for choosing Components Portions. We are committed to making
          your shopping experience seamless and enjoyable, with fast shipping
          and reliable support. Join us on our journey to enhance the future of
          computing, one component at a time!
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
