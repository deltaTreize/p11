import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { BackArrow } from "../../../components/backArrow/backArrow";
import { Button } from "../../../components/button/button";
import { RootState } from "../../../redux/actions/typeAction";
import "./userPage.scss";

interface AccountData {
	firstName: string;
	name: string;
	nbAccount: string;
	solde: number;
	_id: number;
	visible: boolean;
	operations: Operation[];
}
interface Operation {
	title: string;
	date: string;
	montant: number;
	description: string;
	_id: string;
}

export function User() {
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const lastName = useSelector((state: RootState) => state.user.lastName);
	const userId = useSelector((state: RootState) => state.user.id);
	const role = useSelector((state: RootState) => state.user.role);
	const admin = role === "admin" ? true : false;
	const token = useSelector((state: RootState) => state.token.token);
	const [dataUsers, setDataUsers] = useState<AccountData[]>([]);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [valueOption1, setValueOption1] = useState<number>(0);
	const [valueOption2, setValueOption2] = useState<number>(0);
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [montant, setMontant] = useState<number>(0);


	useEffect(() => {
		if (token) {
			fetch("http://localhost:3001/api/v1/user/profile", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((alldata) => alldata.json())
				.then((data) => {
					setDataUsers(data.body.account);
				});
		}
	}, [token]);

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
			montant: -montant,
		});
		fetch("http://localhost:3001/api/v1/user/account/operations", {
			method: "PUT",
			body: bodyContent1,
			headers: headersList1,
		});

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
		fetch("http://localhost:3001/api/v1/user/account/operations", {
			method: "PUT",
			body: bodyContent2,
			headers: headersList2,
		});
	}

	return (
		<main className="main bg-dark">
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
						onChange={(e) => setValueOption1(parseFloat(e.target.value))}
					>
						<option value="">choisir le compte à débiter!</option>
						{dataUsers.map((data) =>
							data.visible === true ? (
								<option value={data._id} key={"account1" + data._id}>
									{data.nbAccount} - {data.name} - {data.solde.toFixed(2)}
								</option>
							) : null
						)}
					</select>
					<label htmlFor="account2">Compte créditeur :</label>
					<select
						name="account2"
						id="account2"
						onChange={(e) => setValueOption2(parseFloat(e.target.value))}
					>
						<option value="">choisir le compte à créditer!</option>
						{dataUsers.map((data) =>
							data.visible === true && data._id !== valueOption1 ? (
								<option value={data._id} key={"account2" + data._id}>
									{data.nbAccount} - {data.name} - {data.solde.toFixed(2)}
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
							onChange={(e) => setMontant(parseFloat(e.target.value))}
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
				<BackArrow chemin={"/"} />
				<h1>
					Bienvenue
					<br />
					{firstName} {lastName}
				</h1>
				{!admin && (
					<Button
						className="virementButton"
						text={"Effectuer un virement"}
						onClick={() => setIsModalOpen(!isModalOpen)}
						type={""}
						to={""}
					/>
				)}
				{admin && (
					<Button
						to={"/admin"}
						text="View All Users"
						type={""}
						className={""}
						onClick={function (
							event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
						): void {
							throw new Error("Function not implemented.");
						}}
					/>
				)}
				{!admin && (
					<Button
						to={`/edit/${userId}`}
						text="Modifier Profil"
						type={""}
						className={""}
						onClick={function (
							event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
						): void {
							throw new Error("Function not implemented.");
						}}
					/>
				)}
			</div>
			{dataUsers.map((data) =>
				data.visible === true ? (
					<section
						className="account-userPage"
						key={firstName + data.nbAccount}
					>
						<div className="account-userPage-wrapper">
							<p className="account-amount-nbAccount">{data.nbAccount}</p>
							<h3 className="account-title">{data.name}</h3>
							<p className="account-amount">{data.solde.toFixed(2)}€</p>
						</div>
						<div className="account-content-wrapper cta">
							<Button
								to={`/user/${userId}/${data.nbAccount}`}
								text="View transactions"
								type={""}
								className={""}
								onClick={function (
									event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
								): void {
									throw new Error("Function not implemented.");
								}}
							/>
						</div>
					</section>
				) : null
			)}
		</main>
	);
}
