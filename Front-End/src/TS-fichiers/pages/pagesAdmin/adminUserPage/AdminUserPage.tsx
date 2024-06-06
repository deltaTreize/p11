import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BackArrow } from "../../../components/backArrow/backArrow";
import { Button } from "../../../components/button/button";
import { RootState } from "../../../redux/actions/typeAction";
import "./AdminUserPage.scss";
import { User, AccountData } from "../../../interfaces/interfaces";
import Spinner from "../../../components/spinner/spinner";

export function AdminUserPage() {
	const id = useSelector((state: RootState) => state.user.id);
	const token = useSelector((state: RootState) => state.token.token);
	const [target, setTarget] = useState<User>();
	const [name, setName] = useState<string>("");
	const [nbAccount, setNbAccount] = useState<string>("");
	const solde = 0.0;
	const [visible, setVisible] = useState<boolean>(false);
	const [isModaleOpen, setIsModaleOpen] = useState<boolean>(false);
	const [portefeuilleClient, setPortefeuilleClient] = useState<number>(0);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [valueOption1, setValueOption1] = useState<string>("");
	const [valueOption2, setValueOption2] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [montant, setMontant] = useState<number>(0);
	const { userId } = useParams();

	useEffect(() => {
		fetch(
			"https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user",
			{
				method: "GET",
				headers: {
					id: `${id}`,
				},
			}
		)
			.then((data) => data.json())
			.then((dataJson) => {
				let target = dataJson.body.find((user: User) => user.id === userId);
				let totalSolde = 0;
				target.account.forEach((data: AccountData) => {
					totalSolde += data.solde;
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

		fetch(
			"https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user/account",
			{
				method: "PUT",
				body: bodyContent,
				headers: headersList,
			}
		);
	}
	const today = new Date();

	function makeVirement() {
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
			montant: -montant,
		});
		fetch(
			"https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user/account/operations",
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
			montant: montant,
		});
		fetch(
			"https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user/account/operations",
			{
				method: "PUT",
				body: bodyContent2,
				headers: headersList2,
			}
		);
	}

	if (!target || target === undefined) {
		return <Spinner />;
	}
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
				<h2 className="titleModal">Ajouter un compte</h2>
				<form action="" className="formModal-addAccount" onSubmit={addAccount}>
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
						<input type="number" id="solde" value={solde} disabled />
					</label>
					<label htmlFor="visible">
						Compte invisible:
						<input
							type="checkbox"
							id="visible"
							onChange={(e) => setVisible(e.target.checked)}
						/>
					</label>
					<input
						type="submit"
						className="buttonArgentBank modalButton addAccount"
						value="AJOUTER"
					/>
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
				<form
					action=""
					className="formModal-makeVirement"
					onSubmit={makeVirement}
				>
					<label htmlFor="account1">
						Compte débiteur
						<select
							name="account1"
							id="account1"
							onChange={(e) => setValueOption1(e.target.value)}
						>
							<option value="">choisir le compte à débiter</option>
							{target.account.map((data) =>
								data.visible === true ? (
									<option value={data._id} key={"account1" + data._id}>
										{data.nbAccount} - {data.name} - {data.solde.toFixed(2)}
									</option>
								) : null
							)}
						</select>
					</label>
					<label htmlFor="account2">
						Compte créditeur
						<select
							name="account2"
							id="account2"
							onChange={(e) => setValueOption2(e.target.value)}
						>
							<option value="">choisir le compte à créditer</option>
							{target.account.map((data) =>
								data.visible === true &&
								data._id.toString() !== valueOption1 ? (
									<option value={data._id} key={"account2" + data._id}>
										{data.nbAccount} - {data.name} - {data.solde.toFixed(2)}
									</option>
								) : null
							)}
						</select>
					</label>
					<label htmlFor="solde">
						Montant
						<input
							type="number"
							id="solde"
							step={0.01}
							onChange={(e) => setMontant(parseFloat(e.target.value))}
						/>
					</label>
					<label htmlFor="title">
						Titre
						<input
							type="text"
							id="title"
							required
							onChange={(e) => setTitle(e.target.value)}
						/>
					</label>
					<label htmlFor="description">
						Description
						<input
							type="text"
							id="description"
							onChange={(e) => setDescription(e.target.value)}
						/>
					</label>
					<input
						type="submit"
						className="buttonArgentBank modalButton makeVirement"
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
					<p className="infosClient-id">Id Utilisateur : {target.id}</p>
					<p className="infosClient-email">Email : {target.email}</p>
					<p className="infosClient-create">
						Date de création : {target.createdAt.slice(0, 10)}
					</p>
					<p className="infosClient-update">
						Dernière mise à jour du compte : {target.updatedAt.slice(0, 10)}
					</p>
				</div>
				<p className="portefeuilleClient">
					La valeur bancaire du client est de : {portefeuilleClient.toFixed(2)}{" "}
					€
				</p>
				<Button
					className="addAccount"
					text={"+ add Account"}
					onClick={handlechange}
					type={""}
					to={""}
				/>
				<Button
					className="virementButtonAdmin"
					text={"Effectuer un virement"}
					onClick={() => setIsModalOpen(!isModalOpen)}
					type={""}
					to={""}
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
							<p className="accountAdminUserPage-name">{data.name}</p>
							<p className="accountAdminUserPage-nbAccount">
								N° de compte: {data.nbAccount}
								<br />
								Id: {data._id}
							</p>
							<p className="accountAdminUserPage-solde">
								{data.solde.toFixed(2)} €
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
							<p className="accountAdminUserPage-name">{data.name}</p>
							<p className="accountAdminUserPage-closed">
								Ce compte est cloturé !
							</p>
							<p className="accountAdminUserPage-nbAccount">
								N° de compte: {data.nbAccount}
								<br />
								Id: {data._id}
							</p>
							<p className="accountAdminUserPage-solde">
								{data.solde.toFixed(2)} €
							</p>
						</div>
					</Link>
				)
			)}
		</main>
	);
}
