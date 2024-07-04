import { useState } from "react";
import emailjs from "emailjs-com";
import "../styles/form.css";

function Form() {
  const [formData, setFormData] = useState({
    user_name: "",
    user_mail: "",
    user_matter: "",
    user_message: "",
  });

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
          <h3>We'd Love to Hear from You!</h3>
          <div className="formContainer">
            <div className="formInfo">
              <p>
                At AVX components, we strive to provide high-quality products
                and services to meet our customers' needs. Your feedback is
                important to us, whether you have a complaint, a suggestion, or
                simply want to share your thoughts about your experience with
                us.
              </p>
              <h4>What Do We Want to Hear from You?</h4>
              <ul>
                <li>
                  Do you have any questions about{" "}
                  <b>our products or services</b>?
                </li>
                <li>
                  Would you like to share your <b>feedback</b> about a recent
                  purchase?
                </li>
                <li>
                  Do you have any suggestions for <b>improving</b> our online
                  store or product offerings?
                </li>
                <li>
                  Do you need <b>assistance</b> with a technical or service
                  issue?
                </li>
              </ul>
              <p>
                Don't hesitate to get in touch! Your satisfaction is our number
                one priority, and we're here to help in any way we can.
              </p>
            </div>
            <div className="formInputs">
              <form id="form" onSubmit={handleSubmit}>
                <ul>
                  <li>
                    <input
                      type="text"
                      id="name"
                      placeholder="Name"
                      name="user_name"
                      value={formData.user_name}
                      onChange={handleInputChange}
                      required
                    />
                    <input
                      type="email"
                      id="mail"
                      placeholder="Email"
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
                      placeholder="Matter"
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
                      placeholder="Message"
                      value={formData.user_message}
                      onChange={handleInputChange}
                      required></textarea>
                  </li>
                  <li>
                    <button type="submit">Enviar</button>
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
