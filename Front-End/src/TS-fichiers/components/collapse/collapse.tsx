import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/actions/typeAction";
import "./collapse.scss";

interface CollapseProps {
	title: string;
	date: string;
	description: string;
	montant: number;
	operationId: string;
	idAccount: number;
	category: string;
}

export function Collapse({ title, date, description, montant, operationId, idAccount, category }: CollapseProps) {
	const [descripDisplay, setDescripDisplay] = useState<boolean>(false);
	const [categoryDisplay, setCategoryDisplay] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [descriptionValue, setDescriptionValue] = useState<string>("");
	const [categoryValue, setCategoryValue] = useState<string>("");
	const [pencilDescriptionDisplay, setPencilDescriptionDisplay] = useState<boolean>(true);
	const [pencilCategoryDisplay, setPencilCategoryDisplay] = useState<boolean>(true);
	const token = useSelector((state:RootState) => state.token.token);
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
			description: descriptionValue,
		});
		fetch(
			"http://localhost:3001/api/v1/user/account/operations/description",
			{
				method: "PUT",
				body: bodyContent,
				headers: headersList,
			}
			);
		}
	async function updateCategory() {
		setIsDisabled(!isDisabled);
		let headersList = {
			id: `${userId}`,
			idaccount: `${idAccount}`,
			operationid: `${operationId}`,
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			category: categoryValue,
		});
		fetch(
			"http://localhost:3001/api/v1/user/account/operations/category",
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
					description:
					<input
						placeholder={description}
						value={descriptionValue}
						disabled={isDisabled}
						onChange={(e) => setDescriptionValue(e.target.value)}
					/>
					<i
						className="fa-solid fa-pencil"
						style={{
							display: pencilDescriptionDisplay === true ? "flex" : "none",
						}}
						onClick={() => {
							setPencilDescriptionDisplay(!pencilDescriptionDisplay);
							setIsDisabled(!isDisabled);
						}}
					></i>
					<i
						className="fa-solid fa-check"
						style={{
							display: pencilDescriptionDisplay === true ? "none" : "flex",
						}}
						onClick={() => {
							updateDescription();
							setPencilDescriptionDisplay(!pencilDescriptionDisplay);
						}}
					></i>
				</div>
				<div
					className="operation-account-infos-category"
					style={{
						display: categoryDisplay === true ? "flex" : "none",
					}}
				>
					catégories:
					<input
						placeholder={category}
						value={categoryValue}
						disabled={isDisabled}
						onChange={(e) => setCategoryValue(e.target.value)}
					/>
					<i
						className="fa-solid fa-pencil"
						style={{
							display: pencilCategoryDisplay === true ? "flex" : "none",
						}}
						onClick={() => {
							setPencilCategoryDisplay(!pencilCategoryDisplay);
							setIsDisabled(!isDisabled);
						}}
					></i>
					<i
						className="fa-solid fa-check"
						style={{
							display: pencilCategoryDisplay === true ? "none" : "flex",
						}}
						onClick={() => {
							updateCategory();
							setPencilCategoryDisplay(!pencilCategoryDisplay);
						}}
					></i>
				</div>
			</div>
			<p className="operation-account-montant" style={{ color: montant >= 0 ? "green" : "red" }}>{montant.toFixed(2)} €</p>
			{!descripDisplay && (
				<i
					className="fa-solid fa-chevron-down"
					style={{ color: "#12002b" }}
					onClick={() => {setDescripDisplay(!descripDisplay); setCategoryDisplay(!categoryDisplay)}}
				></i>
			)}
			{descripDisplay && (
				<i
					className="fa-solid fa-chevron-up"
					style={{ color: "#12002b" }}
					onClick={() => {setDescripDisplay(!descripDisplay); setCategoryDisplay(!categoryDisplay)}}
				></i>
			)}
		</div>
	);
}
