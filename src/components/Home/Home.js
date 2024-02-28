import React, { useState } from "react";
import "./Home.css"; // Importar o CSS correspondente
import LogoMain from "../../assets/logoHome-remo.png";
import fundo from "../../assets/imageHome.jpg";
import Carousel from "./Carousel";
import apple from "../../assets/apple.png";
import android from "../../assets/android.png";
import downloadIcon from "../../assets/botao-de-download.png";
import TutorialModal from "./TurotialModal";

function Home() {
  const carouselItems = [
    {
      name: "Andrea",
      amount: "+R$296.10",
      game: "Football Studio",
    },
    {
      name: "Gustavo",
      amount: "+R$360.48",
      game: "Mines",
    },
    {
      name: "Rodrigo",
      amount: "+R$197.99",
      game: "Mines",
    },
    {
      name: "Bianca",
      amount: "+R$131.05",
      game: "Mines",
    },
    {
      name: "Larissa",
      amount: "+R$440.71",
      game: "Mines",
    },
    {
      name: "Beatriz",
      amount: "+R$216.22",
      game: "Football Studio",
    },
    {
      name: "Antero",
      amount: "+R$177.77",
      game: "Football Studio",
    },
    {
      name: "Matheus",
      amount: "+R$502.51",
      game: "Football Studio",
    },
    {
      name: "Gustavo",
      amount: "+R$414.43",
      game: "Fortune Tiger",
    },
    {
      name: "Julia",
      amount: "+R$334.58",
      game: "Football Studio",
    },
    {
      name: "Natalia",
      amount: "+R$111.33",
      game: "Fortune Tiger",
    },
    {
      name: "Pedro",
      amount: "+R$187.75",
      game: "Football Studio",
    },
    {
      name: "Valentina",
      amount: "+R$298.88",
      game: "Football Studio",
    },
    {
      name: "Fernando",
      amount: "+R$370.26",
      game: "Football Studio",
    },
    {
      name: "Valeria",
      amount: "+R$491.63",
      game: "Football Studio",
    },
    {
      name: "Samuel",
      amount: "+R$404.82",
      game: "Mines",
    },
    {
      name: "Andrea",
      amount: "+R$336.50",
      game: "Football Studio",
    },
    {
      name: "Clara",
      amount: "+R$311.14",
      game: "Fortune Tiger",
    },
    {
      name: "Rafaela",
      amount: "+R$597.56",
      game: "Mines",
    },
    {
      name: "João",
      amount: "+R$332.90",
      game: "Fortune Tiger",
    },
    {
      name: "Camila",
      amount: "+R$569.18",
      game: "Mines",
    },
    {
      name: "Sophia",
      amount: "+R$494.54",
      game: "Mines",
    },
    {
      name: "Helena",
      amount: "+R$101.57",
      game: "Mines",
    },
    {
      name: "Pedro",
      amount: "+R$411.25",
      game: "Football Studio",
    },
    {
      name: "Laura",
      amount: "+R$556.38",
      game: "Football Studio",
    },
    {
      name: "Tiago",
      amount: "+R$131.60",
      game: "Mines",
    },
    {
      name: "Beatriz",
      amount: "+R$386.05",
      game: "Fortune Tiger",
    },
    {
      name: "Sophia",
      amount: "+R$464.27",
      game: "Mines",
    },
    {
      name: "Alexandre",
      amount: "+R$324.08",
      game: "Football Studio",
    },
    {
      name: "Carlos",
      amount: "+R$143.24",
      game: "Mines",
    },
    {
      name: "Gustavo",
      amount: "+R$492.80",
      game: "Fortune Tiger",
    },
    {
      name: "Maria",
      amount: "+R$423.01",
      game: "Fortune Tiger",
    },
    {
      name: "Amanda",
      amount: "+R$208.97",
      game: "Mines",
    },
    {
      name: "Helena",
      amount: "+R$193.66",
      game: "Football Studio",
    },
    {
      name: "Daniel",
      amount: "+R$591.38",
      game: "Football Studio",
    },
    {
      name: "Luis",
      amount: "+R$273.28",
      game: "Fortune Tiger",
    },
    {
      name: "Natalia",
      amount: "+R$329.87",
      game: "Football Studio",
    },
    {
      name: "Rafaela",
      amount: "+R$165.60",
      game: "Fortune Tiger",
    },
    {
      name: "Camila",
      amount: "+R$317.10",
      game: "Football Studio",
    },
    {
      name: "João",
      amount: "+R$494.26",
      game: "Football Studio",
    },
    {
      name: "Valentina",
      amount: "+R$559.94",
      game: "Football Studio",
    },
    {
      name: "Alice",
      amount: "+R$193.18",
      game: "Football Studio",
    },
    {
      name: "Sophia",
      amount: "+R$465.25",
      game: "Fortune Tiger",
    },
    {
      name: "Joaquim",
      amount: "+R$587.43",
      game: "Football Studio",
    },
    {
      name: "Gustavo",
      amount: "+R$165.78",
      game: "Fortune Tiger",
    },
    {
      name: "Luis",
      amount: "+R$433.95",
      game: "Football Studio",
    },
    {
      name: "Laura",
      amount: "+R$557.48",
      game: "Football Studio",
    },
    {
      name: "Mariana",
      amount: "+R$518.23",
      game: "Mines",
    },
    {
      name: "Manuel",
      amount: "+R$498.41",
      game: "Fortune Tiger",
    },
    {
      name: "Isabella",
      amount: "+R$410.06",
      game: "Mines",
    },
    {
      name: "Rodrigo",
      amount: "+R$168.02",
      game: "Fortune Tiger",
    },
    {
      name: "Camila",
      amount: "+R$135.46",
      game: "Fortune Tiger",
    },
    {
      name: "Isabel",
      amount: "+R$224.09",
      game: "Football Studio",
    },
    {
      name: "Leticia",
      amount: "+R$123.81",
      game: "Mines",
    },
    {
      name: "João",
      amount: "+R$138.28",
      game: "Fortune Tiger",
    },
    {
      name: "Leonardo",
      amount: "+R$238.84",
      game: "Mines",
    },
    {
      name: "Eduardo",
      amount: "+R$516.05",
      game: "Fortune Tiger",
    },
    {
      name: "Eduardo",
      amount: "+R$253.36",
      game: "Fortune Tiger",
    },
    {
      name: "Marcos",
      amount: "+R$497.60",
      game: "Mines",
    },
    {
      name: "Lara",
      amount: "+R$506.72",
      game: "Mines",
    },
    {
      name: "Marcos",
      amount: "+R$578.58",
      game: "Fortune Tiger",
    },
    {
      name: "Amanda",
      amount: "+R$219.04",
      game: "Fortune Tiger",
    },
    {
      name: "Isabel",
      amount: "+R$217.84",
      game: "Mines",
    },
    {
      name: "Rafael",
      amount: "+R$255.35",
      game: "Football Studio",
    },
    {
      name: "Isabella",
      amount: "+R$106.93",
      game: "Mines",
    },
    {
      name: "Marcos",
      amount: "+R$431.38",
      game: "Football Studio",
    },
    {
      name: "Antero",
      amount: "+R$451.37",
      game: "Fortune Tiger",
    },
    {
      name: "Rodrigo",
      amount: "+R$354.80",
      game: "Football Studio",
    },
    {
      name: "Sophia",
      amount: "+R$568.14",
      game: "Football Studio",
    },
    {
      name: "Isabella",
      amount: "+R$115.70",
      game: "Mines",
    },
    {
      name: "Alexandre",
      amount: "+R$366.11",
      game: "Football Studio",
    },
    {
      name: "Clara",
      amount: "+R$276.09",
      game: "Mines",
    },
    {
      name: "Helena",
      amount: "+R$338.36",
      game: "Fortune Tiger",
    },
    {
      name: "Felipe",
      amount: "+R$151.68",
      game: "Mines",
    },
    {
      name: "Camila",
      amount: "+R$564.92",
      game: "Fortune Tiger",
    },
    {
      name: "Gabriela",
      amount: "+R$295.28",
      game: "Mines",
    },
    {
      name: "Luiz",
      amount: "+R$424.60",
      game: "Mines",
    },
    {
      name: "Ricardo",
      amount: "+R$305.63",
      game: "Mines",
    },
    {
      name: "Isabella",
      amount: "+R$196.84",
      game: "Football Studio",
    },
    {
      name: "Matheus",
      amount: "+R$485.92",
      game: "Football Studio",
    },
    {
      name: "Felipe",
      amount: "+R$503.17",
      game: "Mines",
    },
    {
      name: "Julia",
      amount: "+R$348.37",
      game: "Football Studio",
    },
    {
      name: "Alexandre",
      amount: "+R$336.47",
      game: "Mines",
    },
  ];
  const [isTutorialOpen, setTutorialOpen] = useState(false);
  const [platform, setPlatform] = useState(null);
  const openTutorial = (platform) => {
    setTutorialOpen(true);
    setPlatform(platform);
  };

  const closeTutorial = () => {
    setTutorialOpen(false);
    setPlatform(null);
  };

  return (
    <div className="background">
      <div className="scrollContainer">
        <div className="container">
          {/* Carousel: Image slider that may contain various items like promotions or features */}
          <Carousel items={carouselItems} />

          {/* Logo: Branding image at the top of the page */}
          <img src={LogoMain} className="centerImage" alt="Logo" />

          {/* Download Section: Prompts users to download the app with respective store buttons */}
          <div className="app-download-section">
            <div className="install-prompt">
              {/* Download Icon: Visual cue to download */}
              <img
                src={downloadIcon}
                alt="Download"
                className="download-icon"
              />
              {/* Prompt Text: Call to action for app installation */}
              <span>Instale nosso app:</span>
            </div>
            {/* When the user clicks on the button, the tutorial modal opens */}
            <div className="download-buttons">
              <button
                onClick={() => openTutorial("android")}
                className="download-button google-play"
              >
                <img src={android} alt="Android" /> Android
              </button>
              <button
                onClick={() => openTutorial("ios")}
                className="download-button app-store"
              >
                <img src={apple} alt="IOS" /> IOS
              </button>
            </div>
          </div>

          {/* Welcome Section: Greets the user and introduces the app */}
          <div className="textContainer">
            {/* Main Greeting */}
            <h1 className="welcomeText">Bem Vindo ao Aviator 10x</h1>
            {/* Description: Additional information about the app */}
            <p className="descriptionText">
              O seu melhor aplicativo de sinais da atualidade!
            </p>
            {/* Video Prompt: Directs users to watch the tutorial video */}
            <p className="videoPrompt">▼ Assista o vídeo tutorial abaixo ▼</p>
          </div>

          {/* Tutorial Video: Provides a visual guide or tutorial for using the app */}
          {/* <video src={} className="video" controls /> */}

          {/* Tutorial Modal */}
          <TutorialModal
            isOpen={isTutorialOpen}
            onClose={closeTutorial}
            platform={platform}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
