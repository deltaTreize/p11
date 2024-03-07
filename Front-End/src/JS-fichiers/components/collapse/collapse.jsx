import { useState } from "react";

import "./collapse.scss";

export function Collapse({ title, date, description, montant }) {
	const [descripDisplay, setDescripDisplay] = useState(false);

	return (
		<div className="operation-account">
			<p className="operation-account-date">{date}</p>
			<div className="operation-account-infos">
				<p className="operation-account-infos-title">{title}</p>
				<p
					className="operation-account-infos-description"
					style={{
						display: descripDisplay === true ? "flex" : "none",
					}}
				>
					{description}
				</p>
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
