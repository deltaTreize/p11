import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button } from "../../../components/button/button";
import { ChartUser } from "../../../components/charts/chartUser";
import Spinner from "../../../components/spinner/spinner";
import { AccountData, AuthActionTypes, RootState } from "../../../redux/actions/typeAction";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import "./userPage.scss";
import { UpdateAccount } from "../../../redux/actions/action";


export function User() {
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const userId = useSelector((state: RootState) => state.user.id);
	const role = useSelector((state: RootState) => state.user.role);
	const token = useSelector((state: RootState) => state.token.token);
	const admin = role === "admin" ? true : false;
	const [dataUsers, setDataUsers] = useState<AccountData[]>([]); ;
	const navigate = useNavigate();
	const dispatch: Dispatch<AuthActionTypes> = useDispatch();
	let portefeuilleClient = 0;

	if (admin) {
		navigate("/admin");
	}
	
	useEffect(() => {
		if (token) {
			fetch(
				`${process.env.REACT_APP_IP_API}/api/v1/user/profile`,
				{
					method: "POST",
					headers: {
						Authorization: "Bearer " + token,
					}
				}
			)
			.then((userDataFetched) => userDataFetched.json())
			.then((userData) => {
				setDataUsers(userData.body.account);
				dispatch(UpdateAccount(userData.body.account));
			})
		}
	}, [token]);
	
	
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
