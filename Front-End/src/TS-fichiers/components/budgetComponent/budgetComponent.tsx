import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/actions/typeAction";
import { ChartBudget } from "../charts/chartBudget";
import "./budgetComponent.scss";
import { BudgetModel } from "../../interfaces/interfaces";

interface Props {
	categorie: string;
	montantCategorie: number;
}

export function BudgetComponent({ categorie, montantCategorie }: Props) {
	const token = useSelector((state: RootState) => state.token.token);
	const id = useSelector((state: RootState) => state.user.id);
	const role = useSelector((state: RootState) => state.user.role);
	const [budgetArray, setBudgetArray] = useState<BudgetModel[]>([]);
	const [budgetValue, setBudgetValue] = useState<number>(0);
	const [displayInputBudgetValue, setDisplayInputBudgetValue] =
		useState<boolean>(false);
	const show = displayInputBudgetValue ? "flex" : "none";
	const[counter, setCounter] = useState<number>(0);

	useEffect(() => {
		if (role === "user") {
			fetch(
				"https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user/profile",
				{
					method: "POST",
					headers: {
						Authorization: "Bearer " + token,
					},
				}
			)
				.then((alldata) => alldata.json())
				.then((data) => {
					setBudgetArray(data.body.budget);
				});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [token, id, counter]);

	const budgetLoyer = budgetArray.find((Budget) => Budget.name === "loyer");

	const budgetFraisBancaires = budgetArray.find(
		(Budget) => Budget.name === "frais bancaires"
	);
	const budgetTelephonie = budgetArray.find(
		(Budget) => Budget.name === "telephonie"
	);
	const budgetAlimentation = budgetArray.find(
		(Budget) => Budget.name === "alimentation"
	);
	const budgetAssurances = budgetArray.find(
		(Budget) => Budget.name === "assurances"
	);
	const budgetSante = budgetArray.find((Budget) => Budget.name === "sante");
	const budgetPension = budgetArray.find((Budget) => Budget.name === "pension");
	const budgetTransport = budgetArray.find(
		(Budget) => Budget.name === "transport"
	);
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

	const budgetCategorie = budgetParCategorie[categorie];

	function updateBudget(argument: string) {
		let headersList = {
			id: id,
			category: argument,
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};
		let bodyContent = JSON.stringify({
			value: budgetValue,
		});

		fetch(
			"https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user/budget",
			{
				method: "PUT",
				body: bodyContent,
				headers: headersList,
			}
		).then(() => {
			setDisplayInputBudgetValue(!displayInputBudgetValue);
			setCounter(counter + 1);
		})
	}

	return (
		<div className="chartCategorie" key={categorie}>
			<h2 className="title-budget-chart">
				{categorie.toUpperCase()}{" "}
				<i
					className="fa-solid fa-sliders fa-rotate-90 modif-budget"
					style={{ color: "#2c3e50" }}
					onClick={() => setDisplayInputBudgetValue(!displayInputBudgetValue)}
				></i>
			</h2>
			<div className="input-budget-wrapper">
				<input
					type="number"
					className="input-budget"
					onChange={(e) => setBudgetValue(Number(e.target.value))}
					value={budgetValue}
					style={{ display: show }}
				/>
				<i
					className="fa-solid fa-check validate-budget"
					style={{ display: show }}
					onClick={() => updateBudget(categorie)}
				></i>
			</div>
			<ChartBudget
				categoryName={categorie}
				categoryValue={Math.abs(montantCategorie)}
				categoryBudget={budgetCategorie}
			/>
			<div className="charts-info">
				<p
					className="info-budget-up"
					style={{
						color:
							Math.abs(montantCategorie) > budgetCategorie ? "red" : "green",
					}}
				>
					{Math.abs(montantCategorie).toFixed(2)}€{" "}
				</p>
				<p
					className="info-budget-down"
					style={{
						color:
							Math.abs(montantCategorie) > budgetCategorie ? "red" : "green",
					}}
				>
					{budgetCategorie}€
				</p>
			</div>
		</div>
	);
}
