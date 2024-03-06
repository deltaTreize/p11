import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BackArrow } from "../../../components/backArrow/backArrow";

import "./adminUserAccountPage.scss";

export function AdminUserAccountPage() {
	const id = useSelector((state) => state.allReducer.user.id);
	const [allUsers, setAllUsers] = useState([]);
	const { nbAccount, userId } = useParams();

	useEffect(() => {
		fetch("http://localhost:3001/api/v1/user", {
			method: "GET",
			headers: {
				id: `${id}`,
			},
		})
			.then((data) => data.json())
			.then((dataJson) => setAllUsers(dataJson.body));
	}, []);

	const target = allUsers.length
		? allUsers.find((location) => location.id === userId)
		: null;
	const targetAccount = target
		? target.account.find((nb) => nb.nbAccount === nbAccount)
		: null;
	if (targetAccount && target) {
		return (
			<main className="main bg-dark">
				<div className="header">
				<BackArrow chemin={`/admin/${userId}`}/>
					<h1>
						{target.lastName} {target.firstName}
					</h1>
				</div>
				<div className="account">
					<p className="account-amount-description">
						{targetAccount.name}
					</p>
					<p className="account-amount-description">
						{targetAccount.nbAccount}
					</p>
					<p className="account-amount-description">
						{targetAccount.solde} €
					</p>
				</div>

				{targetAccount.operations.map((data) => (
					<div className="account" key={data.title}>
						<p className="account-amount-description">
							{data.date}
						</p>
						<p className="account-amount-description colum accountTitle">
							{data.title}
							<span className="account-amount-description accountDescrition">
								{data.description}
							</span>
						</p>
						<p className="account-amount-description">
							{data.montant} €
						</p>
					</div>
				))}
			</main>
		);
	}
}
