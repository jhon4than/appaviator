import React, { useState, useEffect } from "react";
import "./Mouse.css";
import HeaderLogo from "../Home/headerLogo";
// Importe o componente de barra de progresso circular se estiver usando um de terceiros
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Mouse() {
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
      const giros1 = Math.floor(Math.random() * (20 - 10 + 1) + 10);
      const giros2 = getRandomNumber();

      const statusMessage = `✨ Sinal Detectado!

    ▶️ Pronto para Começar

    ⚙️ Modo de Jogo:
    👆 ${giros1} Rodadas Manuais
    🔄 ${giros2} Rodadas Automáticas
    `;

      setMaxJogadas(giros1 + giros2);
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
    <div className="mouse-background">
      <div className="mouse-container">
        <HeaderLogo />
        <img
          src={require("../../assets/FortuneMouse.png")}
          alt="Fortune Mouse"
          className="mouse-logo"
        />
        <div className="mouse-float-box">
          <p className="mouse-entrada-text">{entradaStatus}</p>
          {isLoading ? (
            <p className="mouse-info-text">
              🔄 Processando... Por favor, aguarde.
            </p>
          ) : (
            <>
              {!isTimerActive && (
                <p className="mouse-info-text">
                  🔍 Em busca de falhas... Fique atento!
                </p>
              )}
              <p className="mouse-info-text">
                ⌛ Contagem regressiva: {contador}
              </p>
              <button
                className={`mouse-button ${
                  isButtonDisabled ? "mouse-disabled-button" : ""
                }`}
                onClick={handleHackearSinal}
                disabled={isButtonDisabled}
              >
                <img
                  src={require("../../assets/botao.png")}
                  alt="Iniciar Hack"
                  className={`mouse-button-image ${
                    !isButtonDisabled ? "mouse-button-spin" : ""
                  }`}
                />
              </button>
              <p
                className={`mouse-max-jogadas-text ${
                  isTimerActive ? "" : "hidden"
                }`}
              >
                🎰 Jogadas máximas: {maxJogadas}
              </p>
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
        <iframe src={webUrl} title="Conteúdo Web" className="mouse-webview" />
      </div>
    </div>
  );
}

export default Mouse;
