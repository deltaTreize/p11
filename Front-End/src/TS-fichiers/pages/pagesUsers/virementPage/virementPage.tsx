import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { BeneficiairesExterne } from "../../../components/beneficiaires/beneficiaires";
import { Button } from "../../../components/button/button";
import {
	UpdateAccount,
	UpdateBeneficiaires,
	UpdateCategory,
} from "../../../redux/actions/action";
import { AuthActionTypes, RootState } from "../../../redux/actions/typeAction";
import "./virementPage.scss";
import { Link } from "react-router-dom";
import { Category } from "../../../components/category/category";

export function VirementPage() {
	const userId = useSelector((state: RootState) => state.user.id);
	const account = useSelector((state: RootState) => state.user.account);
	const token = useSelector((state: RootState) => state.token.token);
	const beneficiairesExternesList = useSelector(
		(state: RootState) => state.user.beneficiairesExternes
	);
	const categorieArray = useSelector((state: RootState) => state.user.category);
	const [valueOption1, setValueOption1] = useState<string>("");
	const [valueOption2, setValueOption2] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [category, setCategory] = useState<string>("");
	const [montant, setMontant] = useState<number>(0);
	const [isAsideAddBeneficiaireShow, setIsAsideAddBeneficiaireShow] = useState<boolean>(false);
	const [isAsideAddCategoryShow, setIsAsideAddCategoryShow] = useState<boolean>(false);
	const [newBeneficiaireName, setNewBeneficiaireName] = useState<string>("");
	const [newCategoryName, setNewCategoryName] = useState<string>("");
	const [newBeneficiaireIban, setNewBeneficiaireIban] = useState<string>("");
	const dispatch: Dispatch<AuthActionTypes> = useDispatch();



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
			category: `${category}`,
			montant: -montant,
		});
		const response = await fetch(
			`${process.env.REACT_APP_IP_API}/api/v1/user/account/operations`,
			{
				method: "PUT",
				body: bodyContent1,
				headers: headersList1,
			}
		);

		const data = await response.json();

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
			category: `${category}`,
			montant: montant,
		});
		const response2 = await fetch(
			`${process.env.REACT_APP_IP_API}/api/v1/user/account/operations`,
			{
				method: "PUT",
				body: bodyContent2,
				headers: headersList2,
			}
		);

		const data2 = await response2.json();

		if (data2.status === 200 && data.status === 200) {
			fetch(
				`${process.env.REACT_APP_IP_API}/api/v1/user/profile`,
				{
					method: "POST",
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			)
				.then((alldata) => alldata.json())
				.then((data) => {
					dispatch(UpdateAccount(data.body.account));
				});
		}
	}

	async function addBeneficiaire() {
		let body = JSON.stringify({
			name: `${newBeneficiaireName}`,
			rib: `${newBeneficiaireIban}`,
		});
		const data = await fetch(
			`${process.env.REACT_APP_IP_API}/api/v1/user/beneficiaires`,
			{
				method: "PUT",
				headers: {
					id: `${userId}`,
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				body: body,
			}
		);
		const dataJson = await data.json();

		dispatch(UpdateBeneficiaires(dataJson.body.beneficiairesExternes));
		setNewBeneficiaireName("");
		setNewBeneficiaireIban("");
		setIsAsideAddBeneficiaireShow(!isAsideAddBeneficiaireShow);
	}
	
	async function addCategory() {
		let body = JSON.stringify({
			name: `${newCategoryName}`,
		});
		const data = await fetch(
			`${process.env.REACT_APP_IP_API}/api/v1/user/category`,
			{
				method: "PUT",
				headers: {
					id: `${userId}`,
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				body: body,
			}
		);
		const dataJson = await data.json();
console.log(dataJson.body);

		dispatch(UpdateCategory(dataJson.body.category));
		setNewCategoryName("");
		setIsAsideAddCategoryShow(!isAsideAddCategoryShow);
	}

	const handleDeleteBeneficiaire = async (rib: string) => {
		const data = await fetch(
			`${process.env.REACT_APP_IP_API}/api/v1/user/beneficiaires`,
			{
				method: "DELETE",
				headers: {
					id: `${userId}`,
					iban: `${rib}`,
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
			}
		);
		const dataJson = await data.json();
		dispatch(UpdateBeneficiaires(dataJson.body.beneficiairesExternes));
	};

	const handleModifyBeneficiaire = async (
		oldRib: string,
		name: string,
		rib: string
	) => {
		const data = await fetch(
			`${process.env.REACT_APP_IP_API}/api/v1/user/beneficiaires/modifier`,
			{
				method: "PUT",
				headers: {
					id: `${userId}`,
					rib: `${oldRib}`,
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: `${name}`, rib: `${rib}` }),
			}
		);
		const dataJson = await data.json();

		dispatch(UpdateBeneficiaires(dataJson.body.beneficiairesExternes));
	};

	const handleDeleteCategory = async (name: string) => {
		const data = await fetch(
			`${process.env.REACT_APP_IP_API}/api/v1/user/category`,
			{
				method: "DELETE",
				headers: {
					id: `${userId}`,
					name: `${name}`,
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
			}
		);
		const dataJson = await data.json();
		dispatch(UpdateCategory(dataJson.body.category));
	};

	const handleModifyCategory = async (
		name: string,
		oldName: string
	) => {
		console.log(name, oldName);
		
		const data = await fetch(
			`${process.env.REACT_APP_IP_API}/api/v1/user/category/modifier`,
			{
				method: "PUT",
				headers: {
					id: `${userId}`,
					name: `${oldName}`,
					Authorization: "Bearer " + token,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name: `${name}` }),
			}
		);
		const dataJson = await data.json();

		dispatch(UpdateCategory(dataJson.body.category));
	};

	return (
		<div className="main bg-dark">
			<aside className={`asideAdd${isAsideAddBeneficiaireShow ? "-show" : ""}`}>
				<i
					className="fa-solid fa-x"
					style={{ color: "#2c3e50" }}
					onClick={() => setIsAsideAddBeneficiaireShow(!isAsideAddBeneficiaireShow)}
				></i>
				<h2 className="aside-title">AJOUTER UN BENEFICIAIRE</h2>
				<form action="">
					<label htmlFor="name">
						nom du bénéficiaire
						<input
							type="text"
							name="name"
							id="name"
							autoComplete="off"
							required
							onChange={(e) => setNewBeneficiaireName(e.target.value)}
						/>
					</label>
					<label htmlFor="IBAN">
						IBAN
						<input
							type="text"
							name="IBAN"
							id="IBAN"
							maxLength={27}
							minLength={27}
							autoComplete="off"
							autoCapitalize="characters"
							required
							onChange={(e) => setNewBeneficiaireIban(e.target.value)}
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
			<aside className={`asideAdd${isAsideAddCategoryShow ? "-show" : ""}`}>
				<i
					className="fa-solid fa-x"
					style={{ color: "#2c3e50" }}
					onClick={() => setIsAsideAddCategoryShow(!isAsideAddCategoryShow)}
				></i>
				<h2 className="aside-title">AJOUTER UNE CATEGORIE</h2>
				<form action="">
					<label htmlFor="name">
						nom de la catégorie
						<input
							value={newCategoryName}
							type="text"
							name="name"
							id="name"
							autoComplete="off"
							required
							onChange={(e) => setNewCategoryName(e.target.value)}
						/>
					</label>
					<Button
						type={"submit"}
						to={""}
						text={"Ajouter"}
						className={"submitAddCategory"}
						onClick={addCategory}
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
									Compte débiteur
								</label>
								<select
									name="account1"
									id="account1"
									onChange={(e) => setValueOption1(e.target.value)}
								>
									<option value="">choisir le compte à débiter</option>
									{account.map((data) =>
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
									Compte créditeur
								</label>
								<select
									name="account2"
									id="account2"
									onChange={(e) => setValueOption2(e.target.value)}
								>
									<option value="">choisir le compte à créditer</option>
									{account.map((data) =>
										data.visible === true &&
										data._id.toString() !== valueOption1 ? (
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
						</div>
						<div className="description">
							<label htmlFor="description">
								Description
								<input
									id="description"
									onChange={(e) => setDescription(e.target.value)}
								/>
							</label>
							<label htmlFor="category">
								Catégorie
								<select
									id="category"
									onChange={(e) => setCategory(e.target.value)}
								>
									{categorieArray.map((data) => (
										<option value={data.name} key={"category" + data}>
											{data.name}
										</option>
									))}
								</select>
							</label>
						</div>
						<input
							type="submit"
							className="buttonArgentBank modalButton"
							value="EFFECTUER LE VIREMENT"
						/>
					</form>
				</div>
				<div className="wrapper-beneficiaires">
					<div className="wrapper-beneficiaires-beneficiaires">
						<div className="wrapper-beneficiaires-beneficiaires-header">
							<h2>B&Eacute;N&Eacute;FICIAIRES</h2>
							<Link
								type={"button"}
								to={""}
								className={"buttonArgentBank addBeneficiaire"}
								onClick={() => {
									setIsAsideAddBeneficiaireShow(!isAsideAddBeneficiaireShow);
								}}
							>
								<i className="fa-solid fa-plus"></i>
							</Link>
						</div>
						<div className="wrapper-beneficiaires-beneficiaires-list">
							{beneficiairesExternesList.map((data) => (
								<BeneficiairesExterne
									name={data.name}
									rib={data.rib}
									key={data.rib}
									onDelete={handleDeleteBeneficiaire}
									onModify={handleModifyBeneficiaire}
								/>
							))}
						</div>
					</div>
					<div className="wrapper-beneficiaires-category">
						<div className="wrapper-beneficiaires-category-header">
							<h2>CAT&Eacute;GORIE</h2>
							<Link
								type={"button"}
								to={""}
								className={"buttonArgentBank addCategory"}
								onClick={() => {
									setIsAsideAddCategoryShow(!isAsideAddCategoryShow);
								}}
							>
								<i className="fa-solid fa-plus"></i>
							</Link>
						</div>
						<div className="wrapper-beneficiaires-category-list">
							<ul>
								{categorieArray.map((data) => (
									<Category
										name={data.name}
										onDelete={handleDeleteCategory}
										onModify={handleModifyCategory}
										key={data.name}
									/>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
