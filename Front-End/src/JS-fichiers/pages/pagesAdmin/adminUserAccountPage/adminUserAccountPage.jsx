import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ReactModal from "react-modal";
import { BackArrow } from "../../../components/backArrow/backArrow";
import { Collapse } from "../../../components/collapse/collapse";
import { Button } from "../../../components/button/button";

import "./adminUserAccountPage.scss";

export function AdminUserAccountPage() {
	const token = useSelector((state) => state.allReducer.token);
	const id = useSelector((state) => state.allReducer.user.id);
	const [allUsers, setAllUsers] = useState([]);
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [montant, setMontant] = useState();
	const [isModaleOpen, setIsModaleOpen] = useState(false);

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
	}, [id]);

	const target = allUsers.length
		? allUsers.find((location) => location.id === userId)
		: null;
	const targetAccount = target
		? target.account.find((nb) => nb.nbAccount === nbAccount)
		: null;
	const operations = targetAccount
		? targetAccount.operations.toReversed()
		: null;

	function closeAccount() {
		fetch("http://localhost:3001/api/v1/user/account/close", {
			method: "PUT",
			headers: {
				id: `${userId}`,
				idAccount: `${targetAccount._id}`,
				Authorization: "Bearer " + token,
			},
		});
		window.location.reload();
	}

	function handlechange() {
		setIsModaleOpen(true);
	}
	const today = new Date();

	async function addOperation() {
		let headersList = {
			id: `${userId}`,
			idaccount: `${targetAccount._id}`,
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};
		let bodyContent = JSON.stringify({
			date: `${today
				.toLocaleString("fr-FR", { timeZone: "UTC" })
				.slice(0, 10)}`,
			title: `${title}`,
			description: `${description}`,
			montant: montant,
		});

		let response = await fetch(
			"http://localhost:3001/api/v1/user/account/operations",
			{
				method: "PUT",
				body: bodyContent,
				headers: headersList,
			}
			);
	}

	if (targetAccount && target && targetAccount.visible === true) {
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

					<h2 className="titleModal">Ajouter une Opération</h2>
					<form action="" className="formModal" onSubmit={addOperation}>
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
						<label htmlFor="montant">
							Montant:
							<input
								type="number"
								step="0.01"
								id="montant"
								required
								checked
								onChange={(e) => setMontant(e.target.value)}
							/>
						</label>
						<input type="submit" className="buttonArgentBank modalButton" value="AJOUTER" />
					</form>
				</ReactModal>
				

				<div className="header">
					<BackArrow chemin={`/admin/${userId}`} />
					<h1>
						{target.lastName} {target.firstName}
					</h1>
					<h3> " {target.userName} "</h3>
					<div className="infosClient">
						<p className="infosClient-id">Id User : {target.id}</p>
						<p className="infosClient-email">
							Email: {target.email}
						</p>
						<p className="infosClient-create">
							Date de création: {target.createdAt.slice(0, 10)}
						</p>
						<p className="infosClient-update">
							Dernière mise à jour du compte:{" "}
							{target.updatedAt.slice(0, 10)}
						</p>
					</div>
					<Button
						text={"+ add operation"}
						onClick={handlechange}
					/>
				</div>

				<div className="account-adminUserAccountPage">
					<section className="entete-account">
						<p className="entete-account-description">
							{targetAccount.name}
						</p>
						<p className="entete-account-description">
							{targetAccount.nbAccount}
							<br />
							Id: {targetAccount._id}
						</p>
						<p className="entete-account-description">
							{targetAccount.solde} €
						</p>
						<span
							className="trash"
							data-descr="Close this account"
							onClick={closeAccount}
						>
							<i
								className="fa-solid fa-trash"
								style={{ color: "#12002b" }}
							></i>
						</span>
					</section>
					<section className="AllOperation-account">
						{operations.map((data) =>
							data.description !== "undefined" ? (
								<Collapse
									title={data.title}
									date={data.date}
									montant={data.montant}
									description={data.description}
									key={data.title}
									operationId={data._id}
									idAccount={targetAccount._id}
								/>
							) : (
								<Collapse
									title={data.title}
									date={data.date}
									montant={data.montant}
									key={data.title}
									operationId={data._id}
									idAccount={targetAccount._id}
								/>
							)
						)}
					</section>
				</div>
			</main>
		);
	}
	if (targetAccount && target && targetAccount.visible === false) {
		return (
			<main className="main bg-dark">
				<div className="header">
					<BackArrow chemin={`/admin/${userId}`} />
					<h1>
						{target.lastName} {target.firstName}
					</h1>
					<h3> " {target.userName} "</h3>
					<div className="infosClient">
						<p className="infosClient-id">Id: {target.id}</p>
						<p className="infosClient-email">
							Email: {target.email}
						</p>
						<p className="infosClient-create">
							Date de création: {target.createdAt.slice(0, 10)}
						</p>
						<p className="infosClient-update">
							Dernière mise à jour du compte:{" "}
							{target.updatedAt.slice(0, 10)}
						</p>
					</div>
				</div>

				<div className="account-adminUserAccountPage account-adminUserAccountPage-invisible">
					<section className="entete-account">
						<p className="entete-account-description">
							{targetAccount.name}
						</p>
						<p className="accountAdminUserPage-closed">
							Ce compte est cloturé !
						</p>
						<p className="entete-account-description">
							{targetAccount.nbAccount} <br />
							Id: {targetAccount._id}
						</p>
						<p className="entete-account-description">
							{targetAccount.solde} €
						</p>
					</section>
					<section className="AllOperation-account">
						{operations.map((data) =>
							data.description !== "undefined" ? (
								<Collapse
									title={data.title}
									date={data.date}
									montant={data.montant}
									description={data.description}
									key={data.title}
								/>
							) : (
								<Collapse
									title={data.title}
									date={data.date}
									montant={data.montant}
									key={data.title}
								/>
							)
						)}
					</section>
				</div>
			</main>
		);
	}
}
