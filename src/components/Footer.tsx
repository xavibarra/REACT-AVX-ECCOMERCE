import "../styles/footer.css";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";


function Footer() {


const navigate = useNavigate();

const goHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  
  return (
    <div className="footer-container">
      <div className="footer-logo-container">
      <a href="" onClick={goHome}>
          <svg
            id="footer-logo"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1908 576"
            className="h-auto w-full max-w-lg">
            <defs>
              <style>{`
              .font-semi-bold2, .font-light5{
                fill: #fff;
              }
              .font-semi-bold2 {
                font-family: Montserrat-SemiBold, Montserrat;
                font-size: 295.6px;
                font-weight: 600;
              }
              .font-light5 {
                font-family: Montserrat-Light, Montserrat;
                font-size: 88.71px;
                font-weight: 300;
              }
              .spacing-normal {
                letter-spacing: 0em;
              }
              .spacing-wide {
                letter-spacing: .79em;
              }
              .spacing-wider {
                letter-spacing: .8em;
              }
              .no-stroke2 {
                stroke-width: 0px;
                fill: #fff;
              }
            `}</style>
            </defs>
            <g>
              <path
                className="no-stroke2"
                d="M401.14,102.49c-39.61-39.61-91.52-59.41-143.43-59.41l.45,202.84"
              />
              <path
                className="no-stroke2"
                d="M469,252.29c0-56.01-22.7-106.72-59.41-143.43l-143.11,143.75"
              />
              <path
                className="no-stroke2"
                d="M102.91,414.49c39.61,39.61,91.52,59.41,143.43,59.41l-.45-202.84"
              />
              <path
                className="no-stroke2"
                d="M35.95,262.88c0,56.01,22.7,106.72,59.41,143.43l143.11-143.75"
              />
              <path
                className="no-stroke2"
                d="M94.88,108.23c-39.61,39.61-59.41,91.52-59.41,143.43l202.84-.45"
              />
              <path
                className="no-stroke2"
                d="M246.49,41.27c-56.01,0-106.72,22.7-143.43,59.41l143.75,143.11"
              />
            </g>
            <text
              className="font-semi-bold2"
              transform="translate(231.47 473.26)">
              <tspan x="0" y="0">
                PO
              </tspan>
              <tspan className="spacing-normal" x="463.5" y="0">
                R
              </tspan>
              <tspan className="spacing-normal" x="676.63" y="0">
                TIONS
              </tspan>
            </text>
            <text className="font-light5" transform="translate(528.29 246.07)">
              <tspan className="spacing-wide" x="0" y="0">
                C
              </tspan>
              <tspan className="spacing-wider" x="133.16" y="0">
                OMPONEN
              </tspan>
              <tspan className="spacing-wide" x="1130.66" y="0">
                T
              </tspan>
              <tspan className="spacing-wider" x="1250.42" y="0">
                S
              </tspan>
            </text>
          </svg>
        </a>
      </div>
      <div className="footer-media-container">
        <a href="/">
          <FaInstagram className="footer-ico" />
        </a>
        <a href="/">
          <FaXTwitter className="footer-ico" />
        </a>
      </div>
      <div className="footer-copy-container">
        <p>&copy; 2024 - All rights reserved</p>
        <div className="footer-legal-container">
          <a href="/">
            <p>Privacy Policy</p>
          </a>
          <p>|</p>
          <a href="/">
            <p>Cookies Policy</p>
          </a>
          <p>|</p>
          <a href="/">
            <p>Legal Advice</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
