import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/actions/typeAction";

export function Card() {
	const lastName = useSelector((state: RootState) => state.user.lastName);
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const dataUsers = useSelector((state: RootState) => state.user.account);
	const { nbAccount } = useParams();
	const [activeCard, setActiveCard] = useState(false);
	const cardClass = activeCard ? "card-active" : "card";
	const cardBackClass = activeCard ? "card-back" : "card-back-active";

	const targetAccount = dataUsers
		? dataUsers?.find((nb) => nb.nbAccount === nbAccount)
		: null;

	const nbCard = targetAccount?.cardNumber;
	const cardDate = targetAccount?.cardDate;

	return (
		<>
			<div className={cardClass} onClick={() => setActiveCard(!activeCard)}>
				<div className="card-logo-argentBank"></div>
				<div className="card-logo-mastercard"></div>
				<div className="puce"></div>
				<div className="sansContact"></div>
				<section className="info">
					<p className="card-number">{nbCard}</p>
					<p className="card-date">expire fin {cardDate}</p>
					<p className="card-name">
						{lastName} {firstName}
					</p>
				</section>
			</div>
			<div className={cardBackClass} onClick={() => setActiveCard(!activeCard)}>
				<div className="bandeMagnetique"></div>
				<div className="info-backCard">
					<p className="info-backCard-retrait">
						Plafond de retrait: 526€ / 1 500€
					</p>
					<p className="info-backCard-payement">
						Plafond de payement: 1036€ / 3 000€
					</p>
				</div>
			</div>
		</>
	);
}
