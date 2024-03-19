import React from "react";

import './homePage.scss';

export function HomePage() {
	return (
		<div className="HomePage">
      <div className="hero">
        <section className="hero-content">
          <h2 className="sr-only">Contenu sponsorisé</h2>
          <p className="subtitle">Pas de frais.</p>
          <p className="subtitle">Pas de dépôt minimum.</p>
          <p className="subtitle">Taux d'intérêt élevés.</p>
          <p className="text">Ouvrez un compte d'épargne avec Argent Bank dès aujourd'hui !</p>
        </section>
      </div>
      <section className="features">
        <div className="feature-item">
          <img src="../assets/icon-chat.png" alt="Chat Icon" className="feature-icon" />
          <h3 className="feature-item-title">Vous êtes notre priorité n°1</h3>
          <p>
          Besoin de parler à un représentant? Vous pouvez nous contacter via notre
          Chat 24h/24 et 7j/7 ou via un appel téléphonique en moins de 5 minutes.
          </p>
        </div>
        <div className="feature-item">
          <img
            src="../assets/icon-money.png"
            alt="Chat Icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">Plus d’économies signifie des taux plus élevés</h3>
          <p>
          Plus vous épargnez chez nous, plus votre taux d’intérêt sera élevé !
          </p>
        </div>
        <div className="feature-item">
          <img
            src="../assets/icon-security.png"
            alt="Chat Icon"
            className="feature-icon"
          />
          <h3 className="feature-item-title">Une sécurité à laquelle vous pouvez faire confiance</h3>
          <p>
          Nous utilisons un cryptage haut de gamme pour garantir que vos données et votre argent
          soit toujours en sécurité.
          </p>
        </div>
      </section>
		</div>
	);
}
