import React, { useState, useEffect } from "react";
import "./Mines.css"; // Certifique-se de adicionar o caminho correto para o seu arquivo CSS
import { useNavigate } from "react-router-dom";
import { FaCircle, FaStar } from "react-icons/fa";
import HeaderLogo from "../Home/headerLogo";
// Certifique-se de que as imagens estejam corretamente importadas
import backgroundImg from "../../assets/img05.jpg";
import logoImg from "../../assets/logomines.png";

function Mines() {
  const [countdown, setCountdown] = useState("00:00");
  const [isSinalHacked, setIsSinalHacked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [webUrl, setWebUrl] = useState(
    "https://hudsbet.cxclick.com/visit/?bta=35160&brand=hudsbet"
  );
  const [cards, setCards] = useState(Array(25).fill("circle"));
  const [isHacking, setIsHacking] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  // Refatoração da função de geração de tabuleiro
  const generateBoard = () => {
    try {
      const board = new Array(25).fill("circle");
      const totalItems = { mines: 0, stars: 0 };
      while (totalItems.mines < 3 || totalItems.stars < 5) {
        const position = Math.floor(Math.random() * 25);
        if (totalItems.mines < 3 && board[position] === "circle") {
          board[position] = "mine";
          totalItems.mines++;
        } else if (totalItems.stars < 5 && board[position] === "circle") {
          board[position] = "star";
          totalItems.stars++;
        }
      }
      return board;
    } catch (err) {
      setError(err.toString()); // Armazena o erro no estado
    }
  };

  const startCountdown = () => {
    try {
      let totalTime = 180;
      const intervalId = setInterval(() => {
        const minutes = String(Math.floor(totalTime / 60)).padStart(2, "0");
        const seconds = String(totalTime % 60).padStart(2, "0");

        setCountdown(`${minutes}:${seconds}`);
        totalTime--;

        if (totalTime < 0) {
          clearInterval(intervalId);
          setCountdown("00:00");
          setIsSinalHacked(false);
          setCards(Array(25).fill("circle"));
        }
      }, 1000);

      // Armazenar o ID do intervalo no estado
      setIntervalId(intervalId);
    } catch (err) {
      setError(err.toString()); // Armazena o erro no estado
    }
  };

  const handleHackClick = () => {
    try {
      setIsLoading(true);
      setIsHacking(true);
      setTimeout(() => {
        setCards(generateBoard());
        setIsSinalHacked(true);
        setIsHacking(false);
        setIsLoading(false);
        startCountdown();
      }, 5000);
    } catch (err) {
      setError(err.toString()); // Armazena o erro no estado
    }
  };

  // Refatoração da renderização do cartão
  const renderCard = (card, index) => {
    const cardClass = card === "star" ? "star" : "circle";
    return (
      <div key={index} className={`card ${cardClass}`}>
        {card === "star" ? (
          <FaStar color="#FFD700" size={30} />
        ) : (
          <FaCircle color="#87CEEB" size={30} />
        )}
      </div>
    );
  };

  // Renderização condicional baseada na existência de um erro
  if (error) {
    return <div className="error">{error}</div>; // Exibe o erro na tela
  }

  return (
    <div className="background">
      <div className="container">
        <HeaderLogo />
        <img src={logoImg} alt="Logo" className="mines-logo" />
        <div className="info-container">
          <div className="text-box">🎮: Tentativas: 3</div>
          <div className="text-box">💥: 3 minas</div>
          <div className="text-box">⏱: Válido por {countdown}</div>
        </div>
        <div className="cards-container">{cards.map(renderCard)}</div>
        <button
          className="hack-button"
          onClick={handleHackClick}
          disabled={isSinalHacked || isHacking}
        >
          {isHacking ? (
            <>
              Hackeando Sinal Aguarde...
              <span className="spinner-container">
                <div className="spinner"></div>
              </span>
            </>
          ) : isSinalHacked ? (
            "SINAL HACKEADO"
          ) : (
            "HACKEAR SINAL"
          )}
        </button>
        <iframe src={webUrl} title="Conteúdo Web" className="web-view" />
      </div>
    </div>
  );
}

export default Mines;
