import { React, useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { Button } from "../../../components/button/button.jsx";
import { BackArrow } from "../../../components/backArrow/backArrow";

import "./userPage.scss";

export function User() {
	const firstName = useSelector((state) => state.allReducer.user.firstName);
	const lastName = useSelector((state) => state.allReducer.user.lastName);
	const userId = useSelector((state) => state.allReducer.user.id);
	const admin = useSelector((state) => state.allReducer.admin);
	const token = useSelector((state) => state.allReducer.token);
	const [dataUsers, setDataUsers] = useState([]);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [valueOption1, setValueOption1] = useState();
	const [valueOption2, setValueOption2] = useState();
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [montant, setMontant] = useState();

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
						onChange={(e) => setValueOption1(e.target.value)}
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
						onChange={(e) => setValueOption2(e.target.value)}
					>
						<option value="">choisir le compte à créditer!</option>
						{dataUsers.map((data) =>
							data.visible === true &&
							data._id !== valueOption1 ? (
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
					/>
				)}
				{admin && <Button to={"/admin"} text="View All Users" />}
				{!admin && (
					<Button to={`/edit/${userId}`} text="Modifier Profil" />
				)}
			</div>
			{dataUsers.map((data) =>
				data.visible === true ? (
					<section
						className="account-userPage"
						key={firstName + data.nbAccount}
					>
						<div className="account-userPage-wrapper">
							<p className="account-amount-nbAccount">
								{data.nbAccount}
							</p>
							<h3 className="account-title">{data.name}</h3>
							<p className="account-amount">{data.solde.toFixed(2)}€</p>
						</div>
						<div className="account-content-wrapper cta">
							<Button
								to={`/user/${userId}/${data.nbAccount}`}
								text="View transactions"
							/>
						</div>
					</section>
				) : null
			)}
		</main>
	);
}
