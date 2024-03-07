import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BackArrow } from "../../../components/backArrow/backArrow";

import "./AdminUserPage.scss";

export function AdminUserPage() {
	const id = useSelector((state) => state.allReducer.user.id);
	const [target, setTarget] = useState();
	const [portefeuilleClient, setPortefeuilleClient] = useState(0);
	const { userId } = useParams();

	useEffect(() => {
		fetch("http://localhost:3001/api/v1/user", {
			method: "GET",
			headers: {
				id: `${id}`,
			},
		})
			.then((data) => data.json())
			.then((dataJson) => {
				let target = dataJson.body.find((user) => user.id === userId);
				let totalSolde = 0;
				target.account.forEach((data) => {
					totalSolde += parseFloat(data.solde); // Convertir solde en nombre
				});
				setPortefeuilleClient(totalSolde);
				setTarget(target);
			});
	}, [id, userId]);

	if (target) {
		return (
			<main className="main bg-dark">
				<div className="header">
					<BackArrow chemin={"/admin"} />
					<h1>
						{target.lastName} {target.firstName}
					</h1>
					<p className="portefeuilleClient">La valeur bancaire du client est de: {portefeuilleClient} €</p>
				</div>
				{target.account.map((data) => (
					<Link
						to={`${data.nbAccount}`}
						key={data.firstName + data.nbAccount}
					>
						<div className="account">
							<p className="account-amount-description">
								{data.name}
							</p>
							<p className="account-amount-description">
								{data.nbAccount}
							</p>
							<p className="account-amount-description">
								{data.solde} €
							</p>
						</div>
					</Link>
				))}
			</main>
		);
	}
}
