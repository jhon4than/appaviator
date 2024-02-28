import React, { useState, useEffect } from "react";
import "./Spaceman.css"; // Certifique-se de ter um arquivo CSS correspondente
import HeaderLogo from "../Home/headerLogo";
// Importe o componente de barra de progresso circular se estiver usando um de terceiros
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Spaceman() {
  const [maxJogadas, setMaxJogadas] = useState(0);
  const [contador, setContador] = useState("03:00");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [entradaStatus, setEntradaStatus] = useState("🔐 POSSÍVEL FALHA 🔐");
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [webUrl, setWebUrl] = useState(
    "https://hudsbet.cxclick.com/visit/?bta=35160&brand=hudsbet"
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

      const statusMessage = `✨ Sinal Detectado!

      ▶️ Começar após (1.30)X
      ⚠️ Proteja em (2.0)X (Opcional)

      🏃🏻‍♀️ Saia em (${girosArredondado})X
      🌪️ Liberado até 2 martin gales
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
    <div className="spaceman-background">
      <div className="spaceman-container">
        <HeaderLogo />
        <img
          src={require("../../assets/SPACEMANLUCRATIVO.webp")} // Certifique-se de ter uma imagem correspondente
          alt="spaceman"
          className="spaceman-logo"
        />
        <div className="spaceman-float-box">
          <p className="spaceman-entrada-text">{entradaStatus}</p>
          {isLoading ? (
            <p className="spaceman-info-text">
              🔄 Processando... Por favor, aguarde.
            </p>
          ) : (
            <>
              {!isTimerActive && (
                <p className="spaceman-info-text">
                  🔍 Em busca de falhas... Fique atento! 🛫
                </p>
              )}
              <p className="spaceman-info-text">
                ⌛ Jogue até acabar o tempo: {contador}
              </p>
              <div
                className={`spaceman-info-text ${
                  isTimerActive ? "hidden" : ""
                }`}
              >
                <p className="spaceman-info-text">
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
                          <br></br>Considere tentar outro jogo ou jogar em outro
                          horário.
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
        <iframe
          src={webUrl}
          title="Conteúdo Web"
          className="spaceman-webview"
        />
      </div>
    </div>
  );
}

export default Spaceman;
