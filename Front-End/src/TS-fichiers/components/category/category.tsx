import React, { useState } from "react";
import "./category.scss";

interface Category {
	name: string;
	onDelete: (name: string) => void;
	onModify: (name: string, oldName: string) => void;
}
export function Category({
	name,
	onDelete,
	onModify,
}: Category) {
	const [isBeneficiaireModif, setisBeneficiaireModif] =
		useState<boolean>(false);
	const [nameValue, setNameValue] = useState<string>(name);
	const [oldName] = useState<string>(name);

	const handleModify = () => {
		setisBeneficiaireModif(!isBeneficiaireModif);
		onModify(nameValue, oldName);
	};
	const handleDelete = () => {
		onDelete(name);
	};

	return (
		<>
			{!isBeneficiaireModif && (
				<li key={name}>
					<p className="category-name">{name}</p>
					<div className="buttons">
						<i
							className="fa-solid fa-pencil"
							style={{
								color: "#fff",
							}}
							onClick={() => {
								setisBeneficiaireModif(!isBeneficiaireModif);
							}}
						></i>
						<i
							className="fa-solid fa-x"
							style={{
								color: "#fff",
							}}
							onClick={handleDelete}
						></i>
					</div>
				</li>
			)}
			{isBeneficiaireModif && (
				<li key={name}>
					<input
						type="text"
						className="category-name"
						value={nameValue}
						onChange={(e) => setNameValue(e.target.value)}
					/>
					<i
						className="fa-solid fa-check"
						style={{
							color: "#fff",
						}}
						onClick={handleModify}
					></i>
				</li>
			)}
		</>
	);
}
