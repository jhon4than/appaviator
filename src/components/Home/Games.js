import React, { useState, useEffect } from "react";
import "./Games.css"; // Certifique-se de ter um arquivo CSS correspondente
import HeaderLogo from "../Home/headerLogo";
// Importe o componente de barra de progresso circular se estiver usando um de terceiros
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Games() {
  const [maxJogadas, setMaxJogadas] = useState(0);
  const [contador, setContador] = useState("03:00");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [entradaStatus, setEntradaStatus] = useState("🔐 POSSÍVEL FALHA 🔐");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [webUrl, setWebUrl] = useState(
    "https://primflix.bet"
  );
  const [probabilidadeVitoria, setProbabilidadeVitoria] = useState(null);
  const [hackSuccess, setHackSuccess] = useState(false);

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
          clearInterval(intervalId); // Limpar o intervalo quando o contador atingir "00:00"
        }
      }, 1000);
    } else if (isTimerActive && contador === "00:00") {
      // Caso o usuário não tenha clicado em "handleHackearSinal" e o timer tenha atingido "00:00"
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
      // Gera um número aleatório entre 1.00 e 5.00
      const giros1 = Math.random() * (5.0 - 1.0) + 1.0;
      // Arredonda para duas casas decimais
      const girosArredondado = giros1.toFixed(2);

      const statusMessage = `
      𝙅𝙊𝙂𝙊: ✈ AVIATOR ✈

      📲⚡Decolar até 5x a 10X hackeado
          
      🌪 Liberado até 3 tentativa
      `;

      setEntradaStatus(statusMessage.trim());
      setIsTimerActive(true);
      setIsLoading(false);
      setIsButtonDisabled(true);
      // Gera uma nova probabilidade de vitória
      let probabilidade =
        Math.random() < 0.9 ? Math.random() * 10 + 90 : Math.random() * 100;
      setProbabilidadeVitoria(Math.round(probabilidade));
      setIsLoading(false);
      setIsButtonDisabled(true);
      setIsTimerActive(true);
    }, 9000);
  };

  // Função modificada para retornar a cor baseada na probabilidade de vitória
  const getProbabilidadeColor = (probabilidade) => {
    if (probabilidade > 70) return "#00C851"; // verde
    if (probabilidade >= 45 && probabilidade <= 69) return "#ffbb33"; // laranja
    return "#ff4444"; // vermelho
  };

  // Função modificada para retornar a cor do texto baseada na probabilidade de vitória
  const getProbabilidadeTextColor = (probabilidade) => {
    if (probabilidade > 70) return "green"; // verde
    if (probabilidade >= 45 && probabilidade <= 69) return "orange"; // laranja
    return "red"; // vermelho
  };

  return (
    <div className="aviator-background">
      <div className="aviator-container">
        <HeaderLogo />
        <img
          src={require("../../assets/aviator (1).jpg")} // Certifique-se de ter uma imagem correspondente
          alt="Aviator"
          className="aviator-logo"
        />
        <div className="aviator-float-box">
          <p className="aviator-entrada-text">{entradaStatus}</p>
          {isLoading ? (
            <p className="aviator-info-text">
              🔄 Processando... Por favor, aguarde.
            </p>
          ) : (
            <>
              {!isTimerActive && (
                <p className="aviator-info-text">
                  🔍 Em busca de falhas... Fique atento! 🛫
                </p>
              )}
              <div
                className={`aviator-info-text ${isTimerActive ? "hidden" : ""}`}
              >
                <p className="aviator-info-text">
                  👇 Clique no Botão para Hackear o Sinal
                </p>
                <div className="button-wrapper">
                  <button
                    className={`aviator-button ${
                      hackSuccess ? "hack-success" : ""
                    }`}
                    onClick={handleHackearSinal}
                    disabled={isButtonDisabled}
                  >
                    <img
                      src={require("../../assets/Icon_hacker.png")}
                      alt="Icon"
                      className="button-icon"
                    />
                    Hackear Sinal
                  </button>
                </div>
              </div>

              <div
                className={`progress-container ${
                  isTimerActive ? "" : "hidden"
                }`}
              >
                {probabilidadeVitoria !== null && (
                  <div className="progress-container">
                    <div className="progress-bar">
                      <CircularProgressbar
                        value={probabilidadeVitoria}
                        text={`${probabilidadeVitoria}%`}
                        styles={buildStyles({
                          pathColor:
                            getProbabilidadeColor(probabilidadeVitoria),
                          textColor:
                            getProbabilidadeTextColor(probabilidadeVitoria),
                          textSize: "35px",
                          pathTransitionDuration: 0.5,
                        })}
                      />
                    </div>
                    <div className="probabilidade-info">
                      <p className="probabilidade-texto">{`Probabilidade de Vitória: ${probabilidadeVitoria}%`}</p>
                      {probabilidadeVitoria < 45 && (
                        <p className="alerta-probabilidade-baixa">
                          <br></br>Considere jogar em outro horário.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <iframe src={webUrl} title="Conteúdo Web" className="aviator-webview" />
      </div>
    </div>
  );
}

export default Games;
