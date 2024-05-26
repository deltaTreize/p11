import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/actions/typeAction";
import { ChartBudget } from "../charts/chartBudget";

import "./budgetComponent.scss";

interface Props {
	categorie: string;
	montantCategorie: number;
	budgetCategorie: number;
}

export function BudgetComponent({
	categorie,
	montantCategorie,
	budgetCategorie,
}: Props) {
	const token = useSelector((state: RootState) => state.token.token);
	const id = useSelector((state: RootState) => state.user.id);
	const [budgetValue, setBudgetValue] = useState<number>(0);
	const [displayInputBudgetValue, setDisplayInputBudgetValue] =
		useState<boolean>(false);
	const show = displayInputBudgetValue ? "flex" : "none";

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

			fetch("http://localhost:3001/api/v1/user/budget", {
				method: "PUT",
				body: bodyContent,
				headers: headersList,
			})
			setDisplayInputBudgetValue(!displayInputBudgetValue);
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
