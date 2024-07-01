import React, { useEffect, useState } from "react";

import "../styles/svgCategories.css";

const Categories: React.FC = () => {
  useEffect(() => {
    function rotarVentiladorGenerico(ventiladorId: string, svgId: string) {
      let angulo = 0;
      let velocidad = 0;
      let animacionId: number;

      const rotar = () => {
        angulo += velocidad;
        const ventilador = document.getElementById(
          ventiladorId
        ) as unknown as SVGGElement;
        if (ventilador) {
          const cx = ventilador.getBBox().x + ventilador.getBBox().width / 2;
          const cy = ventilador.getBBox().y + ventilador.getBBox().height / 2;
          ventilador.setAttribute(
            "transform",
            `rotate(${angulo}, ${cx}, ${cy})`
          );
        }
        animacionId = requestAnimationFrame(rotar);
      };

      const aumentarVelocidad = () => {
        if (velocidad < 20) {
          velocidad += 10;
          if (!animacionId) rotar();
        }
      };

      const disminuirVelocidad = () => {
        if (velocidad > 0) {
          velocidad -= 10;
        } else {
          velocidad = 0;
          cancelAnimationFrame(animacionId);
          animacionId = 0;
        }
      };

      const svgElement = document.getElementById(svgId);
      if (svgElement) {
        svgElement.addEventListener("mouseenter", aumentarVelocidad);
        svgElement.addEventListener("mouseleave", disminuirVelocidad);
      }
    }

    rotarVentiladorGenerico("ventilador", "case_fan");
    rotarVentiladorGenerico("ventilador_cooler", "cpu_cooler");
    rotarVentiladorGenerico("ventilador_board", "motherboard");
    rotarVentiladorGenerico("ventilador1_graphic", "graphic_card");
    rotarVentiladorGenerico("ventilador2_graphic", "graphic_card");
    rotarVentiladorGenerico("ihd_ventilador", "internal_hard_drive");
    rotarVentiladorGenerico("ventilador_power", "power_supply");

    const motherboard = document.getElementById("motherboard");
    const lightBoard = document.getElementById("light_board");

    if (motherboard && lightBoard) {
      motherboard.addEventListener("mouseover", () => {
        lightBoard.style.display = "block";
      });

      motherboard.addEventListener("mouseout", () => {
        lightBoard.style.display = "none";
      });
    }

    const scrollContainer = document.querySelector(".scroll-container");
    const prevButton = document.querySelector(".arrow.prev");
    const nextButton = document.querySelector(".arrow.next");
    const scrollStep = 300;

    if (scrollContainer && prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        if (scrollContainer.scrollTo) {
          scrollContainer.scrollTo({
            left: (scrollContainer.scrollLeft || 0) - scrollStep,
            behavior: "smooth",
          });
        }
      });

      nextButton.addEventListener("click", () => {
        if (scrollContainer.scrollTo) {
          scrollContainer.scrollTo({
            left: (scrollContainer.scrollLeft || 0) + scrollStep,
            behavior: "smooth",
          });
        }
      });
    }
  }, []);

  const categoriesName = [
    "Cpu",
    "Case",
    "Power supply",
    "Internal hard drive",
    "Monitor",
    "External hard drive",
    "Optical drive",
    "Case fan",
    "Ram memory",
    "Graphic card",
    "Cpu cooler",
    "Motherboard",
  ];

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };
  return (
    <section
      id="components"
      className="flex justify-center items-center h-screen mr-8 bg-white overflow-x-auto"
    >
      <div className="relative h-full mx-auto container">
        <div
          id="cpu"
          onMouseEnter={() => handleMouseEnter(0)}
          onMouseLeave={handleMouseLeave}
        >
          {/* CPU */}
          <svg
            id="cpu2"
            className="item"
            data-name="Cpu"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1265 1127"
          >
            <g>
              <g>
                <g>
                  <rect
                    className="cls-1"
                    x="274.94"
                    y="88.76"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="288.95"
                    y="19.77"
                    width="28.03"
                    height="68.99"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="407.8"
                    y="88.76"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="421.81"
                    y="19.77"
                    width="28.03"
                    height="68.99"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="540.65"
                    y="88.76"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="554.66"
                    y="19.77"
                    width="28.03"
                    height="68.99"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="673.51"
                    y="88.76"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="687.52"
                    y="19.77"
                    width="28.03"
                    height="68.99"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="806.36"
                    y="88.76"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="820.38"
                    y="19.77"
                    width="28.03"
                    height="68.99"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="939.22"
                    y="88.76"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="953.23"
                    y="19.77"
                    width="28.03"
                    height="68.99"
                  />
                </g>
              </g>
              <g>
                <g>
                  <rect
                    className="cls-1"
                    x="939.22"
                    y="943.25"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="953.23"
                    y="1012.24"
                    width="28.03"
                    height="68.99"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="806.36"
                    y="943.25"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="820.38"
                    y="1012.24"
                    width="28.03"
                    height="68.99"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="673.51"
                    y="943.25"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="687.52"
                    y="1012.24"
                    width="28.03"
                    height="68.99"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="540.65"
                    y="943.25"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="554.66"
                    y="1012.24"
                    width="28.03"
                    height="68.99"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="407.8"
                    y="943.25"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="421.81"
                    y="1012.24"
                    width="28.03"
                    height="68.99"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="274.94"
                    y="943.25"
                    width="56.05"
                    height="68.99"
                  />
                  <rect
                    className="cls-1"
                    x="288.95"
                    y="1012.24"
                    width="28.03"
                    height="68.99"
                  />
                </g>
              </g>
              <g>
                <g>
                  <rect
                    className="cls-1"
                    x="1032.42"
                    y="179.26"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="1101.4"
                    y="193.28"
                    width="68.99"
                    height="28.03"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="1032.42"
                    y="312.12"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="1101.4"
                    y="326.13"
                    width="68.99"
                    height="28.03"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="1032.42"
                    y="444.97"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="1101.4"
                    y="458.99"
                    width="68.99"
                    height="28.03"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="1032.42"
                    y="577.83"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="1101.4"
                    y="591.84"
                    width="68.99"
                    height="28.03"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="1032.42"
                    y="710.69"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="1101.4"
                    y="724.7"
                    width="68.99"
                    height="28.03"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="1032.42"
                    y="843.54"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="1101.4"
                    y="857.55"
                    width="68.99"
                    height="28.03"
                  />
                </g>
              </g>
              <g>
                <g>
                  <rect
                    className="cls-1"
                    x="163.6"
                    y="843.54"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="94.61"
                    y="857.56"
                    width="68.99"
                    height="28.03"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="163.6"
                    y="710.69"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="94.61"
                    y="724.7"
                    width="68.99"
                    height="28.03"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="163.6"
                    y="577.83"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="94.61"
                    y="591.84"
                    width="68.99"
                    height="28.03"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="163.6"
                    y="444.97"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="94.61"
                    y="458.99"
                    width="68.99"
                    height="28.03"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="163.6"
                    y="312.12"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="94.61"
                    y="326.13"
                    width="68.99"
                    height="28.03"
                  />
                </g>
                <g>
                  <rect
                    className="cls-1"
                    x="163.6"
                    y="179.26"
                    width="68.99"
                    height="56.05"
                  />
                  <rect
                    className="cls-1"
                    x="94.61"
                    y="193.28"
                    width="68.99"
                    height="28.03"
                  />
                </g>
              </g>
            </g>
            <path
              className="cls-1"
              d="M1042.29,283.5c-9.71,0-17.58-7.87-17.58-17.58s6.57-17.58,16.28-17.58c.41,0,.82.03,1.23.06v-85.18c0-9.1-7.38-16.48-16.48-16.48H247.23c-9.1,0-16.48,7.38-16.48,16.48v85.19c.46-.04.91-.07,1.38-.07,9.71,0,17.58,7.87,17.58,17.58s-7.87,17.58-17.58,17.58c-.46,0-.92-.03-1.38-.07v653.08c0,9.1,7.38,16.48,16.48,16.48h778.51c9.1,0,16.48-7.38,16.48-16.48"
            />
            <rect
              id="outlight_cpu"
              className="cls-2"
              x="308.1"
              y="223.59"
              width="656.77"
              height="652.56"
              rx="12.65"
              ry="12.65"
            />
            <rect
              id="light_cpu"
              className="cls-3"
              x="381.51"
              y="296.53"
              width="509.95"
              height="506.68"
              rx="12.65"
              ry="12.65"
            />
            <polyline
              className="cls-2"
              points="299.21 939.97 241.9 939.97 241.9 882.66"
            />
          </svg>
        </div>
        <div
          id="case"
          onMouseEnter={() => handleMouseEnter(1)}
          onMouseLeave={handleMouseLeave}
        >
          {/* CASE */}
          <svg
            id="case2"
            className="item"
            data-name="Case"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 521 1200"
          >
            <rect
              className="cls-1"
              x="30.94"
              y="31.5"
              width="459.13"
              height="1137"
              rx="45.31"
              ry="45.31"
            />
            <rect
              className="cls-3"
              x="53.39"
              y="62.27"
              width="414.21"
              height="119.77"
            />
            <rect
              className="cls-3"
              x="53.39"
              y="201.18"
              width="414.21"
              height="111.45"
            />
            <rect
              className="cls-3"
              x="53.39"
              y="326.77"
              width="414.21"
              height="111.45"
            />
            <rect
              className="cls-3"
              x="53.39"
              y="454.86"
              width="414.21"
              height="111.45"
              rx="34.59"
              ry="34.59"
            />
            <g>
              <rect
                className="cls-2"
                x="166.51"
                y="497.28"
                width="57.39"
                height="26.62"
              />
              <rect
                className="cls-2"
                x="232.22"
                y="497.28"
                width="26.62"
                height="26.62"
                rx="13.31"
                ry="13.31"
                transform="translate(491.06 1021.17) rotate(-180)"
              />
              <rect
                className="cls-2"
                x="264.66"
                y="497.28"
                width="26.62"
                height="26.62"
                rx="13.31"
                ry="13.31"
                transform="translate(555.93 1021.17) rotate(180)"
              />
              <rect
                className="cls-2"
                x="297.1"
                y="497.28"
                width="57.39"
                height="26.62"
              />
            </g>
            <circle
              className="cls-10 light_case"
              cx="260.5"
              cy="707.71"
              r="39.92"
            />
            <circle
              className="cls-16 light_case"
              cx="260.32"
              cy="793.8"
              r="18.3"
            />
          </svg>
        </div>
        <div
          id="power_supply"
          onMouseEnter={() => handleMouseEnter(2)}
          onMouseLeave={handleMouseLeave}
        >
          {/* POWER SUPPLY */}
          <svg
            id="power_supply2"
            className="item"
            data-name="Power supply"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 717"
          >
            <rect
              className="cls-1"
              x="46"
              y="24"
              width="1112"
              height="668"
              rx="27.3"
              ry="27.3"
            />
            <g>
              <g>
                <rect
                  className="cls-3"
                  x="97.33"
                  y="82.19"
                  width="570.25"
                  height="570.25"
                  rx="24.51"
                  ry="24.51"
                />
                <circle className="cls-2" cx="385.65" cy="363.1" r="271.35" />
                <path
                  id="ventilador_power"
                  className="cls-1"
                  d="M638.18,340.26c-.92-11.07-2.71-20.15-4.15-26.34-2.73-5.85-6.05-8.73-9.34-10-15.75-6.03-33.02,23.42-84.01,41.13-16.51,5.73-41.07,12.58-76.9,6.58-.93-4-1.87-8-2.8-12,9.67-3.64,23.31-9.35,38.83-17.93,36.7-20.29,57.56-42.07,65.33-50.69,21.32-23.64,25.2-34.41,25.46-42.64.08-2.39.24-7.81-1.39-14.04-4.34-10.57-12.9-27.44-29.28-43.29-22.71-21.97-47.74-29.69-59.63-32.53-4.67-.37-7.76.65-9.45,1.6-14.7,8.26-3.08,40.37-22.04,90.91-6.14,16.36-16.56,39.63-44.08,63.36-3.67-1.84-7.35-3.67-11.02-5.51,3.38-9.77,7.7-23.9,11.02-41.32,7.84-41.2,4.42-71.16,2.75-82.64-4.56-31.51-10.37-41.37-16.53-46.83-1.73-1.54-5.62-4.96-11.17-7.64-5.87-.4-11.79-.62-17.76-.62-28.02,0-54.98,4.49-80.23,12.76-2.01,2.13-3.26,4.25-4.01,6.28-6.51,17.84,25.55,31.46,44.93,83.08,6.28,16.71,13.78,41.85,7.35,81.18-4.35,1.66-8.69,3.32-13.04,4.98-3.98-9.75-10.22-23.39-19.59-38.58-22.15-35.92-45.88-54.63-55.27-61.53-25.76-18.91-37.48-21.28-46.42-20.21-1.93.23-5.67.68-10.24,2.03-27.64,26.02-49.53,58.07-63.56,94.06.41,4.43,1.66,7.66,3.33,10.03,10.95,15.52,40.41-3.08,93.88,10.39,17.31,4.36,42.25,12.52,70.91,40.2-1.11,4.52-2.22,9.03-3.33,13.55-10.28-2.28-25.05-4.92-42.86-5.87-42.14-2.25-71.04,6.59-82.05,10.38-30.21,10.4-38.83,18.68-43.05,26.64-2.63,4.96-5.99,12.17-6.67,27.1-1.4,30.68,9.15,57.36,19.21,75.73,7.3,8.9,13.49,11.97,18.51,12.44,18.91,1.77,23.94-32.7,68.94-64.57,14.57-10.32,36.98-23.96,76.65-27.74,2.71,3.78,5.42,7.56,8.13,11.34-8.42,6.33-20.03,15.83-32.33,28.75-29.11,30.56-41.18,58.26-45.46,69.09-11.74,29.72-11.05,41.65-7.75,50.03,1.45,3.68,5.71,14.45,16.25,22.69,5.69,4.44,10.77,7.01,13.72,8.28,31.04,13.38,78.83,33.98,92.41,18.45,11.13-12.72-12.34-36.5-11.54-93.75.25-17.85,2.44-44,22.76-78.27,4.65.04,9.3.08,13.95.12.15,10.53.99,25.51,4.17,43.06,7.53,41.52,22.8,67.6,29.03,77.45,17.09,27,27.14,33.48,35.85,35.74,9.94,2.58,18.08,1.81,27.91.24,29.39-4.7,49.63-20.6,56.61-26.56,10.2-8.7,43.1-36.73,36.08-56.3-6.18-17.23-37.12-9.96-84.67-39.77-14.8-9.28-35.51-24.15-53.27-55.86,2.53-3.23,5.07-6.46,7.6-9.69,8.89,5.27,21.88,12.33,38.28,19.06,38.8,15.92,68.83,18.56,80.42,19.23,25.27,1.46,37.96.89,49.19-6.83,31.79-21.85,26.81-81.48,25.4-98.42Z"
                />
                <circle
                  id="rodona_power"
                  className="cls-3"
                  cx="383.84"
                  cy="361.81"
                  r="77.14"
                />
                <circle
                  id="R.2_power"
                  className="cls-1"
                  cx="634.57"
                  cy="110.02"
                  r="17.75"
                />
                <circle
                  id="R.1_power"
                  className="cls-1"
                  cx="132.11"
                  cy="110.02"
                  r="17.75"
                />
                <circle
                  id="R.3_power"
                  className="cls-1"
                  cx="132.11"
                  cy="616.46"
                  r="17.75"
                />
                <circle
                  id="R.4_power"
                  className="cls-1"
                  cx="634.57"
                  cy="616.46"
                  r="17.75"
                />
              </g>
              <circle className="cls-12" cx="382.46" cy="367.32" r="217.92" />
              <circle className="cls-12" cx="382.46" cy="367.32" r="149.7" />
            </g>
            <g>
              <path
                className="cls-3"
                d="M1009.21,274.12h-169.48c-7.71,0-15.01-3.49-19.86-9.5l-39.7-49.23c-8.4-10.41-8.4-25.27,0-35.68l39.7-49.23c4.84-6.01,12.14-9.5,19.86-9.5h169.48c7.71,0,15.01,3.49,19.86,9.5l39.7,49.23c8.4,10.41,8.4,25.27,0,35.68l-39.7,49.23c-4.84,6.01-12.14,9.5-19.86,9.5Z"
              />
              <rect
                className="cls-2"
                x="841.89"
                y="136.13"
                width="165.17"
                height="122.87"
                rx="25.55"
                ry="25.55"
              />
              <g>
                <rect
                  className="cls-1"
                  x="917.68"
                  y="150.48"
                  width="13.58"
                  height="38.28"
                />
                <g>
                  <rect
                    className="cls-1"
                    x="946.7"
                    y="201.11"
                    width="13.58"
                    height="38.28"
                  />
                  <rect
                    className="cls-1"
                    x="888.66"
                    y="201.11"
                    width="13.58"
                    height="38.28"
                  />
                </g>
              </g>
              <circle className="cls-2" cx="793.61" cy="198.03" r="11.73" />
              <circle className="cls-2" cx="1056.64" cy="198.03" r="11.73" />
            </g>
            <g>
              <rect
                className="cls-3"
                x="798.85"
                y="447"
                width="238.8"
                height="169"
              />
              <rect
                className="cls-321"
                x="821.5"
                y="466.75"
                width="193.49"
                height="129.81"
              />
              <circle
                id="supply_off"
                className="cls-13"
                cx="968.77"
                cy="531.81"
                r="25.11"
              />
              <line
                id="supply_on"
                className="cls-17"
                x1="843.24"
                y1="531.66"
                x2="899.57"
                y2="531.51"
              />
            </g>
          </svg>
        </div>
        <div
          id="internal_hard_drive"
          onMouseEnter={() => handleMouseEnter(3)}
          onMouseLeave={handleMouseLeave}
        >
          {/* INTERNAL HARD DRIVE */}
          <svg
            id="internal_hard_drive2"
            className="item"
            data-name="Internal hard drive"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 887 1200"
          >
            <rect className="cls-1" x="38.5" y="18" width="810" height="1164" />
            <g>
              <g id="R.2-1">
                <circle className="cls-2" cx="80.53" cy="56.74" r="19.29" />
              </g>
              <g id="R.2-2" data-name="R.2">
                <circle className="cls-2" cx="80.53" cy="647.74" r="19.29" />
              </g>
              <g id="R.2-3" data-name="R.2">
                <circle className="cls-2" cx="80.53" cy="1139.74" r="19.29" />
              </g>
              <g id="R.2-4" data-name="R.2">
                <circle className="cls-2" cx="801.53" cy="56.74" r="19.29" />
              </g>
              <g id="R.2-5" data-name="R.2">
                <circle className="cls-2" cx="801.53" cy="647.74" r="19.29" />
              </g>
              <g id="R.2-6" data-name="R.2">
                <circle className="cls-2" cx="801.53" cy="1139.74" r="19.29" />
              </g>
            </g>
            <path
              className="cls-3"
              d="M443.5,30.74C232.8,30.74,62,201.55,62,412.24s170.8,381.5,381.5,381.5,381.5-170.8,381.5-381.5S654.2,30.74,443.5,30.74ZM443.5,545.24c-73.45,0-133-59.55-133-133s59.55-133,133-133,133,59.55,133,133-59.55,133-133,133Z"
            />
            <g id="ihd_ventilador">
              <circle
                id="R.2-7"
                data-name="R.2"
                className="cls-2"
                cx="402.5"
                cy="339.24"
                r="19.29"
              />
              <circle
                id="R.2-8"
                data-name="R.2"
                className="cls-2"
                cx="488.5"
                cy="339.24"
                r="19.29"
              />
              <circle
                id="R.2-9"
                data-name="R.2"
                className="cls-2"
                cx="446.5"
                cy="412.5"
                r="43.5"
              />
              <circle
                id="R.2-10"
                data-name="R.2"
                className="cls-2"
                cx="402.5"
                cy="485.24"
                r="19.29"
              />
              <circle
                id="R.2-11"
                data-name="R.2"
                className="cls-2"
                cx="359.5"
                cy="412.24"
                r="19.29"
              />
              <circle
                id="R.2-12"
                data-name="R.2"
                className="cls-2"
                cx="527.5"
                cy="412.24"
                r="19.29"
              />
              <circle
                id="R.2-13"
                data-name="R.2"
                className="cls-2"
                cx="488.5"
                cy="485.24"
                r="19.29"
              />
            </g>
            <g>
              <path
                className="cls-3"
                d="M162.21,733l85.2,48.31-16.2,39.69h24.2v65.17h71.13v80.67c3.83,2.32,12.6,6.93,24.66,7.16,13.13.24,22.69-4.85,26.5-7.16,1.77-1.88,14.64-15.1,34.5-13.84,16.56,1.04,26.75,11.44,29,13.84v59.95c0,33.25-26.95,60.2-60.2,60.2h-229.59c-33.25,0-60.2-26.95-60.2-60.2v-236.92h38l33-56.88Z"
              />
              <polygon
                className="cls-3"
                points="705.21 716 777.21 762 777.21 867.95 741.86 903.3 795.87 957.31 640.19 1112.99 561.71 1121.25 469.83 1029.38 597.71 901.5 551.78 855.58 705.21 716"
              />
            </g>
            <g id="ihd_stick">
              <path
                id="topPart"
                className="cls-1"
                d="M357.66,954.56c-14.05,14.05-41.81,9.08-62-11.11l-29.15-29.15c-20.19-20.19-25.16-47.95-11.11-62,255.13-215.52,338.18-263.83,351.98-250.04,13.79,13.79-34.44,96.91-249.71,352.31Z"
              />
              <circle className="cls-1" cx="611.21" cy="598" r="13" />
              <circle className="cls-2" cx="331.71" cy="880.5" r="46" />
              <circle className="cls-2" cx="548.96" cy="663.25" r="12.75" />
              <rect
                className="cls-2"
                x="384.15"
                y="779.35"
                width="55.42"
                height="31"
                rx="15.5"
                ry="15.5"
                transform="translate(-441.41 524.03) rotate(-45)"
              />
              <rect
                className="cls-2"
                x="458.15"
                y="705.35"
                width="55.42"
                height="31"
                rx="15.5"
                ry="15.5"
                transform="translate(-367.41 554.69) rotate(-45)"
              />
            </g>
          </svg>
        </div>
        <div
          id="monitor"
          onMouseEnter={() => handleMouseEnter(4)}
          onMouseLeave={handleMouseLeave}
        >
          {/* MONITOR */}
          <svg
            id="monitor2"
            className="item"
            data-name="Monitor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 958"
          >
            <g>
              <path
                className="cls-77"
                d="M695.73,785.1h-207.86c.3,11.6-.79,28.22-7.49,46.64-2.93,8.05-6.39,14.97-9.79,20.73h242.4c-3.42-6.49-6.88-14.18-9.79-23.03-5.65-17.18-7.27-32.64-7.49-44.34Z"
              />
              <rect
                className="cls-31"
                x="24.51"
                y="44.5"
                width="1150.99"
                height="742.76"
                rx="26.62"
                ry="26.62"
              />
              <rect
                className="cls-6"
                x="74.26"
                y="90.26"
                width="1050.98"
                height="606.14"
              />
              <circle
                className="cls-6 light_monitor"
                cx="96.05"
                cy="741.39"
                r="16.99"
              />
              <circle
                className="cls-6 light_monitor"
                cx="147.87"
                cy="741.39"
                r="16.99"
              />
              <path
                className="cls-31"
                d="M368.21,852.47h452.94c19.76,0,35.8,16.04,35.8,35.8v25.23H332.41v-25.23c0-19.76,16.04-35.8,35.8-35.8Z"
              />
            </g>
            <g>
              <g id="logo_monitor">
                <path
                  className="cls-31 logo"
                  d="M343.51,297.37c-18.68-18.68-43.16-28.02-67.64-28.02l.21,95.65"
                />
                <path
                  className="cls-31 logo"
                  d="M375.51,368.01c0-26.41-10.71-50.33-28.02-67.64l-67.49,67.79"
                />
                <path
                  className="cls-31 logo"
                  d="M202.86,444.5c18.68,18.68,43.16,28.02,67.64,28.02l-.21-95.65"
                />
                <path
                  className="cls-31 logo"
                  d="M171.29,373.01c0,26.41,10.71,50.33,28.02,67.64l67.49-67.79"
                />
                <path
                  className="cls-31 logo"
                  d="M199.08,300.08c-18.68,18.68-28.02,43.16-28.02,67.64l95.65-.21"
                />
                <path
                  className="cls-31 logo"
                  d="M270.57,268.5c-26.41,0-50.33,10.71-67.64,28.02l67.79,67.49"
                />
              </g>
              <text
                className="cls-41 logo"
                transform="translate(263.49 472.22)"
              >
                <tspan x="0" y="0">
                  PO
                </tspan>
                <tspan className="cls-101" x="218.58" y="0">
                  R
                </tspan>
                <tspan x="319.09" y="0">
                  TIONS
                </tspan>
              </text>
              <text className="cls-5 logo" transform="translate(403.47 365.08)">
                <tspan className="cls-8 logo" x="0" y="0">
                  C
                </tspan>
                <tspan className="cls-166 logo" x="62.8" y="0">
                  OMPONEN
                </tspan>
                <tspan className="cls-25 logo" x="533.2" y="0">
                  T
                </tspan>
                <tspan className="cls-9 logo" x="589.68" y="0">
                  S
                </tspan>
              </text>
            </g>
          </svg>
        </div>
        <div
          id="external_hard_drive"
          onMouseEnter={() => handleMouseEnter(5)}
          onMouseLeave={handleMouseLeave}
        >
          {/* EXTERNAL HARD DRIVE */}
          <svg
            id="external_hard_drive2"
            className="item"
            data-name="External hard drive"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1106 1266"
          >
            <rect
              className="cls-29"
              x="163.89"
              y="259.52"
              width="577.96"
              height="901.33"
              rx="48.18"
              ry="48.18"
            />
            <rect
              className="cls-49"
              x="197.11"
              y="1055.05"
              width="522.08"
              height="82.22"
              rx="31.71"
              ry="31.71"
            />
            <rect
              className="cls-39"
              x="243.41"
              y="1092.57"
              width="96.59"
              height="13.57"
              rx="6.79"
              ry="6.79"
            />
            <rect
              className="cls-39"
              x="387.9"
              y="1092.57"
              width="96.59"
              height="13.57"
              rx="6.79"
              ry="6.79"
            />
            <circle className="cls-39" cx="596.65" cy="1098.56" r="14.77" />
            <circle className="cls-39" cx="655.72" cy="1098.56" r="14.77" />
            <path
              className="cls-19"
              d="M415.04,192.11h71.05c20.71,0,37.52,16.81,37.52,37.52v35.13h-146.09v-35.13c0-20.71,16.81-37.52,37.52-37.52Z"
            />
            <path
              className="cls-59"
              d="M451.36,192.94v-56.23c0-43.47,35.24-78.71,78.71-78.71h301.6c43.47,0,78.71,35.24,78.71,78.71v375.91"
            />
            <path
              className="cls-19"
              d="M868.96,513.02h82.02c17.46,0,31.63,14.17,31.63,31.63v124.03h-145.29v-124.03c0-17.46,14.17-31.63,31.63-31.63Z"
            />
            <rect
              className="cls-19"
              x="858.09"
              y="668.69"
              width="102.18"
              height="75.84"
            />
            <rect
              className="cls-39"
              x="892.94"
              y="688.64"
              width="11.96"
              height="24.75"
            />
            <rect
              className="cls-39"
              x="919.84"
              y="688.64"
              width="11.96"
              height="24.75"
            />
            <path
              id="light_external1"
              className="cls-39"
              d="M648.5,1005h-386c-6.9,0-12.5-5.6-12.5-12.5s5.6-12.5,12.5-12.5h386c6.9,0,12.5,5.6,12.5,12.5s-5.6,12.5-12.5,12.5Z"
            />
            <path
              id="light_external2"
              className="cls-39"
              d="M617.62,946h-324.24c-5.8,0-10.5-5.6-10.5-12.5s4.7-12.5,10.5-12.5h324.24c5.8,0,10.5,5.6,10.5,12.5s-4.7,12.5-10.5,12.5Z"
            />
            <path
              id="light_external3"
              className="cls-39"
              d="M579.02,887h-247.04c-4.42,0-8-5.6-8-12.5s3.58-12.5,8-12.5h247.04c4.42,0,8,5.6,8,12.5s-3.58,12.5-8,12.5Z"
            />
          </svg>
        </div>
        <div
          id="optical_drive"
          onMouseEnter={() => handleMouseEnter(6)}
          onMouseLeave={handleMouseLeave}
        >
          {/* OPTICAL DRIVE */}
          <svg
            id="optical_drive2"
            className="item"
            data-name="Optical drive"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 1214"
          >
            <g id="disk_move">
              <rect
                className="cls-3"
                x="160.4"
                y="253.75"
                width="878.74"
                height="706.34"
              />
              <path
                className="cls-1"
                d="M599.77,267.52c-187.06,0-338.71,151.64-338.71,338.71s151.64,338.71,338.71,338.71,338.71-151.64,338.71-338.71-151.64-338.71-338.71-338.71ZM599.77,694.88c-48.96,0-88.65-39.69-88.65-88.65s39.69-88.65,88.65-88.65,88.65,39.69,88.65,88.65-39.69,88.65-88.65,88.65Z"
              />
              <path
                className="cls-1"
                d="M119.88,958.94h960.24c14.76,0,26.73,11.98,26.73,26.73v155.07H93.14v-155.07c0-14.76,11.98-26.73,26.73-26.73Z"
              />
            </g>
            <g>
              <rect
                className="cls-1"
                x="100.16"
                y="73.25"
                width="999.68"
                height="885"
                rx="37.92"
                ry="37.92"
              />
              <rect
                className="cls-2"
                x="167.89"
                y="263.13"
                width="29.92"
                height="526.01"
              />
              <rect
                className="cls-2"
                x="167.89"
                y="834.02"
                width="29.92"
                height="32.41"
              />
              <rect
                className="cls-2"
                x="167.89"
                y="188.34"
                width="29.92"
                height="32.41"
              />
              <rect
                className="cls-2"
                x="993.06"
                y="263.13"
                width="29.92"
                height="526.01"
              />
              <rect
                className="cls-2"
                x="993.06"
                y="834.02"
                width="29.92"
                height="32.41"
              />
              <rect
                className="cls-2"
                x="993.06"
                y="188.34"
                width="29.92"
                height="32.41"
              />
              <path
                className="cls-3"
                d="M600,196.65c-176.23,0-319.1,142.87-319.1,319.1s142.87,319.1,319.1,319.1,319.1-142.86,319.1-319.1-142.87-319.1-319.1-319.1ZM600,599.26c-46.12,0-83.51-37.39-83.51-83.51s37.39-83.51,83.51-83.51,83.51,37.39,83.51,83.51-37.39,83.51-83.51,83.51Z"
              />
            </g>
          </svg>
        </div>
        <div
          id="case_fan"
          onMouseEnter={() => handleMouseEnter(7)}
          onMouseLeave={handleMouseLeave}
        >
          {/* CASE FAN */}
          <svg
            id="case_fan2"
            data-name="Case fan"
            className="item"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 1200"
          >
            <rect
              className="cls-1"
              x="49.75"
              y="49.75"
              width="1100.5"
              height="1100.5"
              rx="42.39"
              ry="42.39"
            />
            <circle className="cls-2" cx="606.16" cy="591.85" r="523.67" />
            <path
              id="ventilador"
              className="cls-1"
              d="M1093.5,547.78c-1.78-21.37-5.23-38.89-8.02-50.82-5.27-11.3-11.67-16.86-18.03-19.29-30.39-11.63-63.73,45.2-162.13,79.38-31.85,11.07-79.25,24.27-148.41,12.7-1.8-7.72-3.61-15.43-5.41-23.15,18.67-7.02,44.99-18.04,74.93-34.6,70.84-39.16,111.08-81.18,126.09-97.82,41.15-45.63,48.62-66.41,49.14-82.29.15-4.61.47-15.08-2.68-27.09-8.38-20.39-24.89-52.95-56.51-83.54-43.82-42.4-92.14-57.29-115.08-62.77-9.01-.71-14.97,1.25-18.23,3.08-28.37,15.94-5.95,77.9-42.53,175.44-11.84,31.57-31.97,76.47-85.06,122.28-7.09-3.54-14.18-7.09-21.27-10.63,6.53-18.85,14.87-46.13,21.27-79.75,15.13-79.51,8.53-137.32,5.32-159.49-8.81-60.81-20.02-79.84-31.9-90.38-3.34-2.97-10.84-9.56-21.55-14.75-11.33-.77-22.75-1.2-34.27-1.2-54.07,0-106.11,8.67-154.84,24.63-3.88,4.12-6.3,8.21-7.73,12.12-12.57,34.43,49.3,60.72,86.71,160.34,12.11,32.25,26.59,80.77,14.18,156.66-8.39,3.2-16.77,6.4-25.16,9.6-7.68-18.81-19.73-45.15-37.8-74.45-42.76-69.31-88.54-105.43-106.66-118.74-49.71-36.49-72.32-41.06-89.58-38.99-3.72.44-10.94,1.32-19.75,3.92-53.34,50.21-95.58,112.07-122.66,181.52.78,8.56,3.21,14.79,6.43,19.35,21.14,29.94,77.99-5.94,181.18,20.06,33.4,8.41,81.53,24.15,136.84,77.58-2.15,8.72-4.29,17.43-6.43,26.15-19.84-4.4-48.34-9.5-82.72-11.34-81.32-4.34-137.09,12.72-158.35,20.04-58.31,20.07-74.94,36.06-83.08,51.42-5.07,9.58-11.56,23.49-12.87,52.29-2.69,59.2,17.66,110.7,37.07,146.14,14.08,17.17,26.04,23.11,35.73,24.02,36.49,3.41,46.2-63.11,133.04-124.61,28.11-19.91,71.36-46.24,147.92-53.53,5.23,7.3,10.45,14.59,15.68,21.89-16.24,12.21-38.65,30.55-62.4,55.48-56.17,58.97-79.47,112.43-87.73,133.34-22.66,57.35-21.33,80.38-14.95,96.55,2.81,7.11,11.01,27.89,31.36,43.78,10.99,8.58,20.78,13.53,26.47,15.98,59.9,25.82,152.12,65.58,178.34,35.61,21.48-24.56-23.82-70.45-22.27-180.92.48-34.44,4.7-84.91,43.93-151.04,8.98.08,17.95.15,26.93.23.29,20.32,1.9,49.23,8.05,83.11,14.53,80.13,43.99,130.46,56.02,149.46,32.98,52.11,52.37,64.61,69.19,68.98,19.17,4.98,34.88,3.5,53.85.46,56.71-9.08,95.77-39.76,109.26-51.26,19.69-16.78,83.18-70.89,69.64-108.65-11.92-33.24-71.64-19.22-163.39-76.76-28.57-17.92-68.53-46.62-102.8-107.8,4.89-6.24,9.78-12.47,14.67-18.71,17.16,10.16,42.23,23.79,73.88,36.78,74.88,30.73,132.84,35.82,155.21,37.1,48.77,2.81,73.26,1.72,94.93-13.18,61.34-42.17,51.74-157.24,49.01-189.93Z"
            />
            <circle
              id="rodona"
              className="cls-3"
              cx="602.66"
              cy="589.37"
              r="148.86"
            />
            <circle
              id="R.2"
              className="cls-3"
              cx="1086.54"
              cy="108.45"
              r="34.26"
            />
            <circle
              id="R.1"
              className="cls-3"
              cx="116.87"
              cy="108.45"
              r="34.26"
            />
            <circle
              id="R.3"
              className="cls-3"
              cx="116.87"
              cy="1085.81"
              r="34.26"
            />
            <circle
              id="R.4"
              className="cls-3"
              cx="1086.54"
              cy="1085.81"
              r="34.26"
            />
          </svg>
        </div>
        <div
          id="ram"
          onMouseEnter={() => handleMouseEnter(8)}
          onMouseLeave={handleMouseLeave}
        >
          {/* RAM */}
          <svg
            id="ram2"
            className="item"
            data-name="Ram"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 307"
          >
            <path
              className="cls-1"
              d="M1165.49,138.66c.7,0,1.38.06,2.05.15V26H35.46v112.81c.67-.09,1.35-.15,2.05-.15,8.67,0,15.7,7.03,15.7,15.7s-7.03,15.7-15.7,15.7c-.7,0-1.38-.06-2.05-.15v24.89c.67-.09,1.35-.15,2.05-.15,8.67,0,15.7,7.03,15.7,15.7s-7.03,15.7-15.7,15.7c-.7,0-1.38-.06-2.05-.15v54.09h457.47v-30.04h16.39v30.04h658.22v-54.09c-.67.09-1.35.15-2.05.15-8.67,0-15.7-7.03-15.7-15.7s7.03-15.7,15.7-15.7c.7,0,1.38.06,2.05.15v-24.89c-.67.09-1.35.15-2.05.15-8.67,0-15.7-7.03-15.7-15.7s7.03-15.7,15.7-15.7Z"
            />
            <g>
              <rect
                className="cls-3"
                x="99.65"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="221.18"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="342.72"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="464.26"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-2"
                x="118.76"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="237.57"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="361.84"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="480.65"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-3"
                x="630.86"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="752.4"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="873.94"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="995.47"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-2"
                x="649.98"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="768.78"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="893.05"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="1011.86"
                y="71.06"
                width="76.47"
                height="128.37"
              />
            </g>
            <circle
              className="cls-2 blink_ram"
              cx="55.95"
              cy="263.61"
              r="10.92"
            />
            <circle
              className="cls-2 blink_ram"
              cx="1145.69"
              cy="263.61"
              r="10.92"
            />
            <rect
              id="line_ram1"
              className="cls-2"
              x="77.8"
              y="260.88"
              width="0"
              height="13.66"
              fill="#fff"
            />
            <rect
              id="line_ram2"
              className="cls-2"
              x="520.25"
              y="260.88"
              width="0"
              height="13.66"
            />
          </svg>
          <svg
            id="ram3"
            className="item"
            data-name="Ram"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 307"
          >
            <path
              className="cls-1"
              d="M1165.49,138.66c.7,0,1.38.06,2.05.15V26H35.46v112.81c.67-.09,1.35-.15,2.05-.15,8.67,0,15.7,7.03,15.7,15.7s-7.03,15.7-15.7,15.7c-.7,0-1.38-.06-2.05-.15v24.89c.67-.09,1.35-.15,2.05-.15,8.67,0,15.7,7.03,15.7,15.7s-7.03,15.7-15.7,15.7c-.7,0-1.38-.06-2.05-.15v54.09h457.47v-30.04h16.39v30.04h658.22v-54.09c-.67.09-1.35.15-2.05.15-8.67,0-15.7-7.03-15.7-15.7s7.03-15.7,15.7-15.7c.7,0,1.38.06,2.05.15v-24.89c-.67.09-1.35.15-2.05.15-8.67,0-15.7-7.03-15.7-15.7s7.03-15.7,15.7-15.7Z"
            />
            <g>
              <rect
                className="cls-3"
                x="99.65"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="221.18"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="342.72"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="464.26"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-2"
                x="118.76"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="237.57"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="361.84"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="480.65"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-3"
                x="630.86"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="752.4"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="873.94"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-3"
                x="995.47"
                y="36.92"
                width="107.88"
                height="195.28"
              />
              <rect
                className="cls-2"
                x="649.98"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="768.78"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="893.05"
                y="71.06"
                width="76.47"
                height="128.37"
              />
              <rect
                className="cls-2"
                x="1011.86"
                y="71.06"
                width="76.47"
                height="128.37"
              />
            </g>
            <circle
              className="cls-2 blink_ram"
              cx="55.95"
              cy="263.61"
              r="10.92"
            />
            <circle
              className="cls-2 blink_ram"
              cx="1145.69"
              cy="263.61"
              r="10.92"
            />
            <rect
              id="line_ram1"
              className="cls-2"
              x="77.8"
              y="260.88"
              width="0"
              height="13.66"
              fill="#fff"
            />
            <rect
              id="line_ram2"
              className="cls-2"
              x="520.25"
              y="260.88"
              width="0"
              height="13.66"
            />
          </svg>
        </div>
        <div
          id="graphic_card"
          onMouseEnter={() => handleMouseEnter(9)}
          onMouseLeave={handleMouseLeave}
        >
          {/* GRAPHIC CARD */}
          <svg
            id="graphic_card2"
            className="item"
            data-name="Graphic card"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 717"
          >
            <g>
              <rect
                className="cls-44"
                x="378.29"
                y="71.28"
                width="261.35"
                height="127.28"
                rx="63.64"
                ry="63.64"
              />
              <rect
                className="cls-44"
                x="766.91"
                y="71.28"
                width="261.35"
                height="127.28"
                rx="63.64"
                ry="63.64"
              />
            </g>
            <polygon
              className="cls-1"
              points="1111.78 92.3 825.33 92.3 808.16 109.47 587.54 109.47 566.5 88.43 189.85 88.43 189.85 147.3 167.74 147.3 167.74 88.43 125.47 88.43 106.76 107.13 106.76 131.72 87.94 131.72 89.54 117.86 27.17 117.86 27.17 121.51 84.75 121.51 84.75 583.07 105.74 583.07 105.74 624.57 182.58 624.57 182.58 575.89 271.08 575.89 271.08 619.38 309.26 619.38 309.26 579.48 327.74 579.48 327.74 645.72 381.94 645.72 381.94 601.83 395.57 601.83 395.57 645.72 741.91 645.72 741.91 601.03 757.87 601.03 757.87 627.36 813.73 627.36 813.73 608.21 787.79 608.21 787.79 579.48 1105 579.48 1172.83 534.8 1172.83 135.87 1111.78 92.3"
            />
            <circle className="cls-2" cx="439.56" cy="343.82" r="212.27" />
            <g>
              <g id="ventilador1_graphic">
                <path
                  className="cls-1"
                  d="M408.57,469.48c-6.17-27.18-3.57-50.17-.9-63.86,7.36,1.45,14.72,2.9,22.08,4.35-.85,12.16-.4,28.67,5.1,47.01,12.73,42.45,44.03,66.62,58.89,76.32,21.39-6.15,41.28-15.82,59.01-28.35-16.08-3.78-44.4-13.1-70.48-37.31-20.42-18.97-31.24-39.42-36.75-52.23,6.9-2.95,13.79-5.9,20.69-8.86,6.15,10.53,15.83,23.9,30.72,35.95,34.47,27.9,74,30.19,91.71,29.82,13.97-16.23,25.33-34.77,33.45-54.96-15.63,5.54-44.32,12.91-79.1,6.75-27.45-4.86-47.63-16.18-59.2-23.95,4.19-6.22,8.39-12.44,12.58-18.66,10.88,5.51,26.26,11.49,45.3,13.54,43.67,4.7,77.86-14.38,92.78-24.39,1.19-8.77,1.82-17.73,1.82-26.83,0-12.09-1.09-23.92-3.18-35.41-10.05,13.2-29.99,35.08-62.45,48.99-25.62,10.98-48.7,12.57-62.65,12.42.1-7.5.19-15,.29-22.51,12.12-1.36,28.27-4.78,45.31-13.5,39.96-20.44,58.03-56.25,64.68-72.33-8.92-19.38-20.9-37.07-35.31-52.44-1.21,16.21-5.97,46.32-26.55,76.42-15.73,23.01-34.36,36.74-46.21,44.09-3.94-6.38-7.88-12.77-11.83-19.15,9.5-7.65,21.29-19.2,31-35.7,23.45-39.86,18.54-81.02,15.53-97.24-16.44-10.47-34.53-18.57-53.8-23.83,6.49,14.41,17.19,43.95,12.97,81.39-3.12,27.7-13.15,48.55-20.18,60.59-6.47-3.79-12.94-7.59-19.42-11.38,4.81-11.2,9.82-26.93,10.67-46.06,1.96-44.21-19.57-77.31-30.42-91.39-1.86-.05-3.73-.08-5.61-.08-19.88,0-39.08,2.96-57.17,8.43,13.56,8.7,38.05,27.36,54.8,60.19,12.66,24.83,15.79,47.76,16.56,61.68-7.49.4-14.98.8-22.47,1.21-2.16-12-6.65-27.89-16.49-44.32-22.81-38.09-59.2-53.82-75.94-59.55-19.72,11.74-37.21,26.82-51.7,44.46,15.29-.68,47.58.1,81.63,18.7,24.46,13.36,39.98,30.53,48.47,41.59-5.96,4.56-11.92,9.12-17.88,13.67-8.55-8.69-21.22-19.27-38.61-27.29-43.31-19.96-84.99-9.79-99.71-5.35-9.47,20.17-15.63,42.21-17.76,65.41,12.38-10.15,40.62-30.2,78.83-33.59,22.93-2.03,48.48,6.16,60.59,9.96-.55,6.87-7.75,9.73-8.3,16.6-11.37-1.85-25.92-2.74-42.33,0-46.02,7.68-76.35,40.07-87.58,53.85,3.28,22.59,10.39,43.94,20.65,63.37,7.5-20.52,30.99-74.17,80.22-87.35,5.99-1.6,12.76-2.71,20.33-2.91,2.95,6.23,5.91,12.46,8.86,18.69-10.78,4.09-23.83,10.59-36.67,21.15-34.9,28.7-45.02,68.27-48.16,86.58,14.35,16.77,31.46,31.1,50.63,42.29-3.05-16.69-5.41-44.84,5.07-76.69,8.72-26.47,22.8-44.84,32.14-55.19,5.56,5.04,11.12,10.07,16.68,15.11-7,9.98-15.12,24.36-19.86,42.91-10.32,40.39,1.79,75.39,9.7,92.69,17.6,5.15,36.22,7.93,55.49,7.93,2.45,0,4.89-.06,7.32-.15-11.07-11.94-29.83-35.87-37.89-71.33Z"
                />
                <circle className="cls-3" cx="440.39" cy="343.82" r="75.53" />
              </g>
              <circle className="cls-2" cx="919.96" cy="343.82" r="212.27" />
              <g id="ventilador2_graphic">
                <path
                  className="cls-1"
                  d="M888.97,469.48c-6.17-27.18-3.57-50.17-.9-63.86,7.36,1.45,14.72,2.9,22.08,4.35-.85,12.16-.4,28.67,5.1,47.01,12.73,42.45,44.03,66.62,58.89,76.32,21.39-6.15,41.28-15.82,59.01-28.35-16.08-3.78-44.4-13.1-70.48-37.31-20.42-18.97-31.24-39.42-36.75-52.23,6.9-2.95,13.79-5.9,20.69-8.86,6.15,10.53,15.83,23.9,30.72,35.95,34.47,27.9,74,30.19,91.71,29.82,13.97-16.23,25.33-34.77,33.45-54.96-15.63,5.54-44.32,12.91-79.1,6.75-27.45-4.86-47.63-16.18-59.2-23.95,4.19-6.22,8.39-12.44,12.58-18.66,10.88,5.51,26.26,11.49,45.3,13.54,43.67,4.7,77.86-14.38,92.78-24.39,1.19-8.77,1.82-17.73,1.82-26.83,0-12.09-1.09-23.92-3.18-35.41-10.05,13.2-29.99,35.08-62.45,48.99-25.62,10.98-48.7,12.57-62.65,12.42.1-7.5.19-15,.29-22.51,12.12-1.36,28.27-4.78,45.31-13.5,39.96-20.44,58.03-56.25,64.68-72.33-8.92-19.38-20.9-37.07-35.31-52.44-1.21,16.21-5.97,46.32-26.55,76.42-15.73,23.01-34.36,36.74-46.21,44.09-3.94-6.38-7.88-12.77-11.83-19.15,9.5-7.65,21.29-19.2,31-35.7,23.45-39.86,18.54-81.02,15.53-97.24-16.44-10.47-34.53-18.57-53.8-23.83,6.49,14.41,17.19,43.95,12.97,81.39-3.12,27.7-13.15,48.55-20.18,60.59-6.47-3.79-12.94-7.59-19.42-11.38,4.81-11.2,9.82-26.93,10.67-46.06,1.96-44.21-19.57-77.31-30.42-91.39-1.86-.05-3.73-.08-5.61-.08-19.88,0-39.08,2.96-57.17,8.43,13.56,8.7,38.05,27.36,54.8,60.19,12.66,24.83,15.79,47.76,16.56,61.68-7.49.4-14.98.8-22.47,1.21-2.16-12-6.65-27.89-16.49-44.32-22.81-38.09-59.2-53.82-75.94-59.55-19.72,11.74-37.21,26.82-51.7,44.46,15.29-.68,47.58.1,81.63,18.7,24.46,13.36,39.98,30.53,48.47,41.59-5.96,4.56-11.92,9.12-17.88,13.67-8.55-8.69-21.22-19.27-38.61-27.29-43.31-19.96-84.99-9.79-99.71-5.35-9.47,20.17-15.63,42.21-17.76,65.41,12.38-10.15,40.62-30.2,78.83-33.59,22.93-2.03,48.48,6.16,60.59,9.96-.55,6.87-7.75,9.73-8.3,16.6-11.37-1.85-25.92-2.74-42.33,0-46.02,7.68-76.35,40.07-87.58,53.85,3.28,22.59,10.39,43.94,20.65,63.37,7.5-20.52,30.99-74.17,80.22-87.35,5.99-1.6,12.76-2.71,20.33-2.91,2.95,6.23,5.91,12.46,8.86,18.69-10.78,4.09-23.83,10.59-36.67,21.15-34.9,28.7-45.02,68.27-48.16,86.58,14.35,16.77,31.46,31.1,50.63,42.29-3.05-16.69-5.41-44.84,5.07-76.69,8.72-26.47,22.8-44.84,32.14-55.19,5.56,5.04,11.12,10.07,16.68,15.11-7,9.98-15.12,24.36-19.86,42.91-10.32,40.39,1.79,75.39,9.7,92.69,17.6,5.15,36.22,7.93,55.49,7.93,2.45,0,4.89-.06,7.32-.15-11.07-11.94-29.83-35.87-37.89-71.33Z"
                />
                <circle className="cls-3" cx="920.79" cy="343.82" r="75.53" />
              </g>
            </g>
            <rect
              className="cls-3"
              x="84.62"
              y="171.43"
              width="86.18"
              height="86.18"
            />
            <rect
              className="cls-3"
              x="84.62"
              y="272.78"
              width="86.18"
              height="86.18"
            />
            <rect
              className="cls-3"
              x="75.04"
              y="403.25"
              width="128.48"
              height="128.48"
            />
            <rect
              className="cls-3"
              x="58.28"
              y="378.12"
              width="26.33"
              height="26.33"
            />
            <rect
              className="cls-3"
              x="67.06"
              y="516.17"
              width="26.33"
              height="26.33"
            />
            <rect
              id="light_gc1"
              className="cls-2"
              x="331.2"
              y="633.48"
              width="47.88"
              height="9.58"
            />
            <rect
              id="light_gc2"
              className="cls-2"
              x="398.24"
              y="633.48"
              width="340.75"
              height="9.58"
            />
            <circle
              id="circle_gc"
              className="cls-2"
              cx="128.11"
              cy="114.77"
              r="12.37"
            />
          </svg>
        </div>
        <div
          id="cpu_cooler"
          onMouseEnter={() => handleMouseEnter(10)}
          onMouseLeave={handleMouseLeave}
        >
          {/* CPU COOLER */}
          <svg
            id="cpu_cooler2"
            className="item"
            data-name="Cpu cooler"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1041 958"
          >
            <rect
              className="cls-1"
              x="84.31"
              y="41.89"
              width="873.53"
              height="873.53"
              rx="24.51"
              ry="24.51"
            />
            <circle className="cls-2" cx="525.97" cy="472.18" r="415.67" />
            <path
              id="ventilador_cooler"
              className="cls-1"
              d="M912.79,437.2c-1.42-16.96-4.15-30.87-6.36-40.34-4.18-8.97-9.26-13.38-14.31-15.31-24.12-9.23-50.59,35.88-128.69,63.01-25.28,8.78-62.91,19.27-117.8,10.08-1.43-6.13-2.86-12.25-4.29-18.38,14.82-5.57,35.71-14.32,59.48-27.46,56.23-31.09,88.17-64.44,100.08-77.64,32.66-36.22,38.6-52.71,39.01-65.32.12-3.66.37-11.97-2.13-21.51-6.65-16.18-19.76-42.03-44.86-66.31-34.79-33.66-73.13-45.48-91.35-49.82-7.15-.56-11.88.99-14.47,2.45-22.52,12.66-4.73,61.84-33.76,139.26-9.4,25.06-25.37,60.7-67.52,97.06-5.63-2.81-11.25-5.63-16.88-8.44,5.18-14.96,11.8-36.62,16.88-63.3,12.01-63.11,6.77-109,4.22-126.6-6.99-48.27-15.89-63.37-25.32-71.74-2.65-2.35-8.6-7.59-17.11-11.71-8.99-.61-18.06-.95-27.2-.95-42.92,0-84.22,6.88-122.9,19.55-3.08,3.27-5,6.51-6.14,9.62-9.98,27.33,39.13,48.2,68.83,127.27,9.61,25.6,21.1,64.11,11.25,124.35-6.66,2.54-13.31,5.08-19.97,7.62-6.1-14.93-15.66-35.84-30-59.09-33.94-55.02-70.28-83.69-84.67-94.25-39.46-28.97-57.41-32.59-71.11-30.95-2.95.35-8.69,1.05-15.68,3.11-42.34,39.86-75.87,88.95-97.36,144.08.62,6.79,2.55,11.74,5.1,15.36,16.78,23.77,61.9-4.71,143.81,15.92,26.52,6.68,64.72,19.17,108.62,61.58-1.7,6.92-3.41,13.84-5.11,20.75-15.74-3.49-38.37-7.54-65.66-9-64.55-3.44-108.82,10.1-125.69,15.91-46.28,15.93-59.49,28.62-65.94,40.81-4.03,7.6-9.17,18.65-10.22,41.51-2.14,46.99,14.02,87.87,29.42,116,11.18,13.63,20.67,18.34,28.36,19.06,28.97,2.71,36.67-50.1,105.6-98.91,22.31-15.8,56.65-36.7,117.41-42.49,4.15,5.79,8.3,11.58,12.45,17.38-12.89,9.69-30.68,24.25-49.53,44.04-44.59,46.81-63.08,89.24-69.64,105.84-17.99,45.52-16.93,63.8-11.87,76.64,2.23,5.64,8.74,22.14,24.9,34.75,8.72,6.81,16.5,10.74,21.01,12.69,47.55,20.5,120.75,52.05,141.56,28.26,17.05-19.49-18.91-55.92-17.68-143.61.38-27.34,3.73-67.39,34.87-119.89,7.12.06,14.25.12,21.37.18.23,16.13,1.51,39.08,6.39,65.97,11.54,63.6,34.92,103.55,44.46,118.64,26.18,41.36,41.57,51.28,54.92,54.75,15.22,3.96,27.69,2.78,42.75.37,45.01-7.21,76.02-31.56,86.72-40.69,15.63-13.32,66.02-56.27,55.27-86.24-9.46-26.39-56.87-15.25-129.69-60.93-22.68-14.22-54.4-37-81.6-85.57,3.88-4.95,7.76-9.9,11.65-14.85,13.62,8.07,33.52,18.89,58.64,29.2,59.44,24.39,105.44,28.43,123.2,29.45,38.72,2.23,58.15,1.36,75.35-10.46,48.69-33.47,41.07-124.81,38.9-150.76Z"
            />
            <circle
              id="rodona_cooler"
              className="cls-3"
              cx="523.18"
              cy="470.21"
              r="118.16"
            />
            <circle className="cls-14" cx="521.07" cy="478.65" r="333.81" />
            <circle className="cls-14" cx="521.07" cy="478.65" r="229.32" />
            <polygon
              className="cls-1"
              points="832.55 43.14 856.31 23.13 947.61 23.13 977 52.52 977 143.19 957.61 169.46 832.55 43.14"
            />
            <polygon
              className="cls-1"
              points="85.26 167.58 65.25 143.82 65.25 52.52 94.64 23.13 185.32 23.13 211.58 42.51 85.26 167.58"
            />
            <polygon
              className="cls-1"
              points="208.45 913.61 184.69 933.62 93.39 933.62 64 904.23 64 813.56 83.39 787.29 208.45 913.61"
            />
            <polygon
              className="cls-1"
              points="954.49 790.42 974.5 814.18 974.5 905.48 945.11 934.87 854.43 934.87 828.17 915.49 954.49 790.42"
            />
            <circle
              id="R.2_cooler"
              className="cls-2"
              cx="907.27"
              cy="84.51"
              r="27.19"
            />
            <circle
              id="R.1_cooler"
              className="cls-2"
              cx="137.58"
              cy="84.51"
              r="27.19"
            />
            <circle
              id="R.3_cooler"
              className="cls-2"
              cx="137.58"
              cy="860.3"
              r="27.19"
            />
            <circle
              id="R.4_cooler"
              className="cls-2"
              cx="907.27"
              cy="860.3"
              r="27.19"
            />
          </svg>
        </div>
        <div
          id="motherboard"
          onMouseEnter={() => handleMouseEnter(11)}
          onMouseLeave={handleMouseLeave}
        >
          {/* MOTHERBOARD */}
          <svg
            id="motherboard2"
            className="item"
            data-name="motherboard"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1265 1393"
          >
            <g>
              <rect
                className="cls-5"
                x="73.94"
                y="45.3"
                width="1165.95"
                height="1303.3"
                rx="62.6"
                ry="62.6"
              />
              <g>
                <rect
                  className="cls-7"
                  x="542.1"
                  y="343.28"
                  width="329.74"
                  height="329.74"
                  rx="21.28"
                  ry="21.28"
                />
                <circle className="cls-5" cx="708.81" cy="505.71" r="156.9" />
                <g id="ventilador_board">
                  <path
                    className="cls-7"
                    d="M854.83,492.5c-.53-6.4-1.57-11.65-2.4-15.23-1.58-3.38-3.5-5.05-5.4-5.78-9.11-3.49-19.1,13.54-48.58,23.79-9.54,3.32-23.75,7.27-44.47,3.8-.54-2.31-1.08-4.62-1.62-6.94,5.59-2.1,13.48-5.41,22.45-10.37,21.22-11.73,33.28-24.32,37.78-29.31,12.33-13.67,14.57-19.9,14.72-24.66.05-1.38.14-4.52-.8-8.12-2.51-6.11-7.46-15.86-16.93-25.03-13.13-12.7-27.61-17.17-34.48-18.81-2.7-.21-4.48.37-5.46.92-8.5,4.78-1.78,23.34-12.74,52.57-3.55,9.46-9.58,22.91-25.49,36.64-2.12-1.06-4.25-2.12-6.37-3.19,1.96-5.65,4.45-13.82,6.37-23.89,4.53-23.82,2.56-41.14,1.59-47.79-2.64-18.22-6-23.92-9.56-27.08-1-.89-3.25-2.87-6.46-4.42-3.39-.23-6.82-.36-10.27-.36-16.2,0-31.79,2.6-46.39,7.38-1.16,1.23-1.89,2.46-2.32,3.63-3.77,10.32,14.77,18.19,25.98,48.04,3.63,9.66,7.97,24.2,4.25,46.94-2.51.96-5.02,1.92-7.54,2.88-2.3-5.64-5.91-13.53-11.33-22.31-12.81-20.77-26.53-31.59-31.96-35.58-14.89-10.93-21.67-12.3-26.84-11.68-1.11.13-3.28.4-5.92,1.18-15.98,15.04-28.64,33.58-36.75,54.39.24,2.56.96,4.43,1.93,5.8,6.33,8.97,23.37-1.78,54.29,6.01,10.01,2.52,24.43,7.24,41,23.24-.64,2.61-1.29,5.22-1.93,7.83-5.94-1.32-14.48-2.85-24.79-3.4-24.37-1.3-41.08,3.81-47.45,6-17.47,6.01-22.45,10.8-24.89,15.41-1.52,2.87-3.46,7.04-3.86,15.67-.81,17.74,5.29,33.17,11.11,43.79,4.22,5.15,7.8,6.92,10.71,7.2,10.93,1.02,13.84-18.91,39.86-37.34,8.42-5.97,21.38-13.86,44.32-16.04,1.57,2.19,3.13,4.37,4.7,6.56-4.87,3.66-11.58,9.15-18.7,16.62-16.83,17.67-23.81,33.69-26.29,39.95-6.79,17.18-6.39,24.08-4.48,28.93.84,2.13,3.3,8.36,9.4,13.12,3.29,2.57,6.23,4.05,7.93,4.79,17.95,7.74,45.58,19.65,53.43,10.67,6.43-7.36-7.14-21.11-6.67-54.21.14-10.32,1.41-25.44,13.16-45.26,2.69.02,5.38.05,8.07.07.09,6.09.57,14.75,2.41,24.9,4.36,24.01,13.18,39.09,16.78,44.78,9.88,15.61,15.69,19.36,20.73,20.67,5.75,1.49,10.45,1.05,16.14.14,16.99-2.72,28.7-11.91,32.74-15.36,5.9-5.03,24.92-21.24,20.86-32.56-3.57-9.96-21.47-5.76-48.96-23-8.56-5.37-20.53-13.97-30.8-32.3,1.47-1.87,2.93-3.74,4.4-5.61,5.14,3.05,12.65,7.13,22.14,11.02,22.44,9.21,39.8,10.73,46.5,11.12,14.61.84,21.95.51,28.44-3.95,18.38-12.63,15.5-47.11,14.69-56.91Z"
                  />
                </g>
                <g id="rodona1">
                  <circle className="cls-7" cx="707.76" cy="504.96" r="44.6" />
                  <circle className="cls-22" cx="707.76" cy="504.96" r="44.6" />
                </g>
                <g id="R.21">
                  <circle className="cls-5" cx="852.75" cy="359.37" r="10.26" />
                </g>
                <g id="R.11">
                  <circle className="cls-5" cx="562.21" cy="359.37" r="10.26" />
                </g>
                <g id="R.31">
                  <circle className="cls-5" cx="562.21" cy="652.21" r="10.26" />
                </g>
                <g id="R.41">
                  <circle className="cls-5" cx="852.75" cy="652.21" r="10.26" />
                </g>
              </g>
              <g>
                <rect
                  className="cls-7"
                  x="1108.72"
                  y="100.34"
                  width="57.26"
                  height="785"
                  rx="20.38"
                  ry="20.38"
                />
                <rect
                  className="cls-6"
                  x="1128.54"
                  y="136.69"
                  width="17.62"
                  height="712.29"
                />
              </g>
              <g>
                <rect
                  className="cls-7"
                  x="1041.55"
                  y="100.34"
                  width="40.74"
                  height="785"
                  rx="18.5"
                  ry="18.5"
                />
                <rect
                  className="cls-6"
                  x="1055.65"
                  y="136.69"
                  width="12.54"
                  height="712.29"
                />
              </g>
              <g>
                <rect
                  className="cls-7"
                  x="720.96"
                  y="639.27"
                  width="40.74"
                  height="681"
                  rx="18.5"
                  ry="18.5"
                  transform="translate(1721.11 238.44) rotate(90)"
                />
                <rect
                  className="cls-6"
                  x="735.07"
                  y="670.81"
                  width="12.54"
                  height="617.93"
                  transform="translate(1721.11 238.44) rotate(90)"
                />
              </g>
              <g>
                <rect
                  className="cls-7"
                  x="464.09"
                  y="1023.82"
                  width="40.74"
                  height="167.38"
                  rx="18.5"
                  ry="18.5"
                  transform="translate(1591.97 623.05) rotate(90)"
                />
                <rect
                  className="cls-6"
                  x="478.19"
                  y="1031.57"
                  width="12.54"
                  height="151.88"
                  transform="translate(1591.97 623.05) rotate(90)"
                />
              </g>
              <g>
                <rect
                  className="cls-7"
                  x="464.09"
                  y="1116.32"
                  width="40.74"
                  height="167.38"
                  rx="18.5"
                  ry="18.5"
                  transform="translate(1684.47 715.55) rotate(90)"
                />
                <rect
                  className="cls-6"
                  x="478.19"
                  y="1124.07"
                  width="12.54"
                  height="151.88"
                  transform="translate(1684.47 715.55) rotate(90)"
                />
              </g>
              <circle className="cls-7" cx="679.89" cy="1159.73" r="57.26" />
              <rect
                className="cls-7"
                x="785.37"
                y="1047.22"
                width="236.34"
                height="222.93"
                rx="36.1"
                ry="36.1"
              />
              <rect
                className="cls-6"
                x="311.71"
                y="158.19"
                width="66.07"
                height="66.07"
              />
              <rect
                className="cls-6"
                x="311.71"
                y="291.43"
                width="77.08"
                height="66.07"
              />
              <rect
                className="cls-6"
                x="311.71"
                y="416.97"
                width="77.08"
                height="66.07"
              />
              <g>
                <circle
                  id="circle_board1"
                  className="cls-6"
                  cx="488.21"
                  cy="382.94"
                  r="24"
                />
                <circle
                  id="circle_board2"
                  className="cls-6"
                  cx="488.21"
                  cy="465.85"
                  r="24"
                />
                <circle
                  id="circle_board3"
                  className="cls-6"
                  cx="488.21"
                  cy="548.76"
                  r="24"
                />
                <circle
                  id="circle_board4"
                  className="cls-6"
                  cx="488.21"
                  cy="631.67"
                  r="24"
                />
              </g>
              <ellipse
                className="cls-5"
                cx="27.68"
                cy="928.04"
                rx="18.68"
                ry="42.95"
              />
              <rect
                className="cls-7"
                x="23.83"
                y="885.1"
                width="142.05"
                height="85.89"
              />
              <rect
                className="cls-7"
                x="45.85"
                y="727.63"
                width="162.97"
                height="121.13"
              />
              <rect
                className="cls-7"
                x="70.08"
                y="602.09"
                width="107.92"
                height="104.61"
              />
              <path className="cls-4" d="M97.61,632.93h-27.53,27.53Z" />
              <path className="cls-4" d="M97.61,671.47h-27.53,27.53Z" />
              <g>
                <rect
                  className="cls-7"
                  x="46.95"
                  y="436.92"
                  width="96.9"
                  height="106.81"
                />
                <line
                  className="cls-111"
                  x1="95.4"
                  y1="402.78"
                  x2="95.4"
                  y2="449.03"
                />
                <line
                  className="cls-111"
                  x1="95.4"
                  y1="578.97"
                  x2="95.4"
                  y2="532.72"
                />
                <line
                  className="cls-111"
                  x1="57.96"
                  y1="571.71"
                  x2="94.3"
                  y2="571.16"
                />
              </g>
              <g>
                <rect
                  className="cls-7"
                  x="46.95"
                  y="183.87"
                  width="96.9"
                  height="148.87"
                />
                <line
                  className="cls-111"
                  x1="95.4"
                  y1="136.3"
                  x2="95.4"
                  y2="200.76"
                />
                <line
                  className="cls-111"
                  x1="57.96"
                  y1="142.81"
                  x2="94.3"
                  y2="143.57"
                />
                <line
                  className="cls-111"
                  x1="95.4"
                  y1="381.86"
                  x2="95.4"
                  y2="317.4"
                />
                <line
                  className="cls-111"
                  x1="57.96"
                  y1="375.35"
                  x2="94.3"
                  y2="374.58"
                />
              </g>
            </g>
            <path
              id="light_board"
              className="cls-33"
              d="M73,1050.5h77c12.43,0,22.5,10.07,22.5,22.5v164c0,12.43,10.07,22.5,22.5,22.5h73c12.43,0,22.5-10.07,22.5-22.5v-319c0-12.43,10.07-22.5,22.5-22.5h613c12.43,0,22.5-10.07,22.5-22.5h0c0-12.43-10.07-22.5-22.5-22.5H313c-12.43,0-22.5-10.07-22.5-22.5v-1c0-12.43,10.07-22.5,22.5-22.5h612c12.43,0,22.5-10.07,22.5-22.5V245c0-12.43-10.07-22.5-22.5-22.5h-431c-12.43,0-22.5-10.07-22.5-22.5v-4c0-12.43,10.07-22.5,22.5-22.5h433c12.43,0,22.5-10.07,22.5-22.5v-21c0-12.43-10.07-22.5-22.5-22.5l-854.5,3"
            />
          </svg>
        </div>

        <section className="center">
          {hoveredIndex !== null ? (
            <span className="text-primary text-4xl font-bold">
              {categoriesName[hoveredIndex]}
            </span>
          ) : (
            <svg
              id="Layer_1"
              data-name="Layer 1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1908 576"
              className="h-auto w-full max-w-lg"
            >
              <defs>
                <style>{`
              .font-semi-bold {
                font-family: Montserrat-SemiBold, Montserrat;
                font-size: 295.6px;
                font-weight: 600;
              }
              .fill-black, .font-light, .no-stroke {
                fill: #000;
              }
              .font-light {
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
              .no-stroke {
                stroke-width: 0px;
              }
            `}</style>
              </defs>
              <g>
                <path
                  className="no-stroke"
                  d="M401.14,102.49c-39.61-39.61-91.52-59.41-143.43-59.41l.45,202.84"
                />
                <path
                  className="no-stroke"
                  d="M469,252.29c0-56.01-22.7-106.72-59.41-143.43l-143.11,143.75"
                />
                <path
                  className="no-stroke"
                  d="M102.91,414.49c39.61,39.61,91.52,59.41,143.43,59.41l-.45-202.84"
                />
                <path
                  className="no-stroke"
                  d="M35.95,262.88c0,56.01,22.7,106.72,59.41,143.43l143.11-143.75"
                />
                <path
                  className="no-stroke"
                  d="M94.88,108.23c-39.61,39.61-59.41,91.52-59.41,143.43l202.84-.45"
                />
                <path
                  className="no-stroke"
                  d="M246.49,41.27c-56.01,0-106.72,22.7-143.43,59.41l143.75,143.11"
                />
              </g>
              <text
                className="font-semi-bold"
                transform="translate(231.47 473.26)"
              >
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
              <text className="font-light" transform="translate(528.29 246.07)">
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
          )}
        </section>
      </div>
    </section>
  );
};

export default Categories;
