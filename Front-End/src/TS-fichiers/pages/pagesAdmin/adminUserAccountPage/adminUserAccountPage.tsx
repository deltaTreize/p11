import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BackArrow } from "../../../components/backArrow/backArrow";
import { Button } from "../../../components/button/button";
import { Collapse } from "../../../components/collapse/collapse";
import { RootState } from "../../../redux/actions/typeAction";
import "./adminUserAccountPage.scss";
import { Chart } from "../../../components/charts/chart";

interface User {
	role: string;
	id: string;
	lastName: string;
	firstName: string;
	userName: string;
	email: string;
	createdAt: string;
	updatedAt: string;
	account: AccountData[];
}
interface AccountData {
	name: string;
	nbAccount: string;
	solde: number;
	_id: number;
	visible: boolean;
	operations: Operation[];
}
interface Operation {
	category: string;
	title: string;
	date: string;
	montant: number;
	description: string;
	_id: string;
}

export function AdminUserAccountPage() {
	const token = useSelector((state: RootState) => state.token.token);
	const id = useSelector((state: RootState) => state.user.id);
	const [allUsers, setAllUsers] = useState<User[]>([]);
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [montant, setMontant] = useState<number>(0);
	const [isModaleOpen, setIsModaleOpen] = useState<boolean>(false);

	const { nbAccount, userId } = useParams<{
		nbAccount: string;
		userId: string;
	}>();

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

	const target: User | undefined = allUsers.length
		? allUsers.find((location) => location.id === userId)
		: undefined;
	const targetAccount = target
		? target.account.find((nb) => nb.nbAccount === nbAccount)
		: undefined;
	const operations = targetAccount
		? targetAccount.operations.slice().reverse()
		: undefined;

	function closeAccount() {
		fetch("http://localhost:3001/api/v1/user/account/close", {
			method: "PUT",
			headers: {
				id: `${userId}`,
				idAccount: `${targetAccount?._id}`,
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
			idaccount: `${targetAccount?._id}`,
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

		fetch("http://localhost:3001/api/v1/user/account/operations", {
			method: "PUT",
			body: bodyContent,
			headers: headersList,
		});
	}

	if (targetAccount && target && targetAccount.visible === true) {
		return (
			<main className="main bg-dark">
				<ReactModal
					isOpen={isModaleOpen}
					className="Modal"
					overlayClassName="Overlay"
					ariaHideApp={!isModaleOpen}
					onRequestClose={() => setIsModaleOpen(false)}
					shouldCloseOnOverlayClick={true}
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
								onChange={(e) => setMontant(parseFloat(e.target.value))}
							/>
						</label>
						<input
							type="submit"
							className="buttonArgentBank modalButton"
							value="AJOUTER"
						/>
					</form>
				</ReactModal>
				<div className="header">
					<BackArrow chemin={`/admin/${userId}`} />
					<h1>
						{target?.lastName} {target?.firstName}
					</h1>

					<h3> " {target.userName} "</h3>
					<div className="infosClient">
						<p className="infosClient-id">Id User : {target.id}</p>
						<p className="infosClient-email">Email: {target.email}</p>
						<p className="infosClient-create">
							Date de création: {target.createdAt.slice(0, 10)}
						</p>
						<p className="infosClient-update">
							Dernière mise à jour du compte: {target.updatedAt.slice(0, 10)}
						</p>
					</div>
					<Button
						text={"+ add operation"}
						onClick={handlechange}
						type={""}
						to={""}
						className={""}
					/>
					<Chart />
				</div>

				<div className="account-adminUserAccountPage">
					<section className="entete-account">
						<p className="entete-account-description">{targetAccount.name}</p>
						<p className="entete-account-description">
							{targetAccount.nbAccount}
							<br />
							Id: {targetAccount._id}
						</p>
						<p className="entete-account-description">
							{targetAccount.solde.toFixed(2)} €
						</p>
						<span
							className="trash"
							data-descr="Close this account"
							onClick={closeAccount}
						>
							<i className="fa-solid fa-trash" style={{ color: "#12002b" }}></i>
						</span>
					</section>
					<section className="AllOperation-account">
						{operations?.map((data) =>
							data.description !== "undefined" ? (
								<Collapse
									title={data.title}
									date={data.date}
									montant={data.montant}
									description={data.description}
									key={data._id}
									operationId={data._id}
									idAccount={targetAccount._id}
									category={data.category}
								/>
							) : (
								<Collapse
									title={data.title}
									date={data.date}
									montant={data.montant}
									key={data.title}
									operationId={data._id}
									idAccount={targetAccount._id}
									description={""}
									category={data.category}
								/>
							)
						)}
					</section>
				</div>
			</main>
		);
	} else if (targetAccount && target && targetAccount.visible === false) {
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
						<p className="infosClient-email">Email: {target.email}</p>
						<p className="infosClient-create">
							Date de création: {target.createdAt.slice(0, 10)}
						</p>
						<p className="infosClient-update">
							Dernière mise à jour du compte: {target.updatedAt.slice(0, 10)}
						</p>
					</div>
				</div>

				<div className="account-adminUserAccountPage account-adminUserAccountPage-invisible">
					<section className="entete-account">
						<p className="entete-account-description">{targetAccount.name}</p>
						<p className="accountAdminUserPage-closed">
							Ce compte est cloturé !
						</p>
						<p className="entete-account-description">
							{targetAccount.nbAccount} <br />
							Id: {targetAccount._id}
						</p>
						<p className="entete-account-description">
							{targetAccount.solde.toFixed(2)} €
						</p>
					</section>
					<section className="AllOperation-account">
						{operations?.map((data) =>
							data.description !== "undefined" ? (
								<Collapse
									title={data.title}
									date={data.date}
									montant={data.montant}
									description={data.description}
									key={data.title}
									operationId={""}
									idAccount={0}
									category={data.category}
								/>
							) : (
								<Collapse
									title={data.title}
									date={data.date}
									montant={data.montant}
									key={data.title}
									description={""}
									operationId={""}
									idAccount={0}
									category={data.category}
								/>
							)
						)}
					</section>
				</div>
			</main>
		);
	} else {
		return <div>Loading...</div>; // Afficher un message de chargement
	}
}
