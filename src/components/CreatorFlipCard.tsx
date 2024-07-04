import "../styles/creatorflipcard.css"


const CreatorFlipCard = ({name, foto, descripcion}) => {
    
    return(

    <div className="m-11 flip-card creator-flip-card w-48 h-72 bg-transparent perspective-1000 font-sans cursor-pointer">
      <div className="flip-card-inner relative w-full h-full text-center transition-transform duration-700">
        <div className="flip-card-front creator-flip-card-front absolute flex flex-col justify-between w-full h-full bg-white shadow-md">
            <div className="creator-foto-container">
                <img className="creator-foto" src={foto} alt="" />
            </div>
          <div className="creator-name-container">
            <p>{name}</p>
          </div>
        </div>
        <div className="flip-card-back creator-flip-card-back absolute flex flex-col justify-between w-full h-full bg-white shadow-md transform rotate-y-180">
            <div className="creator-description-container">
                <p>{descripcion}</p>
            </div>
        </div>
      </div>
    </div>

    );

};


export default CreatorFlipCard;