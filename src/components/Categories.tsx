import Case from "../assets/categories/case.svg";
import CaseFan from "../assets/categories/case_fan.svg";
import Cpu from "../assets/categories/cpu.svg";
import CpuCooler from "../assets/categories/cpu_cooler.svg";
import External from "../assets/categories/external_hard_drive.svg";
import GraphicCard from "../assets/categories/graphic_card.svg";
import Internal from "../assets/categories/internal_hard_drive.svg";
import Logo from "../assets/categories/logoPortions.svg";
import Monitor from "../assets/categories/monitor.svg";
import Motherboard from "../assets/categories/motherboard.svg";
import OpticalDrive from "../assets/categories/optical_drive.svg";
import PowerSupply from "../assets/categories/power_supply.svg";
import Ram from "../assets/categories/ram.svg";

const Categories = () => {
  return (
    <section id="components">
      <div className="container">
        <div>
          <img src={Cpu} alt="" />
        </div>
        <div>
          <img src={Case} alt="CPU Icon" />
        </div>
        <div>
          <img src={PowerSupply} alt="CPU Icon" />
        </div>
        <div>
          <img src={Internal} alt="CPU Icon" />
        </div>
        <div>
          <img src={Monitor} alt="CPU Icon" />
        </div>
        <div>
          <img src={External} alt="CPU Icon" />
        </div>
        <div>
          <img src={OpticalDrive} alt="CPU Icon" />
        </div>
        <div>
          <img src={CaseFan} alt="CPU Icon" />
        </div>
        <div>
          <img src={Ram} alt="CPU Icon" />
        </div>
        <div>
          <img src={GraphicCard} alt="CPU Icon" />
        </div>
        <div>
          <img src={CpuCooler} alt="CPU Icon" />
        </div>
        <div>
          <img src={Motherboard} alt="CPU Icon" />
        </div>
        <section className="categories-logo-container">
          <img className="w-72" src={Logo} alt="" />
        </section>
      </div>
    </section>
  );
};

export default Categories;
