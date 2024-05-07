import React, { useState } from "react";


export function Card() {

  const [activeCard , setActiveCard] = useState(false);
  const cardClass = activeCard ? "card-active" : "card";
  const cardBackClass = activeCard ? "card-back" : "card-back-active";

  return(<>
    <div className={cardClass} onClick={() => setActiveCard(!activeCard)}>
      <div className="card-logo-argentBank"></div>
      <div className="card-logo-mastercard"></div>
      <div className="puce"></div>
      <div className="sansContact"></div>
      <section className="info">
        <p className="card-number">1234 5678 9012 3456</p>
        <p className="card-date">expire fin 06/11</p>
        <p className="card-name">LEBLOND LUDOVIC</p>
      </section>
    </div>
    <div className={cardBackClass} onClick={() => setActiveCard(!activeCard)}>
      <div className="bandeMagnetique"></div>
      <div className="info-backCard">
        <p className="info-backCard-retrait">Plafond de retrait: 526€ / 1 500€</p>
        <p className="info-backCard-payement">Plafond de payement: 1036€ / 3 000€</p>
      </div>
    </div>
    </>
  )
}