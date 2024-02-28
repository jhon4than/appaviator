import React from 'react';
import logo from '../../assets/logoPrincipal.png'; // Ajuste o caminho conforme necessário
import './HeaderLogo.css'; // CSS importado

const HeaderLogo = () => {
  return (
    <div className="headerLogo-container">
      <img src={logo} alt="Logo" className="headerLogo-logo" />
    </div>
  );
};

export default HeaderLogo;
