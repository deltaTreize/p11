import React, { useEffect, useState } from "react";
import "./virementPage.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/actions/typeAction";
import { Button } from "../../../components/button/button";

export function VirementPage() {
	const [valueOption1, setValueOption1] = useState<string>("");
	const [valueOption2, setValueOption2] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [montant, setMontant] = useState<number>(0);
	const [dataUsers, setDataUsers] = useState<AccountData[]>([]);
	const [isAsideAddShow, setIsAsideAddShow] = useState<boolean>(false);
	const [beneficiairesExternesList, setBeneficiairesExternesList] = useState<
		BeneficiairesExternes[]
	>([]);
	const [newBeneficiaireName, setNewBeneficiaireName] = useState<string>("");
	const [newBeneficiaireIban, setNewBeneficiaireIban] = useState<string>("");
	const token = useSelector((state: RootState) => state.token.token);
	const userId = useSelector((state: RootState) => state.user.id);

	interface AccountData {
		firstName: string;
		name: string;
		nbAccount: string;
		solde: number;
		_id: string;
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

	interface BeneficiairesExternes {
		name: string;
		rib: string;
	}

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
					setBeneficiairesExternesList(data.body.beneficiairesExternes);
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

	function addBeneficiaire() {
		let body = JSON.stringify({
			name: `${newBeneficiaireName}`,
			rib: `${newBeneficiaireIban}`,
		});
		fetch("http://localhost:3001/api/v1/user/beneficiaires", {
			method: "PUT",
			headers: {
				id: `${userId}`,
				Authorization: "Bearer " + token,
				"Content-Type": "application/json",
			},
			body: body,
		});
	}

	function modifierBeneficiaire(name: string, rib: string) {

	}

	return (
		<div className="main bg-dark">
			<aside className={`asideAdd${isAsideAddShow ? "-show" : ""}`}>
				<i
					className="fa-solid fa-x"
					style={{ color: "#2c3e50" }}
					onClick={() => setIsAsideAddShow(!isAsideAddShow)}
				></i>
				<h2 className="aside-title">AJOUTER UN BENEFICIAIRE</h2>
				<form action="">
					<label htmlFor="name">
						nom du bénéficiaire :
						<input
							type="text"
							name="name"
							id="name"
							autoComplete="off"
							onChange={(e) => setNewBeneficiaireName(e.target.value)}
							required
						/>
					</label>
					<label htmlFor="IBAN">
						IBAN :
						<input
							type="text"
							name="IBAN"
							id="IBAN"
							maxLength={27}
							minLength={27}
							autoComplete="off"
							autoCapitalize="characters"
							onChange={(e) => setNewBeneficiaireIban(e.target.value)}
							required
						/>
					</label>
					<Button
						type={"submit"}
						to={""}
						text={"Ajouter"}
						className={"submitAddBeneficiaire"}
						onClick={addBeneficiaire}
					/>
				</form>
			</aside>
			<div className="wrapper">
				<div className="wrapper-virement">
					<h2 className="titleModal">Effectuer un virement</h2>
					<form action="" className="formModal" onSubmit={makeVirement}>
						<div className="choix">
							<div className="debiteur">
								<label htmlFor="account1" className="label-account">
									Compte débiteur :
								</label>
								<select
									name="account1"
									id="account1"
									onChange={(e) => setValueOption1(e.target.value)}
								>
									<option value="">choisir le compte à débiter!</option>
									{dataUsers.map((data) =>
										data.visible === true ? (
											<option value={data._id} key={"account1" + data._id}>
												{data.nbAccount} - {data.name} - {data.solde.toFixed(2)}{" "}
												€
											</option>
										) : null
									)}
								</select>
							</div>
							<i
								className="fa-solid fa-arrow-right-arrow-left"
								style={{ color: "#2c3e50" }}
							></i>
							<div className="crediteur">
								<label htmlFor="account2" className="label-account">
									Compte créditeur :
								</label>
								<select
									name="account2"
									id="account2"
									onChange={(e) => setValueOption2(e.target.value)}
								>
									<option value="">choisir le compte à créditer!</option>
									{dataUsers.map((data) =>
										data.visible === true && data._id !== valueOption1 ? (
											<option value={data._id} key={"account2" + data._id}>
												{data.nbAccount} - {data.name} - {data.solde.toFixed(2)}{" "}
												€
											</option>
										) : null
									)}
									&&
									{beneficiairesExternesList.map((data) => (
										<option value={data.name} key={"account1" + data.name}>
											{data.name} - {data.rib}
										</option>
									))}
								</select>
							</div>
						</div>
						<div className="infos">
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
						</div>
						<div className="description">
							<label htmlFor="description">Description :</label>
							<textarea
								id="description"
								onChange={(e) => setDescription(e.target.value)}
							/>
						</div>
						<input
							type="submit"
							className="buttonArgentBank modalButton"
							value="EFFECTUER LE VIREMENT"
						/>
					</form>
				</div>
				<div className="wrapper-beneficiaires">
					<div className="wrapper-beneficiaires-header">
						<h2>B&Eacute;N&Eacute;FICIAIRES</h2>
						<Button
							type={"button"}
							to={""}
							text={"+"}
							className={"addBeneficiaire"}
							onClick={() => {
								setIsAsideAddShow(!isAsideAddShow);
							}}
						/>
					</div>
					<div className="wrapper-beneficiaires-list">
						<ul>
							{beneficiairesExternesList.map((data) => (
								<li key={data.name + data.rib}>
									<p className="beneficiaire-name">{data.name}</p> 
									<p>{data.rib.replace(/(.{4})(?=.)/g,"$1 ")}</p>
									<i
						className="fa-solid fa-pencil"
						style={{
							color: "#fff",
						}}
						onClick={() => {modifierBeneficiaire(data.name, data.rib)}}
					></i>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
