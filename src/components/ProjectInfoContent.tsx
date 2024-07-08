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
                <h3>HISTORIA DEL PROYECTO</h3>
                <p>AVX Components nació como el proyecto final de un bootcamp de
                    5 meses en tecnologías de programación web, parte de una FP dual
                    de formación y trabajo de Fundesplai. Este programa incluye tanto
                    la formación en el bootcamp como la parte laboral trabajando de la
                    mano de la empresa Onizea.
                    <br></br><br></br>
                    Empezamos el proyecto 6 meses antes de finalizar
                    este e-commerce, aplicando las habilidades adquiridas y dedicando tiempo adicional
                    para asegurar que nuestro proyecto refleje el mejor uso posible de estas tecnologías.</p>
            </div>
            <div className="info-informacion-container">
                <h3>INFORMACIÓN DEL PROYECTO</h3>
                <div className="info-informacion-bloques-container">
                    <p>Nuestro e-commerce, AVX Components, se enorgullece de ofrecer más de 10.000 productos,
                        organizados en 12 categorías para facilitar la navegación y selección. Nuestro catálogo
                        incluye una amplia variedad de componentes electrónicos y accesorios especializados,
                        diseñados para satisfacer las necesidades de nuestros clientes.
                        Nuestro objetivo principal es proporcionar una experiencia de compra completa y satisfactoria.
                        <br></br><br></br>
                        Nos esforzamos por presentar los mejores componentes disponibles en el mercado, garantizando la
                        calidad y el rendimiento de cada producto. Para ello, ofrecemos descripciones detalladas,
                        imágenes claras y especificaciones técnicas precisas.
                        En AVX Components, valoramos la opinión de nuestros clientes y estamos siempre dispuestos
                        a mejorar nuestros servicios basándonos en sus comentarios.
                        <br></br><br></br>
                        Nuestra plataforma es intuitiva
                        y fácil de usar, con múltiples opciones de búsqueda y filtros para encontrar rápidamente lo
                        que necesitan. En resumen, en AVX Components nos dedicamos a ofrecer una experiencia de compra
                        de primera clase, asegurando que nuestros clientes tengan acceso a productos de alta calidad y
                        a un servicio excepcional.</p>
                </div>
            </div>
        </div>
    );
}

export default ProjectInfoContent;