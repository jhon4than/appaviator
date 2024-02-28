import React, { useState, useEffect } from "react";
import "./Tiger.css"; // Certifique-se de que o caminho está correto
import HeaderLogo from "../Home/headerLogo";

function Tiger() {
  const [maxJogadas, setMaxJogadas] = useState(0);
  const [contador, setContador] = useState("03:00");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [entradaStatus, setEntradaStatus] = useState("🔐 POSSÍVEL FALHA 🔐");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [webUrl, setWebUrl] = useState(
    "https://hudsbet.cxclick.com/visit/?bta=35160&brand=hudsbet"
  );

  useEffect(() => {
    let intervalId;

    if (isTimerActive && contador !== "00:00") {
      intervalId = setInterval(() => {
        const [minutos, segundos] = contador.split(":").map(Number);
        if (segundos > 0) {
          setContador(
            `${minutos.toString().padStart(2, "0")}:${(segundos - 1)
              .toString()
              .padStart(2, "0")}`
          );
        } else if (minutos > 0) {
          setContador(`${(minutos - 1).toString().padStart(2, "0")}:59`);
        } else {
          setIsTimerActive(false);
          setContador("03:00");
          setIsButtonDisabled(false);
          setEntradaStatus("🔐 POSSÍVEL FALHA 🔐");
          clearInterval(intervalId);
        }
      }, 1000);
    } else if (contador === "00:00") {
      setIsTimerActive(false);
      setContador("03:00");
      setIsButtonDisabled(false);
      setEntradaStatus("🔐 POSSÍVEL FALHA 🔐");
    }

    return () => clearInterval(intervalId);
  }, [isTimerActive, contador]);

  // Dentro de um método ou função de componente React
  const getRandomNumber = () => {
    // Isso irá gerar 0 ou 1 aleatoriamente
    const randomIndex = Math.floor(Math.random() * 2);
    // Com base no índice aleatório, retorna 10 ou 30
    return randomIndex === 0 ? 10 : 30;
  };

  const handleHackearSinal = () => {
    setIsLoading(true);

    setTimeout(() => {
      const giros1 = Math.floor(Math.random() * (20 - 10 + 1) + 10);
      const giros2 = getRandomNumber();

      const statusMessage = `🎯 RODADA ENCONTRADA!
🟢 Iniciar: Agora
🔃 Alternar entre:
🎮 ${giros1} GIROS NO MANUAL
🚀 ${giros2} GIROS NO AUTOMÁTICO
`;

      setMaxJogadas(giros1 + giros2);
      setEntradaStatus(statusMessage.trim());
      setIsTimerActive(true);
      setIsLoading(false);
      setIsButtonDisabled(true);
    }, 9000);
  };

  return (
    <div className="tiger-background">
      <div className="tiger-container">
        <HeaderLogo />
        <img
          src={require("../../assets/logofortune.png")}
          alt="Logo"
          className="tiger-logo"
        />
        <div className="tiger-float-box">
          <p className="tiger-entrada-text">{entradaStatus}</p>
          {!isLoading && !isTimerActive && (
            <p className="tiger-info-text">🔥 Estamos analisando uma falha</p>
          )}
          {isLoading && (
            <p className="tiger-info-text">Analisando falha, aguarde...</p>
          )}
          <p className="tiger-info-text">⏰ Validade: {contador}</p>
        </div>
        <button
          className={`tiger-button ${
            isButtonDisabled ? "tiger-disabled-button" : ""
          }`}
          onClick={handleHackearSinal}
          disabled={isButtonDisabled}
        >
          Hackear Sinal
        </button>
        {isLoading && (
          <div className="tiger-loading">
            <span>O Robô está analisando uma entrada...</span>
          </div>
        )}
        <iframe src={webUrl} title="Conteúdo Web" className="tiger-webview" />
      </div>
    </div>
  );
}

export default Tiger;
