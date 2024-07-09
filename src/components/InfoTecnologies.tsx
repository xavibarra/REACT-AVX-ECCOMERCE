import "../styles/infoTecnologies.css";
import { FaCss3Alt, FaReact, FaNodeJs, FaTrello } from "react-icons/fa";
import { RiTailwindCssFill, RiSupabaseLine, RiFileExcel2Line } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { DiMysql } from "react-icons/di";
import { CgFigma } from "react-icons/cg";
import exp from "../assets/img/express.png";


function InfoTecnologies() {

    return (
        <>
            <div className="info-tecnologies-card">
                <div className="info-tecnologies-circle"></div>
                <div className="info-tecnologies-circle"></div>
                <div className="info-tecnologies-container">
                    <h3>Tecnologies Used</h3>
                    <div className="info-tecnologies-list-container">
                        <div className="info-tecnologies-pack-1">
                            <div className="info-tecnologies-tecnology-container">
                                <h4>FRONTEND</h4>
                                <div className="info-tecnologies-icons-container">
                                    <div className="info-tecnologies-icon-container">
                                        <FaCss3Alt className="info-tecnologies-ico" />
                                        <h5>CSS</h5>
                                    </div>
                                    <div className="info-tecnologies-icon-container">
                                        <RiTailwindCssFill className="info-tecnologies-ico" />
                                        <h5>Tailwind</h5>
                                    </div>
                                    <div className="info-tecnologies-icon-container">
                                        <SiTypescript className="info-tecnologies-ico" />
                                        <h5>TypeScript</h5>
                                    </div>
                                    <div className="info-tecnologies-icon-container">
                                        <FaReact className="info-tecnologies-ico" />
                                        <h5>React</h5>
                                    </div>
                                </div>
                            </div>
                        
                        
                            <div className="info-tecnologies-tecnology-container">
                                <h4>BACKEND</h4>
                                <div className="info-tecnologies-icons-container">
                                    <div className="info-tecnologies-icon-container">
                                        <FaNodeJs className="info-tecnologies-ico" />
                                        <h5>NodeJs</h5>
                                    </div>
                                    <div className="info-tecnologies-icon-container">
                                        <img className="express-ico" src={exp} alt="" />
                                        <h5>Express</h5>
                                    </div>
                                </div>
                            </div>
                            </div>
                        <div className="info-tecnologies-pack-2">
                            <div className="info-tecnologies-tecnology-container">
                                <h4>DATA BASE</h4>
                                <div className="info-tecnologies-icons-container">
                                    <div className="info-tecnologies-icon-container">
                                        <DiMysql className="info-tecnologies-ico" />
                                        <h5>MySQL</h5>
                                    </div>
                                    <div className="info-tecnologies-icon-container">
                                        <RiSupabaseLine className="info-tecnologies-ico" />
                                        <h5>SupaBase</h5>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="info-tecnologies-tecnology-container">
                                <h4>DESIGN</h4>
                                <div className="info-tecnologies-icons-container">
                                    <div className="info-tecnologies-icon-container">
                                        <CgFigma className="info-tecnologies-ico" />
                                        <h5>Figma</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="info-tecnologies-tecnology-container">
                                <h4>ORGANIZATION</h4>
                                <div className="info-tecnologies-icons-container">
                                    <div className="info-tecnologies-icon-container">
                                        <FaTrello className="info-tecnologies-ico" />
                                        <h5>Trello</h5>
                                    </div>
                                    <div className="info-tecnologies-icon-container">
                                        <RiFileExcel2Line className="info-tecnologies-ico" />
                                        <h5>Excel</h5>
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
            </div>
        </>
    );
}

export default InfoTecnologies;
