import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BackArrow } from "../../../components/backArrow/backArrow";

import "./adminPage.scss";

export function AdminPage() {
	const firstName = useSelector((state) => state.allReducer.user.firstName);
	const lastName = useSelector((state) => state.allReducer.user.lastName);
	const id = useSelector((state) => state.allReducer.user.id);
	const [allUsers, setAllUsers] = useState([]);
	const [portefeuilleAllClient, setPortefeuilleAllClient] = useState();

	useEffect(() => {
		fetch("http://localhost:3001/api/v1/user", {
			method: "GET",
			headers: {
				id: `${id}`,
			},
		})
			.then((data) => data.json())
			.then((dataJson) => {
				setAllUsers(
					dataJson.body.filter((user) => user.role === "user")
				);
			});
	}, [id]);

	useEffect(() => {
		let totalSolde = 0;
		allUsers.forEach((user) => {
			user.account.forEach((data) => {
				totalSolde += parseFloat(data.solde); // Convertir solde en nombre
			});
		});
		setPortefeuilleAllClient(totalSolde.toFixed(2));
	}, [allUsers]);

	return (
		<main className="main bg-dark">
			<div className="header">
				<BackArrow chemin={"/user"} />
				<h1>
					{lastName} {firstName}
				</h1>
				<p className="portefeuilleClient">
					Votre portefeuille client global est de :{" "}
					{portefeuilleAllClient} €
				</p>
			</div>
			<div className="AdminAllUser-container">
				{allUsers.map((user) => (
					<Link
						to={`${user.id}`}
						key={user.id}
						className="linkToAdminUserAccountPage"
					>
						<section className="AdminAllUser">
							<div className="AdminAllUser-wrapper">
								<h3 className="AdminAllUser-wrapper-title">
									{user.lastName} {user.firstName}
								</h3>
								<p className="AdminAllUser-wrapper-id">
									{" "}
									Id: {user.id}
								</p>
								{user.account.map((data) =>
									data.visible === true ? (
										<div
											className="AdminUserAccount"
											key={data._id}
										>
											<p className="AdminUserAccount-name">
												{data.name}
											</p>
											<p className="AdminUserAccount-nbAccount">
												{data.nbAccount}
											</p>
											<span className="AdminUserAccount-solde">
												{data.solde}
											</span>
										</div>
									) : (
										<div
											className="AdminUserAccount-invisible AdminUserAccount"
											key={data._id}
										>
											<p className="AdminUserAccount-name">
												{data.name}
											</p>
											<p className="AdminUserAccount-nbAccount">
												{data.nbAccount}
											</p>
											<span className="AdminUserAccount-solde">
												{data.solde}
											</span>
										</div>
									)
								)}
							</div>
						</section>
					</Link>
				))}
			</div>
		</main>
	);
}
