import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BackArrow } from "../../../components/backArrow/backArrow";
import { RootState, UserState } from "../../../redux/actions/typeAction";
import "./adminPage.scss";

export function AdminPage() {
	const firstName = useSelector((state:RootState) => state.user.firstName);
	const lastName = useSelector((state:RootState) => state.user.lastName);
	const id = useSelector((state:RootState) => state.user.id);
	const [allUsers, setAllUsers] = useState([]);
	const [portefeuilleAllClient, setPortefeuilleAllClient] = useState(0);
	const state = useSelector((state:RootState) => state);
	console.log(state);
	

interface User{
	role:string
}
interface userData{
	account:AccountData [];
}
interface AccountData {
	solde:number;
}
interface accountData {
	visible: boolean;
	_id: number;
	name: string;
	nbAccount: string;
	solde: number;
}

	useEffect(() => {
		fetch("http://localhost:3001/api/v1/user", {
			method: "GET",
			headers: {
				id: `${id}`,
			},
		})
			.then((data) => data.json())
			.then((dataJson) => {
				if (dataJson.body) {
					const filteredUsers = dataJson.body.filter((user: User) => user.role === "user");
					setAllUsers(filteredUsers);
				}
			});
	}, [id]);

	useEffect(() => {
		let totalSolde: number = 0;
		allUsers.forEach((userData:userData) => {
			userData.account.forEach((data: AccountData ) => {
				totalSolde += data.solde; 
			});
		});
		setPortefeuilleAllClient(totalSolde);
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
				{allUsers.map((user: UserState) => (
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
								<div className="allAccountUser">
									{user.account.map((data: accountData) =>
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
													{data.solde.toFixed(2)}
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
													{data.solde.toFixed(2)}
												</span>
											</div>
										)
									)}
								</div>
							</div>
						</section>
					</Link>
				))}
			</div>
		</main>
	);
}
