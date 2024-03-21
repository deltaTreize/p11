import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Button } from "../../../components/button/button";
import {
	Login, TokenOn
} from "../../../redux/actions/action";
import { AuthActionTypes, RootState, UserState } from "../../../redux/actions/typeAction";
import "./signInPage.scss";


export function SignIn() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [inputType, setInputType] = useState<string>("password");
	const [checked, setChecked] = useState<boolean>(false);
	const token = useSelector((state: RootState) => state.token);

	const dispatch: Dispatch<AuthActionTypes> = useDispatch();

	function handleChecked() {
		setChecked(!checked);
		!checked ? setInputType("text") : setInputType("password");
	}

	const HandleSubmit = async () => {
		const loginData = await fetch("http://localhost:3001/api/v1/user/login", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				email: `${email}`,
				password: `${password}`,
			}),
		});
		const loginDataJson = await loginData.json();
console.log(loginDataJson);

		if (loginDataJson.status === 200) {
			localStorage.setItem("token", loginDataJson.body.token);
			dispatch(TokenOn(loginDataJson.body.token));
			if (token) {
				console.log("token", token);
				
				const userDataFetched = await fetch(
					"http://localhost:3001/api/v1/user/profile",
					{
						method: "POST",
						headers: {
							Authorization: "Bearer " + localStorage.token,
						},
					}
					);
					const userDataJson = await userDataFetched.json();
					localStorage.setItem("id", loginDataJson.body.id);

				const userData: UserState = {
					id: userDataJson.body.id,
					firstName: userDataJson.body.firstName,
					lastName: userDataJson.body.lastName,
					userName: userDataJson.body.userName,
					email: userDataJson.body.email,
					createdAt: userDataJson.body.createdAt,
					account: userDataJson.body.account,
					role: userDataJson.body.role,
				};
				dispatch(Login(userData));
			// }
			// dispatch(TokenOn());
		}}
	};
	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Se connecter</h1>
				<form>
					<div className="input-wrapper">
						<label>
							Email
							<input
								type="text"
								id="username"
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</label>
					</div>
					<div className="input-wrapper">
						<label>
							Mot de passe
							<input
								type={inputType}
								id="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
							<span className="show" onClick={handleChecked}>
								{checked && <i className="fa-solid fa-eye"></i>}
								{!checked && <i className="fa-solid fa-eye-slash"></i>}
							</span>
						</label>
					</div>
					<div className="input-remember">
						<label>
							Se souvenir de moi
							<input type="checkbox" id="remember-me" />
						</label>
					</div>
					<Button
						type="button"
						onClick={HandleSubmit}
						to={`/user`}
						text="Se connecter"
						className={""}
					/>
					<Button
						type="button"
						to={"/sign-Up"}
						text="Creer un compte"
						className={""}
						onClick={function (
							event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
						): void {
							throw new Error("Function not implemented.");
						}}
					/>
				</form>
			</section>
		</main>
	);
}
