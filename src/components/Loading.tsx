import React, { useEffect } from 'react';
import "../styles/loading.css"; // Asegúrate de tener el archivo CSS en la ruta correcta

function Loading() {
  useEffect(() => {
    const paths = document.querySelectorAll('#layer1 path');
    let currentIndex = 0;

    const animatePaths = () => {
      paths.forEach((path, index) => {
        path.classList.remove('pathAnimate');
        path.style.fill = ''; // Reset fill to allow the animation to restart
        if (index === currentIndex) {
          path.classList.add('pathAnimate');
        }
      });
      currentIndex = (currentIndex + 1) % paths.length;
    };

    const intervalId = setInterval(animatePaths, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="loading">
      <svg
        id="layer1"
        data-name="layer1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1908 576"
        className="svgContainer">
        <defs>
          <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="orange" />
            <stop offset="100%" stopColor="white" />
          </linearGradient>
          <style>{`
            .textBold {
              font-family: Montserrat-SemiBold, Montserrat;
              font-size: 295.6px;
              font-weight: 600;
              fill: #fff;
              filter: drop-shadow(-8px -4px 8px rgba(0, 0, 0, 0.2)) drop-shadow(8px 4px 12px rgba(0, 0, 0, 0.25));
              transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
            }
            .fillBlack, .textLight, .noStroke {
              fill: #fff;
            }
            .textLight {
              font-family: Montserrat-Light, Montserrat;
              font-size: 88.71px;
              font-weight: 300;
              filter: drop-shadow(-8px -4px 8px rgba(0, 0, 0, 0.2)) drop-shadow(8px 4px 12px rgba(0, 0, 0, 0.25));
              transition: transform 0.4s cubic-bezier(0.85, 0.05, 0.18, 1.35);
            }
            .spacingNormal {
              letter-spacing: 0em;
            }
            .spacingWide {
              letter-spacing: .79em;
            }
            .spacingWider {
              letter-spacing: .8em;
            }
            .noStroke {
              stroke-width: 0px;
            }
          `}</style>
        </defs>
        <g>
          <path
            className="noStroke textBold"
            d="M401.14,102.49c-39.61-39.61-91.52-59.41-143.43-59.41l.45,202.84"
          />
          <path
            className="noStroke textBold"
            d="M469,252.29c0-56.01-22.7-106.72-59.41-143.43l-143.11,143.75"
          />
          <path
            className="noStroke textBold"
            d="M102.91,414.49c39.61,39.61,91.52,59.41,143.43,59.41l-.45-202.84"
          />
          <path
            className="noStroke textBold"
            d="M35.95,262.88c0,56.01,22.7,106.72,59.41,143.43l143.11-143.75"
          />
          <path
            className="noStroke textBold"
            d="M94.88,108.23c-39.61,39.61-59.41,91.52-59.41,143.43l202.84-.45"
          />
          <path
            className="noStroke textBold"
            d="M246.49,41.27c-56.01,0-106.72,22.7-143.43,59.41l143.75,143.11"
          />
        </g>
        <text className="textBold textGradient" transform="translate(231.47 473.26)">
          <tspan x="0" y="0">
            PO
          </tspan>
          <tspan className="spacingNormal" x="463.5" y="0">
            R
          </tspan>
          <tspan className="spacingNormal" x="676.63" y="0">
            TIONS
          </tspan>
        </text>
        <text className="textLight textGradient" transform="translate(528.29 246.07)">
          <tspan className="spacingWide" x="0" y="0">
            C
          </tspan>
          <tspan className="spacingWider" x="133.16" y="0">
            OMPONEN
          </tspan>
          <tspan className="spacingWide" x="1130.66" y="0">
            T
          </tspan>
          <tspan className="spacingWider" x="1250.42" y="0">
            S
          </tspan>
        </text>
      </svg>
    </section>
  );
}

export default Loading;
