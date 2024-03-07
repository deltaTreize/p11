import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { BackArrow } from "../../../components/backArrow/backArrow";
import { Button } from "../../../components/button/button";

import "./AdminUserPage.scss";

export function AdminUserPage() {
	const id = useSelector((state) => state.allReducer.user.id);
	const token = useSelector((state) => state.allReducer.token);
	const [target, setTarget] = useState();
	const [name, setName] = useState();
	const [nbAccount, setNbAccount] = useState();
	const [solde, setSolde] = useState();
	const [visible, setVisible] = useState();
	const [isModaleOpen, setIsModaleOpen] = useState(false);
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
					totalSolde += parseFloat(data.solde);
				});
				setPortefeuilleClient(totalSolde);
				setTarget(target);
			});
	}, [id, userId]);

	function handlechange() {
		setIsModaleOpen(true);
	}

	async function addAccount() {
		let headersList = {
			id: `${userId}`,
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			name: `${name}`,
			nbAccount: `${nbAccount}`,
			solde: solde,
			visible: visible,
		});

		let response = await fetch(
			"http://localhost:3001/api/v1/user/account",
			{
				method: "PUT",
				body: bodyContent,
				headers: headersList,
			}
		);

		let data = await response.text();
		console.log(data);
	}

	if (target) {
		return (
			<main className="main bg-dark">
				<ReactModal
					isOpen={isModaleOpen}
					className="Modal"
					overlayClassName="Overlay"
				>
					<h2>Ajouter un compte</h2>
					<form action="" onSubmit={addAccount}>
						<label htmlFor="name">
							nom du compte :
							<input
								type="text"
								id="name"
								required
								onChange={(e) => setName(e.target.value)}
							/>
						</label>
						<label htmlFor="nbAccount">
							numero du compte :
							<input
								type="text"
								id="nbAccount"
								required
								onChange={(e) => setNbAccount(e.target.value)}
							/>
						</label>
						<label htmlFor="solde">
							solde du compte :
							<input
								type="number"
								step="0.01"
								id="solde"
								required
								onChange={(e) => setSolde(e.target.value)}
							/>
						</label>
						<label htmlFor="visible">
							compte visible:
							<input
								type="checkbox"
								id="visible"
								required
								checked
								onChange={(e) =>
									setVisible(`${e.target.checked}`)
								}
							/>
						</label>
						<input type="submit" value="" />
					</form>
				</ReactModal>
				<div className="header">
					<BackArrow chemin={"/admin"} />
					<h1>
						{target.lastName} {target.firstName}
					</h1>
					<h3> " {target.userName} "</h3>
					<div className="infosClient">
						<p className="infosClient-id">Id User : {target.id}</p>
						<p className="infosClient-email">
							Email : {target.email}
						</p>
						<p className="infosClient-create">
							Date de création : {target.createdAt.slice(0, 10)}
						</p>
						<p className="infosClient-update">
							Dernière mise à jour du compte :{" "}
							{target.updatedAt.slice(0, 10)}
						</p>
					</div>
					<p className="portefeuilleClient">
						La valeur bancaire du client est de :{" "}
						{portefeuilleClient} €
					</p>
					<Button
						className="addAccount"
						text={"+ add Account"}
						onClick={handlechange}
					/>
				</div>
				{target.account.map((data) =>
					data.visible === true ? (
						<Link
							to={`${data.nbAccount}`}
							key={data.nbAccount}
							className="linkAccountAdminUserPage"
						>
							<div className="accountAdminUserPage">
								<p className="accountAdminUserPage-name">
									{data.name}
								</p>
								<p className="accountAdminUserPage-nbAccount">
									N° de compte: {data.nbAccount}
									<br />
									Id: {data._id}
								</p>
								<p className="accountAdminUserPage-solde">
									{data.solde} €
								</p>
							</div>
						</Link>
					) : (
						<Link
							to={`${data.nbAccount}`}
							key={data.firstName + data.nbAccount}
							className="linkAccountAdminUserPage "
						>
							<div className="accountAdminUserPage accountAdminUserPage-invisible">
								<p className="accountAdminUserPage-name">
									{data.name}
								</p>
								<p className="accountAdminUserPage-closed">
									This account was closed !
								</p>
								<p className="accountAdminUserPage-nbAccount">
									N° de compte: {data.nbAccount}
									<br />
									Id: {data._id}
								</p>
								<p className="accountAdminUserPage-solde">
									{data.solde} €
								</p>
							</div>
						</Link>
					)
				)}
			</main>
		);
	}
}
