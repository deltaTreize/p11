import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { useParams } from "react-router-dom";
import { AuthActionTypes, RootState, category } from "../../redux/actions/typeAction";
import "./collapse.scss";
import { UpdateAccount } from "../../redux/actions/action";

interface CollapseProps {
	title: string;
	date: string;
	description: string;
	montant: number;
	operationId: string;
	idAccount: number;
	category: string;
}

export function Collapse({
	title,
	date,
	description,
	montant,
	operationId,
	idAccount,
	category,
}: CollapseProps) {
	const [descripDisplay, setDescripDisplay] = useState<boolean>(false);
	const [categoryDisplay, setCategoryDisplay] = useState<boolean>(false);
	const [isDisabled, setIsDisabled] = useState<boolean>(true);
	const [descriptionValue, setDescriptionValue] = useState<string>("");
	const [categoryValue, setCategoryValue] = useState<string>(category);
	const [pencilDescriptionDisplay, setPencilDescriptionDisplay] =
		useState<boolean>(true);
	const [pencilCategoryDisplay, setPencilCategoryDisplay] =
		useState<boolean>(true);
	const token = useSelector((state: RootState) => state.token.token);
	const categoryArray = useSelector((state: RootState) => state.user.category);
	const { userId } = useParams();
	const dispatch: Dispatch<AuthActionTypes> = useDispatch();

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
			`${process.env.REACT_APP_IP_API}/api/v1/user/account/operations/description`,
			{
				method: "PUT",
				body: bodyContent,
				headers: headersList,
			}
		)
			.then((response) => response.json())
			.then((data) => dispatch(UpdateAccount(data.body.account)));
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
			`${process.env.REACT_APP_IP_API}/api/v1/user/account/operations/category`,
			{
				method: "PUT",
				body: bodyContent,
				headers: headersList,
			}
		)
			.then((response) => response.json())
			.then((data) => dispatch(UpdateAccount(data.body.account)));
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
					<select name="category" id="category" disabled={isDisabled} onChange={(e) => setCategoryValue(e.target.value)}>
						<option value="">{categoryValue}</option>
						{categoryArray.filter((category: category) => category.name !== categoryValue).map((category: category) => (
							<option value={category.name} key={category.name}>
								{category.name}
							</option>
						))}
					</select>
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
			<p
				className="operation-account-montant"
				style={{ color: montant >= 0 ? "green" : "red" }}
			>
				{montant.toFixed(2)} €
			</p>
			{!descripDisplay && (
				<i
					className="fa-solid fa-chevron-down"
					style={{ color: "#12002b" }}
					onClick={() => {
						setDescripDisplay(!descripDisplay);
						setCategoryDisplay(!categoryDisplay);
					}}
				></i>
			)}
			{descripDisplay && (
				<i
					className="fa-solid fa-chevron-up"
					style={{ color: "#12002b" }}
					onClick={() => {
						setDescripDisplay(!descripDisplay);
						setCategoryDisplay(!categoryDisplay);
					}}
				></i>
			)}
		</div>
	);
}
