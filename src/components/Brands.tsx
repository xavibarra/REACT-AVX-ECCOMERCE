import { Component } from "react";

import amdLogo from "../assets/brand-logos/amd.png";
import asusLogo from "../assets/brand-logos/asus.png";
import corsairLogo from "../assets/brand-logos/corsair.png";
import crucialLogo from "../assets/brand-logos/crucial.png";
import cyrixLogo from "../assets/brand-logos/cyrix.png";
import epsonLogo from "../assets/brand-logos/epson.png";
import gigabyteLogo from "../assets/brand-logos/gigabyte.png";
import intelLogo from "../assets/brand-logos/intel.png";
import kingstonLogo from "../assets/brand-logos/kingston.png";
import montechLogo from "../assets/brand-logos/montech.png";
import msiLogo from "../assets/brand-logos/msi.png";
import nvideaLogo from "../assets/brand-logos/nvidea.svg";
import nzxtLogo from "../assets/brand-logos/nzxt.png";
import samsungLogo from "../assets/brand-logos/samsung.png";
import seagateLogo from "../assets/brand-logos/seagate.png";
import toshibaLogo from "../assets/brand-logos/toshiba.png";
import "../styles/animations.css";

// TODO no es veuren les ultimes marques
export default class Brands extends Component {
  render() {
    const brands = [
      {
        brand: "amd",
        logo: amdLogo,
        alt: "Logo de AMD",
      },
      {
        brand: "asus",
        logo: asusLogo,
        alt: "Logo de ASUS",
      },
      {
        brand: "corsair",
        logo: corsairLogo,
        alt: "Logo de Corsair",
      },
      {
        brand: "crucial",
        logo: crucialLogo,
        alt: "Logo de Crucial",
      },
      {
        brand: "epson",
        logo: epsonLogo,
        alt: "Logo de Epson",
      },
      {
        brand: "gigabyte",
        logo: gigabyteLogo,
        alt: "Logo de Gigabyte",
      },
      {
        brand: "intel",
        logo: intelLogo,
        alt: "Logo de Intel",
      },
      {
        brand: "kingston",
        logo: kingstonLogo,
        alt: "Logo de Kingston",
      },
      {
        brand: "montech",
        logo: montechLogo,
        alt: "Logo de Montech",
      },
      {
        brand: "msi",
        logo: msiLogo,
        alt: "Logo de MSI",
      },
      {
        brand: "nvidea",
        logo: nvideaLogo,
        alt: "Logo de Nvidia",
      },
      {
        brand: "nzxt",
        logo: nzxtLogo,
        alt: "Logo de NZXT",
      },
      {
        brand: "samsung",
        logo: samsungLogo,
        alt: "Logo de Samsung",
      },
      {
        brand: "seagate",
        logo: seagateLogo,
        alt: "Logo de Seagate",
      },
      {
        brand: "cyrix",
        logo: cyrixLogo,
        alt: "Logo de Cyrix",
      },
      {
        brand: "toshiba",
        logo: toshibaLogo,
        alt: "Logo de Toshiba",
      },
    ];

    return (
      <div className="relative w-full overflow-hidden h-[70px] bg-primary">
        <div className="carousel-track flex">
          {brands.map((brand, index) => (
            <div
              className="flex-shrink-0 flex-grow-0 w-auto h-[70px] flex items-center justify-center px-[25px] carousel-item"
              key={index}
            >
              <img
                className="h-full object-contain"
                src={brand.logo}
                alt={brand.alt}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}
