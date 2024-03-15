import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BackArrow } from "../../../components/backArrow/backArrow";
import { Collapse } from "../../../components/collapse/collapse";

import "./userAccountPage.scss";

export function UserAccontPage() {
	const firstName = useSelector((state) => state.allReducer.user.firstName);
	const lastName = useSelector((state) => state.allReducer.user.lastName);
	const userId = useSelector((state) => state.allReducer.user.id);
	const [dataUsers, setDataUsers] = useState([]);
	const { userNbAccount } = useParams();

	useEffect(() => {
		fetch("http://localhost:3001/api/v1/user/profile", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + localStorage.token,
			},
		})
			.then((alldata) => alldata.json())
			.then((data) => {
				setDataUsers(data.body.account);
			});
	}, []);
	const targetAccount = dataUsers
		? dataUsers.find((nb) => nb.nbAccount === userNbAccount)
		: null;

		const operations = targetAccount
		? targetAccount.operations.toReversed()
		: null;


	if (targetAccount) {
		return (
			<main className="main bg-dark">
				<div className="header">
					<BackArrow chemin={`/user/${userId}`} />
					<h1>
						{lastName} {firstName}
					</h1>
				</div>
				<div className="account-userAccountPage">
					<section className="entete-account">
						<p className="entete-account-description">
							{targetAccount.name}
						</p>
						<p className="entete-account-description">
							{targetAccount.nbAccount}
						</p>
						<p className="entete-account-description">
							{targetAccount.solde.toFixed(2)} €
						</p>
					</section>
					<section className="AllOperation-account">
						{operations.map((data) => (
							<Collapse
								title={data.title}
								date={data.date}
								montant={data.montant.toFixed(2)}
								description={data.description}
								key={data._id}
								operationId={data._id}
								idAccount={targetAccount._id}
							/>
						))}
					</section>
				</div>
			</main>
		);
	}
}
