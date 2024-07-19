import { useState } from "react";
import emailjs from "emailjs-com";
import "../styles/form.css";
import { useTranslation } from "react-i18next";

function Form() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_mail: "",
    user_matter: "",
    user_message: "",
  });

  const { t } = useTranslation("global");

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    emailjs
      .send(
        "service_uyi80bo",
        "template_zxqj97l",
        formData,
        "FxxkJajXA1pApKOU9"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          alert("Email sent successfully!");
        },
        (error) => {
          console.log("FAILED...", error);
          alert("Failed to send email.");
        }
      );
  };

  return (
    <>
      <div className="formCard">
        <div className="formCircle"></div>
        <div className="formCircle"></div>
        <div className="formCardInner">
          <h2>{t("home.form.title")}</h2>
          <div className="formContainer">
            <div className="formInfo">
              <p>{t("home.form.description")}</p>
              <h4>{t("home.form.title")}</h4>
              <ul>
                <li>
                  {t("home.form.li1")} <b>{t("home.form.b1")}</b>?
                </li>
                <li>
                  {t("home.form.li21")}
                  <b>{t("home.form.b2")} </b>

                  {t("home.form.li22")}
                </li>
                <li>
                  {t("home.form.li31")}
                  <b>{t("home.form.b3")} </b>

                  {t("home.form.li32")}
                </li>
                <li>
                  {t("home.form.li41")}
                  <b>{t("home.form.b4")} </b>

                  {t("home.form.li42")}
                </li>
              </ul>
              <p>{t("home.form.final_text")}</p>
            </div>
            <div className="formInputs">
              <form id="form" onSubmit={handleSubmit}>
                <ul>
                  <li>
                    <input
                      type="text"
                      id="name"
                      placeholder={t("home.form.name")}
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="email"
                      id="mail"
                      placeholder={t("home.form.email")}
                      name="user_mail"
                      value={formData.user_mail}
                      onChange={handleInputChange}
                      required
                    />
                  </li>
                  <li>
                    <input
                      type="text"
                      id="matter"
                      placeholder={t("home.form.matter")}
                      name="user_matter"
                      value={formData.user_matter}
                      onChange={handleInputChange}
                      required
                    />
                  </li>
                  <li>
                    <textarea
                      id="msg"
                      name="user_message"
                      placeholder={t("home.form.message")}
                      value={formData.user_message}
                      onChange={handleInputChange}
                      required></textarea>
                  </li>
                  <li>
                    <button type="submit">{t("home.form.button")}</button>
                  </li>
                </ul>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
