import Footer from "../components/Footer";
import InfoTecnologies from "../components/InfoTecnologies";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Navbar2 from "../components/NavBar2";
import ProjectInfoContent from "../components/ProjectInfoContent";
// TODO DISSENY

const ProjectInfo = () => {
  return (
    <>
      <Navbar2 />
      <LanguageSwitcher />
      <ProjectInfoContent />
      <InfoTecnologies />
      <Footer />
    </>
  );
};

export default ProjectInfo;
