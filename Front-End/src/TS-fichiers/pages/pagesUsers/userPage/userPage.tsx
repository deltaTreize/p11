import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button } from "../../../components/button/button";
import { ChartUser } from "../../../components/charts/chartUser";
import Spinner from "../../../components/spinner/spinner";
import { RootState } from "../../../redux/actions/typeAction";
import "./userPage.scss";


export function User() {
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const userId = useSelector((state: RootState) => state.user.id);
	const role = useSelector((state: RootState) => state.user.role);
	const admin = role === "admin" ? true : false;
	const dataUsers = useSelector((state: RootState) => state.user.account);
	const navigate = useNavigate();
	let portefeuilleClient = 0;

	if (admin) {
		navigate("/admin");
	}

	dataUsers.map((account) => (portefeuilleClient += account.solde));

	if (!dataUsers) {
		return <Spinner />;
	}

	return (
		<main className="main bg-dark">
			<div className="allInfo-wrapper">
				<div className="account-wrapper">
					{dataUsers.map((data) =>
						data.visible === true ? (
							<section
								className="account-userPage"
								key={firstName + data.nbAccount}
							>
								<div className="account-userPage-wrapper">
									<p className="account-amount-nbAccount">{data.nbAccount}</p>
									<h3 className="account-title">{data.name}</h3>
									<p className="account-amount">{data.solde.toFixed(2)}€</p>
								</div>
								<div className="account-content-wrapper cta">
									<Button
										to={`/user/home/${userId}/${data.nbAccount}`}
										text="Transactions"
										type={""}
										className={"transactions-button"}
										onClick={function (
											event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
										): void {
											throw new Error("Function not implemented.");
										}}
									/>
								</div>
							</section>
						) : null
					)}
				</div>
				<div className="portefeuille-wrapper">
					<h2>
						portefeuille client<br /> {portefeuilleClient.toFixed(2)}€
					</h2>
					<ChartUser/>
				</div>
			</div>
		</main>
	);
}
