import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import "./collapse.scss";

export function Collapse({ title, date, description, montant, operationId, idAccount }) {
	const [descripDisplay, setDescripDisplay] = useState(false);
	const [isDisabled, setIsDisabled] = useState(true);
	const [inputValue, setInputValue] = useState("");
	const [pencilDisplay, setPencilDisplay] = useState(true);
	const token = useSelector((state) => state.allReducer.token);
	const { userId } = useParams();

	async function updateDescription() {
		setIsDisabled(!isDisabled);
		let headersList = {
			id: `${userId}`,
			idaccount: `${idAccount}`,
			operationid: `${operationId}`,
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			description: `${inputValue}`,
		});
		let response = await fetch(
			"http://localhost:3001/api/v1/user/account/operations/description",
			{
				method: "PUT",
				body: bodyContent,
				headers: headersList,
			}
			);
		}

	return (
		<div className="operation-account">
			<p className="operation-account-date">{date}</p>
			<div className="operation-account-infos">
				<p className="operation-account-infos-title">{title}</p>
				<div
					className="operation-account-infos-description"
					style={{
						display: descripDisplay === true ? "flex" : "none",
					}}
				>
					<input
						placeholder={description}
						value={inputValue}
						disabled={isDisabled}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<i
						className="fa-solid fa-pencil"
						style={{
							display: pencilDisplay === true ? "flex" : "none",
						}}
						onClick={() => {
							setPencilDisplay(!pencilDisplay);
							setIsDisabled(!isDisabled);
						}}
					></i>
					<i
						className="fa-solid fa-check"
						style={{
							display: pencilDisplay === true ? "none" : "flex",
						}}
						onClick={() => {
							updateDescription();
							setPencilDisplay(!pencilDisplay);
						}}
					></i>
				</div>
			</div>
			<p className="operation-account-montant">{montant} €</p>
			{!descripDisplay && (
				<i
					className="fa-solid fa-chevron-down"
					style={{ color: "#12002b" }}
					onClick={() => setDescripDisplay(!descripDisplay)}
				></i>
			)}
			{descripDisplay && (
				<i
					className="fa-solid fa-chevron-up"
					style={{ color: "#12002b" }}
					onClick={() => setDescripDisplay(!descripDisplay)}
				></i>
			)}
		</div>
	);
}
