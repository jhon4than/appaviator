import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import "./Login.css";
import LogoMain from "../../assets/logoHome-remo.png";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim";

const firebaseConfig = {
  apiKey: "AIzaSyCfaNmtgyo1VgqVFIHJ8vq-dekSJyjjk9c",
  authDomain: "login-app-a4816.firebaseapp.com",
  projectId: "login-app-a4816",
  storageBucket: "login-app-a4816.appspot.com",
  messagingSenderId: "653367042131",
  appId: "1:653367042131:web:95be958a59dde1477c26a6",
  measurementId: "G-J0SB1FB8LS",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Login() {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Hook para navegação
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const saveUser = async (email, whatsapp) => {
    navigate("/"); // substitua '/home' pelo caminho da sua tela inicial
  };

  const handleLogin = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage("Por favor, insira um email válido.");
      return;
    }
    if (!whatsapp || !/^\d{9,}$/.test(whatsapp)) {
      setErrorMessage(
        "Por favor, insira um número de WhatsApp válido (ex. 689854566597)."
      );
      return;
    }
    setIsLoggingIn(true); // Indica que o processo de login começou

    // Adiciona um delay antes de executar saveUser
    setTimeout(() => {
      saveUser(email, whatsapp)
        .then(() => {
          // Depois de salvar o usuário, você pode navegar para a home ou fazer outra ação
          setIsLoggingIn(false); // Para de mostrar o loading depois que o usuário é salvo
          navigate("/"); // Altere para a rota que você deseja navegar após o login
        })
        .catch((error) => {
          console.error("Erro ao adicionar documento: ", error);
          setErrorMessage("Erro ao salvar os dados.");
          setIsLoggingIn(false); // Para de mostrar o loading se ocorrer um erro
        });
    }, 5000);
  };

  const particlesInit = useCallback(async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log(container);
  }, []);

  return (
    <div className="login-page">
      {/* O componente Particles deve ser o primeiro dentro do container para que ele fique no fundo */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            color: {
              value: "#111",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#FFD700",
            },
            links: {
              color: "#FFD700",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute", // Isso garante que as partículas fiquem no fundo
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      />
      <div className="login-container">
        <img src={LogoMain} className="login-logo" alt="Logo" />
        <p className="app-description animated-text">
          O APLICATIVO QUE HACKEIA JOGOS EM TEMPO REAL.
        </p>
        <div className="login-form">
          <input
            type="text"
            placeholder="Digite seu Email"
            className="login-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Número de WhatsApp"
            className="login-input"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <button
            className={`login-button ${isLoggingIn ? "loading" : ""}`}
            onClick={handleLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Carregando..." : "Entrar"}
          </button>
          {errorMessage && <p className="login-error">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
