import React, { useState, useEffect } from "react";
import "./Games.css"; // Certifique-se de ter um arquivo CSS correspondente
import HeaderLogo from "../Home/headerLogo";
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
    "https://superbet.bet.br/registro?utm_source=google&utm_medium=ppc&utm_campaign=ppc-bet-acq-ext-brand_protect_nobonus_newaccount-brand-all-sup&gad_source=1&gbraid=0AAAAA-bk3h7F4xVfiZbEUT7ol8Vz0mkJi&gclid=Cj0KCQiAv628BhC2ARIsAIJIiK-MkBXkxme8cCJLTejmlLMz5bEix5HOWW0hmuj1mvMNtgraCNw_m2EaAh62EALw_wcB"
  );
  const [probabilidadeVitoria, setProbabilidadeVitoria] = useState(null);
  const [hackSuccess, setHackSuccess] = useState(false);
  const [horaLimite, setHoraLimite] = useState(null);

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
    } else if (isTimerActive && contador === "00:00") {
      setIsTimerActive(false);
      setContador("03:00");
      setIsButtonDisabled(false);
      setEntradaStatus("🔐 POSSÍVEL FALHA 🔐");
    }

    return () => clearInterval(intervalId);
  }, [isTimerActive, contador]);

  const handleHackearSinal = () => {
    setIsLoading(true);
    setTimeout(() => {
      const giros1 = Math.random() * (5.0 - 1.0) + 1.0;
      const girosArredondado = giros1.toFixed(2);

      const statusMessage = `
      𝙅𝙊𝙂𝙊: ✈ AVIATOR ✈

      📲⚡Decolar até 5x a 10X hackeado
          
      🌪 Liberado até 3 tentativa
      `;

      const now = new Date();
      const limite = new Date(now.getTime() + 5 * 60 * 1000);
      setHoraLimite(limite.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));

      setEntradaStatus(statusMessage.trim());
      setIsTimerActive(true);
      setIsLoading(false);
      setIsButtonDisabled(true);

      let probabilidade =
        Math.random() < 0.9 ? Math.random() * 10 + 90 : Math.random() * 100;
      setProbabilidadeVitoria(Math.round(probabilidade));
    }, 9000);
  };

  const getProbabilidadeColor = (probabilidade) => {
    if (probabilidade > 70) return "#00C851"; // verde
    if (probabilidade >= 45 && probabilidade <= 69) return "#ffbb33"; // laranja
    return "#ff4444"; // vermelho
  };

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
          src={require("../../assets/aviator (1).jpg")}
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
                          pathColor: getProbabilidadeColor(probabilidadeVitoria),
                          textColor: getProbabilidadeTextColor(probabilidadeVitoria),
                          textSize: "35px",
                          pathTransitionDuration: 0.5,
                        })}
                      />
                    </div>
                    <div className="probabilidade-info">
                      <p className="probabilidade-texto">{`Probabilidade de Vitória: ${probabilidadeVitoria}%`}</p>
                      {horaLimite && (
                        <p className="hora-limite-texto">
                          ⏰ Tentativas válidas até: {horaLimite}
                        </p>
                      )}
                      {probabilidadeVitoria < 45 && (
                        <p className="alerta-probabilidade-baixa">
                          <br />Considere jogar em outro horário.
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
