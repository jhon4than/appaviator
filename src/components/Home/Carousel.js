import React from "react";
import "./Carousel.css";
import pixIcon from "../../assets/pix.png"; // Caminho para a imagem do Pix

const Carousel = ({ items }) => {
  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        {items.map((item, index) => (
          <div key={index} className="carousel-item">
            <div className="carousel-item-content"></div>
            <div className="carousel-item">
              <img src={pixIcon} alt="Pix" className="carousel-item-logo" />
              <span className="carousel-item-name">{item.name}</span>
              <span className="carousel-item-amount">
                - Recebeu {item.amount} no {item.game}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
