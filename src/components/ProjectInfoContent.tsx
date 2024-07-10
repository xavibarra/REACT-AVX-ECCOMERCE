import CreatorFlipCard from "./CreatorFlipCard";
import persona1 from "../assets/img/foto-ejemplo.jpg";
import persona2 from "../assets/img/foto-ejemplo-2.jpg";
import persona3 from "../assets/img/foto-ejemplo-3.jpg";
import "../styles/project-info.css";

const ProjectInfoContent = () => {

    const creators = [
        {
            name: 'Álvaro Monfort',
            foto: persona1,
            descripcion: 'asdasdads',
            offer: true
        },
        {
            name: 'Xavi Barrachina',
            foto: persona2,
            descripcion: 'asdasdads',
            offer: true

        },
        {
            name: 'Àlex Virgili',
            foto: persona3,
            descripcion: 'asdasdads',
            offer: true
        },
    ]


    return (

        <div className="info-content-container">
            <div className="info-title-container">
                <h3>AVX COMPONENTS PROJECT</h3>
            </div>
            <div className="info-card-container">
                {creators.map((creator, index) => (
                    <CreatorFlipCard
                        key={index}
                        name={creator.name}
                        foto={creator.foto}
                        descripcion={creator.descripcion}
                        offer={creator.offer}
                    />
                ))}
            </div>
            <div className="info-historia-container">
                <h3>PROJECT INFORMATION</h3>
                <p>AVX Components was born as the final project of a bootcamp
                    5 months in web programming technologies, part of a dual FP
                    of training and work of Fundesplai. This program includes both
                    training in the bootcamp as well as the working part of the
                    hand of the Onizea company.
                    <br></br><br></br>
                    We started the project 1 month before finishing
                    this formation program, applying the acquired skills and dedicating additional time
                    to ensure that our project reflects the best possible use of these technologies.</p>
            </div>
            <div className="info-informacion-container">
                <h3>PROJECT HISTORY</h3>
                <div className="info-informacion-bloques-container">
                <p>Our e-commerce, AVX Components, is proud to offer more than 10,000 products,
                        organized into 12 categories for easy navigation and selection. Our catalog
                        includes a wide variety of specialized electronic components and accessories,
                        designed to meet the needs of our customers.
                        Our main goal is to provide a complete and satisfactory shopping experience.
                        <br></br><br></br>
                        We strive to present the best components available on the market, ensuring the
                        quality and performance of each product. For this, we offer detailed descriptions,
                        clear images and precise technical specifications.
                        At AVX Components, we value our customers' opinions and are always willing
                        to improve our services based on your comments.
                        <br></br><br></br>
                        Our platform is intuitive
                        and easy to use, with multiple search options and filters to quickly find what
                        what do you need. In short, at AVX Components we are dedicated to providing a great shopping experience.
                        first class, ensuring that our customers have access to high quality products and
                        to exceptional service.</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectInfoContent;