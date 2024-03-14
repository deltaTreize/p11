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
	const [visible, setVisible] = useState(false);
	const [isModaleOpen, setIsModaleOpen] = useState(false);
	const [portefeuilleClient, setPortefeuilleClient] = useState(0);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [valueOption1, setValueOption1] = useState();
	const [valueOption2, setValueOption2] = useState();
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [montant, setMontant] = useState();
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
			visible: !visible,
		});

		let response = await fetch(
			"http://localhost:3001/api/v1/user/account",
			{
				method: "PUT",
				body: bodyContent,
				headers: headersList,
			}
		);
	}
	const today = new Date();

	async function makeVirement() {
		/////////// add operation négative sur compte débiteur/////////////////
		let headersList1 = {
			id: `${userId}`,
			idaccount: `${valueOption1}`,
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};
		let bodyContent1 = JSON.stringify({
			date: `${today
				.toLocaleString("fr-FR", { timeZone: "UTC" })
				.slice(0, 10)}`,
			title: `${title}`,
			description: `${description}`,
			montant: - montant,
		});
		let response1 = await fetch(
			"http://localhost:3001/api/v1/user/account/operations",
			{
				method: "PUT",
				body: bodyContent1,
				headers: headersList1,
			}
		);

		///////////add operation positive sur compte créditeur/////////////////////
		let headersList2 = {
			id: `${userId}`,
			idaccount: `${valueOption2}`,
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};
		let bodyContent2 = JSON.stringify({
			date: `${today
				.toLocaleString("fr-FR", { timeZone: "UTC" })
				.slice(0, 10)}`,
			title: `${title}`,
			description: `${description}`,
			montant:  montant,
		});
		let response2 = await fetch(
			"http://localhost:3001/api/v1/user/account/operations",
			{
				method: "PUT",
				body: bodyContent2,
				headers: headersList2,
			}
		);
	}


	if (target) {
		return (
			<main className="main bg-dark">
				<ReactModal
					isOpen={isModaleOpen}
					className="Modal"
					overlayClassName="Overlay"
					ariaHideApp={!isModaleOpen}
					onRequestClose={()=> setIsModaleOpen(false)}
					shouldCloseOnOverlayClick= {true}
				>
					<h2 className="titleModal">Ajouter un compte</h2>
					<form action="" className="formModal" onSubmit={addAccount}>
						<label htmlFor="name">
							Nom du compte :
							<input
								type="text"
								id="name"
								required
								onChange={(e) => setName(e.target.value)}
							/>
						</label>
						<label htmlFor="nbAccount">
							Numero du compte :
							<input
								type="text"
								id="nbAccount"
								required
								onChange={(e) => setNbAccount(e.target.value)}
							/>
						</label>
						<label htmlFor="solde">
							Solde du compte :
							<input
								type="number"
								id="solde"
								step={0.01}
								value={0.00}
								disabled
								onChange={(e) => setSolde(e.target.value)}
							/>
						</label>
						<label htmlFor="visible">
							Compte invisible:
							<input
								type="checkbox"
								id="visible"
								onChange={(e) =>
									setVisible(`${e.target.checked}`)
								}
							/>
						</label>
						<input type="submit" className="buttonArgentBank modalButton" value="AJOUTER" />
					</form>
				</ReactModal>
				<ReactModal
				isOpen={isModalOpen}
				className="Modal"
				overlayClassName="Overlay"
				ariaHideApp={!isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				shouldCloseOnOverlayClick={true}
			>
				<h2 className="titleModal">Effectuer un virement</h2>
				<form action="" className="formModal" onSubmit={makeVirement}>
					<label htmlFor="account1">Compte débiteur :</label>
					<select
						name="account1"
						id="account1"
						onChange={(e) => setValueOption1(e.target.value)}
					>
						<option value="">choisir le compte à débiter!</option>
						{target.account.map((data) =>
							data.visible === true ? (
								<option value={data._id} key={"account1" + data._id}>
									{data.nbAccount} - {data.name} - {data.solde}
								</option>
							) : null
						)}
					</select>
					<label htmlFor="account2">Compte créditeur :</label>
					<select
						name="account2"
						id="account2"
						onChange={(e) => setValueOption2(e.target.value)}
					>
						<option value="">choisir le compte à créditer!</option>
						{target.account.map((data) =>
							data.visible === true &&
							data._id !== valueOption1 ? (
								<option value={data._id} key={"account2" + data._id}>
									{data.nbAccount} - {data.name} - {data.solde}
								</option>
							) : null
						)}
					</select>
					<label htmlFor="solde">
						Montant :
						<input
							type="number"
							id="solde"
							step={0.01}
							onChange={(e) => setMontant(e.target.value)}
						/>
					</label>
					<label htmlFor="title">
							Titre :
							<input
								type="text"
								id="title"
								required
								onChange={(e) => setTitle(e.target.value)}
							/>
						</label>
						<label htmlFor="description">
							Description :
							<input
								type="text"
								id="description"
								onChange={(e) => setDescription(e.target.value)}
							/>
						</label>
					<input
						type="submit"
						className="buttonArgentBank modalButton"
						value="EFFECTUER LE VIREMENT"
					/>
				</form>
			</ReactModal>

				<div className="header">
					<BackArrow chemin={"/admin"} />
					<h1>
						{target.lastName} {target.firstName}
					</h1>
					<h3> " {target.userName} "</h3>
					<div className="infosClient">
						<p className="infosClient-id">
							Id Utilisateur : {target.id}
						</p>
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
					<Button
						className="virementButtonAdmin"
						text={"Effectuer un virement"}
						onClick={() => setIsModalOpen(!isModalOpen)}
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
									Ce compte est cloturé !
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
