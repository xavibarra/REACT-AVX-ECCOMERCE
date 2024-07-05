import CreatorFlipCard from "./CreatorFlipCard";
import persona1 from "../assets/img/foto-ejemplo.jpg"
import persona2 from "../assets/img/foto-ejemplo-2.jpg"
import persona3 from "../assets/img/foto-ejemplo-3.jpg"
import "../styles/project-info.css"


const ProjectInfoContent = () => {

    const creators = [
        {
            name: 'Álvaro Monfort',
            foto: persona1,
            descripcion: 'asdasdads'
        },
        {
            name: 'Xavi Barrachina',
            foto: persona2,
            descripcion: 'asdasdads'
        },
        {
            name: 'Àlex Virgili',
            foto: persona3,
            descripcion: 'asdasdads'
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
                    />
                ))}
            </div>
            <div className="info-historia-container">
                <h3>HISTORIA DEL PROYECTO</h3>
                <p>AVX Components nació como el proyecto final de un bootcamp de
                    5 meses en tecnologías de programación web, parte de una FP dual
                    de formación y trabajo de Fundesplai. Este programa incluye tanto
                    la formación en el bootcamp como la parte laboral trabajando de la
                    mano de la empresa Onizea. Empezamos el proyecto 6 meses antes de finalizar
                    este e-commerce, aplicando las habilidades adquiridas y dedicando tiempo adicional
                    para asegurar que nuestro proyecto refleje el mejor uso posible de estas tecnologías.</p>
            </div>
            <div className="info-descripcion-container">
                <h3>DESCRIPCIÓN DEL PROYECTO</h3>
                <p>AVX Components es un e-commerce con más de 10.000 productos organizados en 12 categorías
                    de componentes. Nos hemos encargado de conseguir entre nuestros productos todos los mejores
                    que hay en el mercado, ofreciendo una plataforma ejemplar de cómo sería una página web de
                    venta de componentes de alta calidad.
                    </p>
            </div>
            <div className="info-tecnologias-container">
                <h3>TECNOLOGIAS UTILIZADAS</h3>
                <div className="info-tecnologias-lista-container">
                    <div className="info-tecnologias-lista-1-container">
                        <h4>FRONTEND</h4>
                        <ul>
                            <li>CSS</li>
                            <li>Tailwind</li>
                            <li>TypeScript</li>
                            <li>React</li>
                        </ul>
                    </div>
                    <div className="info-tecnologias-lista-2-container">
                    <h4>BACKEND</h4>
                        <ul>
                            <li>NodeJS</li>
                        </ul>
                        <h4>BASE DE DATOS</h4>
                        <ul>
                            <li>SQL</li>
                            <li>SupaBase</li>

                        </ul>
                    </div>
                    <div className="info-tecnologias-lista-3-container">
                    <h4>DISEÑOS</h4>
                        <ul>
                            <li>Figma</li>
                        </ul>
                        <h4>ORGANIZACIÓN</h4>
                        <ul>
                            <li>Trello</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="info-informacion-container">
                <h3>INFORMACIÓN DEL PROYECTO</h3>
                <div className="info-informacion-bloques-container">
                    <div className="info-que-es-container">
                        <h4>¿Qué es?</h4>
                        <p>Nuestro e-commerce AVX Components ofrece más de 10.000 productos,
                            organizados en 12 categorías. Nuestro objetivo es proporcionar a
                            nuestros clientes una experiencia de compra completa y satisfactoria,
                            presentando los mejores componentes disponibles en el mercado.</p>
                    </div>
                    <div className="info-caracteristicas-clave-container">
                        <h4>Características clave</h4>
                        <ul>
                            <li><p>- Amplia variedad de componentes</p></li>
                            <li><p>- Plataforma intuitiva y fàcil de usar</p></li>
                            <li><p>- Sistema de gestión de inventario eficiente</p></li>
                            <li><p>- Atención al cliente personalizada y soporte técnico</p></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProjectInfoContent;