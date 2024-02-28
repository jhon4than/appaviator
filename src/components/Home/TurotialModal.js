import React from 'react';
import './TutorialModal.css'; // Ensure this path is correct

function TutorialModal({ isOpen, onClose, platform }) {
  if (!isOpen) return null;

  const instructions = {
    android: (
      <ol className="instruction-list">
        <h2>Instalação Android</h2>
        <li>Clique no ícone de "Mais opções" no canto superior direito.</li>
        <li>Clique em "Instalar Aplicativo" ou "Adicionar à tela Inicial".</li>
        <li>Confirme a ação clicando em "Instalar" no popup que aparece na tela.</li>
      </ol>
    ),
    ios: (
      <ol className="instruction-list">
        <h2>Instalação IOS</h2>
        <li>Abra o aplicativo no Safari.</li>
        <li>Clique no ícone de "compartilhamento" no canto inferior do smartphone.</li>
        <li>Clique em "Adicionar à tela de início".</li>
        <li>Clique em "Adicionar" no canto superior direito.</li>
      </ol>
    )
  };

  return (
    <div className="tutorial-modal">
      <div className="tutorial-content">
        <span className="close-icon" onClick={onClose}>&times;</span>
        {instructions[platform]}
        <button onClick={onClose} className="close-button">Fechar</button>
      </div>
    </div>
  );
}

export default TutorialModal;
