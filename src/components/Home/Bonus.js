import React from "react";
import "./Bonus.css"; // Este é o arquivo CSS onde você vai definir todos os seus estilos
import imgbonus from "../../assets/cadastro.jpeg";
import HeaderLogo from "../Home/headerLogo";
import {
  FaTelegramPlane,
  FaRegListAlt,
  FaDownload,
  FaWhatsapp,
} from "react-icons/fa"; // Importando ícones específicos

const Bonus = () => {
  return (
    <div className="bonus-page">
      <div className="bonus-content">
        <HeaderLogo />

        <div className="bonus-image">
          <img src={imgbonus} alt="Bônus" />
        </div>

        <div className="bonus-buttons">
          <button
            onClick={() =>
              window.open(
                "https://chat.whatsapp.com/H9XHtS1JmWb2qDuG4uhLqS",
                "_blank"
              )
            }
          >
            <FaWhatsapp /> Entrar Na Comunidade WhatsApp
          </button>
          <button
            onClick={() =>
              window.open(
                "https://primeflix.bet",
                "_blank"
              )
            }
          >
            <FaRegListAlt /> Cadastre-se na Plataforma
          </button>
          <button
            onClick={() =>
              window.open(`${process.env.PUBLIC_URL}/gerenciamento.pdf`)
            }
          >
            <FaDownload /> Baixar PDF de Bônus
          </button>
        </div>
      </div>
    </div>
  );
};

export default Bonus;
