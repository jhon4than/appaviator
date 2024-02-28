import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FootballStudio.css";
import HeaderLogo from "../Home/headerLogo";

function FootballStudio() {
  const [directionColor, setDirectionColor] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [lastResults, setLastResults] = useState([]);
  const [webUrl, setWebUrl] = useState(
    "https://hudsbet.cxclick.com/visit/?bta=35160&brand=hudsbet"
  );
  const [loadingMessage, setLoadingMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const generateRandomSignal = () => {
    const signals = ["A", "V", "E"]; // Azul, Vermelho ou Empate
    return signals[Math.floor(Math.random() * signals.length)];
  };

  const generateRandomResultsBasedOnStrategies = () => {
    const STRATEGIES = [
      { PADRAO: ["V", "V"], ENTRADA: "A" },
      { PADRAO: ["A", "A"], ENTRADA: "V" },
      { PADRAO: ["V", "V", "V"], ENTRADA: "A" },
      { PADRAO: ["A", "V", "A"], ENTRADA: "V" },
      { PADRAO: ["V", "A", "V"], ENTRADA: "A" },
      { PADRAO: ["A", "A", "A"], ENTRADA: "V" },
      { PADRAO: ["A", "A", "A", "A"], ENTRADA: "V" },
      { PADRAO: ["V", "V", "V", "V"], ENTRADA: "A" },
    ];
    // Pega um padrão aleatório das estratégias
    const randomPattern =
      STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)].PADRAO;
    // Cria um array de resultados, começando com o padrão aleatório
    const results = [...randomPattern];
    // Preenche o restante do array com valores aleatórios
    while (results.length < 20) {
      results.push(generateRandomSignal());
    }
    return results;
  };

  const fetchResults = async () => {
    setIsLoading(true);
    setLoadingMessage("Analisando a entrada ao vivo. Por favor, aguarde...");
    try {
      const response = await axios.get("/api/football-studio");
      const data = response.data;

      if (data && data.results.length > 0) {
        setLastResults(data.results.slice(0, 5));
        checkStrategy(data.results);
      } else {
        throw new Error("No results returned from the API");
      }
    } catch (error) {
      console.error("Error fetching results or no results:", error);

      // Simular resultados baseados nas estratégias
      const simulatedResults = generateRandomResultsBasedOnStrategies();
      setLastResults(simulatedResults.slice(0, 5));
      checkStrategy(simulatedResults);
    }
  };

  const checkStrategy = (results) => {
    const STRATEGIES = [
      { PADRAO: ["V", "V"], ENTRADA: "A" },
      { PADRAO: ["A", "A"], ENTRADA: "V" },
      { PADRAO: ["V", "V", "V"], ENTRADA: "A" },
      { PADRAO: ["A", "V", "A"], ENTRADA: "V" },
      { PADRAO: ["V", "A", "V"], ENTRADA: "A" },
      { PADRAO: ["A", "A", "A"], ENTRADA: "V" },
      { PADRAO: ["A", "A", "A", "A"], ENTRADA: "V" },
      { PADRAO: ["V", "V", "V", "V"], ENTRADA: "A" },
    ];

    let patternFound = false;
    for (let strategy of STRATEGIES) {
      if (
        results.slice(0, strategy.PADRAO.length).join("") ===
        strategy.PADRAO.join("")
      ) {
        const direction =
          strategy.ENTRADA === "A"
            ? "🔵"
            : strategy.ENTRADA === "V"
            ? "🔴"
            : "🟡";
        setLoadingMessage([
          "🎲 ENTRADA CONFIRMADA!",
          `🎰 Apostar no ${direction}`,
          "🟡 Proteger o empate (Meio)",
          "🔁 Fazer até 2 gales",
        ]);
        setDirectionColor(direction);
        patternFound = true;
        setTimeout(() => {
          // Aguardar antes de desativar o estado de carregamento
          setIsLoading(false);
        }, 3000); // Aguarda 3 segundos antes de atualizar os estados
        break;
      }
    }

    if (!patternFound) {
      const id = setTimeout(fetchResults, 1000);
      setTimeoutId(id);
    }
  };

  // Efeito para limpar o timeout quando o componente desmontar
  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);
  const renderResultItem = (result, index) => {
    return (
      <div key={index} className="result-item">
        {result === "A" ? "🔵" : "🔴"}
      </div>
    );
  };
  const handleButtonClick = () => {
    setIsButtonDisabled(true); // Desabilita o botão durante a carga
    setLoadingMessage("Analisando a entrada ao vivo. Por favor, aguarde..."); // Mensagem de carregamento após 10 segundos
    setTimeout(() => {
      fetchResults(); // Chama a função para buscar os resultados após 10 segundos
    }, 10000);

    // Desativa o botão por 1 minuto
    setTimeout(() => {
      setIsButtonDisabled(false); // Reabilita o botão após 1 minuto
    }, 60000); // 60000 milissegundos = 1 minuto
  };

  return (
    <div className="football-background">
      <div className="football-container">
        <HeaderLogo></HeaderLogo>
        <img
          src={require("../../assets/football.jpeg")}
          alt="Football Studio"
          className="logo"
        />
        {isLoading || directionColor ? (
          <div className="results-container">
            {Array.isArray(loadingMessage) ? (
              loadingMessage.map((line, index) => (
                <p key={index} className="loading-text">
                  {line}
                </p>
              ))
            ) : (
              <p className="loading-text">{loadingMessage}</p>
            )}
            {errorMessage && (
              <div className="error-container">
                <p className="error-text">{errorMessage}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="results-container">
            <p className="results-header">
              👨🏻‍💻 Nossa inteligência artificial está identificando falhas na
              plataforma.
            </p>
          </div>
        )}
        <div className="hack-button-container">
          <button
            className={`football-hack-button ${
              isButtonDisabled ? "football-disabled-button" : ""
            }`}
            onClick={handleButtonClick}
            disabled={isButtonDisabled}
          >
            Hackear Sinal 🎲
          </button>
        </div>
        <iframe
          src={webUrl}
          title="Conteúdo Web"
          className="football-webview"
        />
      </div>
    </div>
  );
}

export default FootballStudio;
