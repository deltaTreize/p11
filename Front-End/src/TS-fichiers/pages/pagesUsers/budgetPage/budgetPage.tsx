import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BudgetComponent } from "../../../components/budgetComponent/budgetComponent";
import { RootState } from "../../../redux/actions/typeAction";
import "./budgetPage.scss";

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
	budget: BudgetModel[];
}

interface BudgetModel {
	name: string;
	value: number;
}
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
	category: string;
}

export function Budget() {
	const token = useSelector((state: RootState) => state.token.token);
	const role = useSelector((state: RootState) => state.user.role);
	const [dataUsers, setDataUsers] = useState<User>();
	const id = useSelector((state: RootState) => state.user.id);
	const date = new Date();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	useEffect(() => {
		if (role === "user") {
			fetch("http://localhost:3001/api/v1/user/profile", {
				method: "POST",
				headers: {
					Authorization: "Bearer " + token,
				},
			})
				.then((alldata) => alldata.json())
				.then((data) => {
					setDataUsers(data.body);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, id]);

	const budgetLoyer = dataUsers?.budget.find(
		(Budget) => Budget.name === "loyer"
	);

	const budgetFraisBancaires = dataUsers?.budget.find(
		(Budget) => Budget.name === "frais bancaires"
	);
	const budgetTelephonie = dataUsers?.budget.find(
		(Budget) => Budget.name === "telephonie"
	);
	const budgetAlimentation = dataUsers?.budget.find(
		(Budget) => Budget.name === "alimentation"
	);
	const budgetAssurances = dataUsers?.budget.find(
		(Budget) => Budget.name === "assurances"
	);
	const budgetSante = dataUsers?.budget.find(
		(Budget) => Budget.name === "sante"
	);
	const budgetPension = dataUsers?.budget.find(
		(Budget) => Budget.name === "pension"
	);
	const budgetTransport = dataUsers?.budget.find(
		(Budget) => Budget.name === "transport"
	);
	const budgetSalaire = dataUsers?.budget.find(
		(Budget) => Budget.name === "salaire"
	);

	const target = dataUsers?.account.find(
		(Account) => Account.name === "Compte courant"
	);

	const categories = new Set(
		target?.operations?.map((operation) => operation.category)
	);
	categories.delete("null");
	categories.delete("salaire");
	categories.delete("undefined");

	const categorieArray: string[] = Array.from(categories);

	const operations: Operation[] = [];
	target?.operations?.forEach((operation) => {
		if (operation.date.includes(`${year}-0${month}`)) {
			operations.push(operation);
		}
	});

	const transport = operations?.filter(
		(operation) => operation.category === "transport"
	);
	const pension = operations?.filter(
		(operation) => operation.category === "pension"
	);
	const sante = operations?.filter(
		(operation) => operation.category === "sante"
	);
	const assurances = operations?.filter(
		(operation) => operation.category === "assurances"
	);
	const alimentation = operations?.filter(
		(operation) => operation.category === "alimentation"
	);
	const telephonie = operations?.filter(
		(operation) => operation.category === "telephonie"
	);
	const fraisBancaires = operations?.filter(
		(operation) => operation.category === "frais bancaires"
	);
	const loyers = operations?.filter(
		(operation) => operation.category === "loyer"
	);
	const salaires = operations?.filter(
		(operation) => operation.category === "salaire"
	);

	let transportMontant: number = 0;
	transport?.forEach((operation) => {
		transportMontant += operation.montant;
	});

	let pensionMontant: number = 0;
	pension?.forEach((operation) => {
		pensionMontant += operation.montant;
	});

	let santeMontant: number = 0;
	sante?.forEach((operation) => {
		santeMontant += operation.montant;
	});

	let assurancesMontant: number = 0;
	assurances?.forEach((operation) => {
		assurancesMontant += operation.montant;
	});

	let alimentationMontant: number = 0;
	alimentation?.forEach((operation) => {
		alimentationMontant += operation.montant;
	});

	let telephonieMontant: number = 0;
	telephonie?.forEach((operation) => {
		telephonieMontant += operation.montant;
	});

	let fraisBancairesMontant: number = 0;
	fraisBancaires?.forEach((operation) => {
		fraisBancairesMontant += operation.montant;
	});

	let loyersMontant: number = 0;
	loyers?.forEach((operation) => {
		loyersMontant += operation.montant;
	});

	let salairesMontant: number = 0;
	salaires?.forEach((operation) => {
		salairesMontant += operation.montant;
	});

	const montantsParCategorie = {
		transport: transportMontant.toFixed(2),
		pension: pensionMontant.toFixed(2),
		sante: santeMontant.toFixed(2),
		assurances: assurancesMontant.toFixed(2),
		alimentation: alimentationMontant.toFixed(2),
		telephonie: telephonieMontant.toFixed(2),
		"frais bancaires": fraisBancairesMontant.toFixed(2),
		loyer: loyersMontant.toFixed(2),
	} as any;

	const budgetParCategorie = {
		transport: budgetTransport?.value.toFixed(2),
		pension: budgetPension?.value.toFixed(2),
		sante: budgetSante?.value.toFixed(2),
		assurances: budgetAssurances?.value.toFixed(2),
		alimentation: budgetAlimentation?.value.toFixed(2),
		telephonie: budgetTelephonie?.value.toFixed(2),
		"frais bancaires": budgetFraisBancaires?.value.toFixed(2),
		loyer: budgetLoyer?.value.toFixed(2),
	} as any;

	const totalBudgetisé: number = [
		budgetTransport?.value ?? 0,
		budgetPension?.value ?? 0,
		budgetSante?.value ?? 0,
		budgetAssurances?.value ?? 0,
		budgetAlimentation?.value ?? 0,
		budgetTelephonie?.value ?? 0,
		budgetFraisBancaires?.value ?? 0,
		budgetLoyer?.value ?? 0,
	].reduce((acc, curr) => acc + curr, 0);

	const totalDejaDepense: number = [
		Math.abs(transportMontant) ?? 0,
		Math.abs(pensionMontant) ?? 0,
		Math.abs(assurancesMontant) ?? 0,
		Math.abs(alimentationMontant) ?? 0,
		Math.abs(telephonieMontant) ?? 0,
		Math.abs(fraisBancairesMontant) ?? 0,
		Math.abs(loyersMontant) ?? 0,
	].reduce((acc, curr) => acc + curr, 0);

	return (
		<div className="main bg-dark budgetMain">
			<h1 className="title-budget">Mon Budget</h1>
			<div className="charts-wrapper">
				<div className="allCharts">
					{categorieArray.map((categorie) => {
						const montantCategorie = montantsParCategorie[categorie];
						const budgetCategorie = budgetParCategorie[categorie];
						return (
							<BudgetComponent
								categorie={categorie}
								montantCategorie={montantCategorie}
								budgetCategorie={budgetCategorie}
							/>
						);
					})}
				</div>
				<div className="budget-wrapper">
					<div className="budget-wrapper-depensé">
						<p>Vous avez budgétisé</p>
						<p className="number">{totalBudgetisé.toFixed(2)}€</p>
						<p>Sur un salaire de</p>
						<p className="number">{salairesMontant.toFixed(2)}€</p>
						<p>
							Il vous reste:{" "}
							<span className="number">
								{(salairesMontant - totalBudgetisé).toFixed(2)}€
							</span>
						</p>
						<p>de disponible dans votre budget mensuel!</p>
					</div>
					<div className="budget-wrapper-pourcentage">
						<p>Vous avez dépensé:</p>
						<p className="number">{totalDejaDepense.toFixed(2)}€</p>
						<p>
							Il vous reste: {" "}
							<span className="number">
								{(totalBudgetisé - totalDejaDepense).toFixed(2)}€
							</span>
						</p>
						<p className="paragraphe"> à dépenser</p>
						<p>
							Pourcentage du budget non dépensé: <br/>
							<span className="number">{(
								((totalBudgetisé - totalDejaDepense) / totalBudgetisé) *
								100
							).toFixed(2)}
							%</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
