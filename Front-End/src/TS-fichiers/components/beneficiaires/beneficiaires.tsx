import React, { useState } from "react";
import "./beneficiaires.scss";

interface Beneficiaires {
	name: string;
	rib: string;
	onDelete: (rib: string) => void;
	onModify: (oldRib: string, name: string, rib: string) => void;
}
export function BeneficiairesExterne({
	name,
	rib,
	onDelete,
	onModify,
}: Beneficiaires) {
	const [isBeneficiaireModif, setisBeneficiaireModif] =
		useState<boolean>(false);
	const [nameValue, setNameValue] = useState<string>(name);
	const [ribValue, setRibValue] = useState<string>(rib);
	const [oldRibValue] = useState<string>(rib);

	const handleModify = () => {
		setisBeneficiaireModif(!isBeneficiaireModif);
		onModify(oldRibValue, nameValue, ribValue);
	};
	const handleDelete = () => {
		onDelete(rib);
	};

	return (
		<ul>
			{!isBeneficiaireModif && (
				<li key={rib + name}>
					<p className="beneficiaire-name">{name}</p>
					<p>{rib.replace(/(.{4})(?=.)/g, "$1 ")}</p>
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
				<li key={rib + name}>
					<input
						type="text"
						className="beneficiaire-name"
						value={nameValue}
						onChange={(e) => setNameValue(e.target.value)}
					/>
					<input
						type="text"
						className="beneficiaire-rib"
						value={ribValue}
						onChange={(e) => setRibValue(e.target.value)}
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
		</ul>
	);
}
