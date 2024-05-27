import Cpu from "../assets/categories/cpu.svg";
import Case from "../assets/categories/case.svg";
import CaseFan from "../assets/categories/case_fan.svg";
import External from "../assets/categories/external_hard_drive.svg";
import Internal from "../assets/categories/internal_hard_drive.svg";
import GraphicCard from "../assets/categories/graphic_card.svg";
import Monitor from "../assets/categories/monitor.svg";
import OpticalDrive from "../assets/categories/optical_drive.svg";
import PowerSupply from "../assets/categories/power_supply.svg";
import Ram from "../assets/categories/ram.svg";
import CpuCooler from "../assets/categories/cpu_cooler.svg";
import Logo from "../assets/categories/logoPortions.svg";
import Motherboard from "../assets/categories/motherboard.svg";
// import { ReactComponent as Cpu } from "../assets/categories/cpu.svg";

const Categories = () => {
  return (
    <section id="components">
      <div className="container">
        <div>{/* <svg src={Cpu} alt="CPU Icon" /> */}</div>
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
        <div className="center">
          <p>ceneter</p>
        </div>
      </div>
    </section>
  );
};

export default Categories;
