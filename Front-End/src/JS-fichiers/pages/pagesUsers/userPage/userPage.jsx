import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "../../../components/button/button.jsx";
import { BackArrow } from "../../../components/backArrow/backArrow";


import "./userPage.scss";

export function User() {
	const firstName = useSelector((state) => state.allReducer.user.firstName);
	const lastName = useSelector((state) => state.allReducer.user.lastName);
	const admin = useSelector((state) => state.allReducer.admin);
	const [dataUsers, setDataUsers] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3001/api/v1/user/profile", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + localStorage.token,
			},
		})
			.then((alldata) => alldata.json())
			.then((data) => {
				setDataUsers(data.body.account);
			});
	}, []);

	return (
		<main className="main bg-dark">
			<div className="header">
			<BackArrow chemin={"/"}/>
				<h1>
					Welcome back
					<br />
					{firstName} {lastName}
				</h1>
				{admin && <Button to={"/admin"} text="View All Users" />}
				{!admin && <Button to={"/edit"} text="Edit Profil" />}
			</div>
			{dataUsers.map((data) => (
				<section className="account-userPage" key={firstName + data.nbAccount}>
					<div className="account-userPage-wrapper">
						<p className="account-amount-nbAccount">
							{data.nbAccount}
						</p>
						<h3 className="account-title">{data.name}</h3>
						<p className="account-amount">{data.solde}€</p>
					</div>
					<div className="account-content-wrapper cta">
						<Button to={`${data.nbAccount}`} text="View transactions" />
					</div>
				</section>
			))}
		</main>
	);
}
