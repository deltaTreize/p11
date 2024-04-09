import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { Button } from "../../../components/button/button";
import { Login, TokenOn } from "../../../redux/actions/action";
import { AuthActionTypes, UserState } from "../../../redux/actions/typeAction";
import "./signInPage.scss";
const Cookies = require("js-cookie");

export function SignIn() {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [inputType, setInputType] = useState<string>("password");
	const [checked, setChecked] = useState<boolean>(false);
	const [seSouvenir, setSeSouvenir] = useState<boolean>(false);
	const dispatch: Dispatch<AuthActionTypes> = useDispatch();

	function handleChecked() {
		setChecked(!checked);
		!checked ? setInputType("text") : setInputType("password");
	}

		const setCookie = (name: string, value: string, days: number) => {
		Cookies.set(name, value, { expires: days });
	};
	
	// Fonction pour supprimer un cookie
	const deleteCookie = (name: string) => {
		Cookies.remove(name);
	};
	
	// Fonction pour gérer la case "Remember Me"
	const handleRememberMe = (seSouvenir: boolean, token: string) => {
		if (seSouvenir) {
			// Si la case est cochée, créer un cookie avec une durée de vie plus longue
			setCookie('argentBank', token, 15); // Exemple : durée de vie de 7 jours
		} else {
			// Si la case est décochée, supprimer le cookie
			deleteCookie('argentBank');
		}
	};
	

	
	
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

		if (loginDataJson.status === 200) {
			dispatch(TokenOn(loginDataJson.body.token));
			handleRememberMe(seSouvenir, loginDataJson.body.token);
			localStorage.setItem("id", loginDataJson.body.id);

			const userDataFetched = await fetch(
				"http://localhost:3001/api/v1/user/profile",
				{
					method: "POST",
					headers: {
						Authorization: "Bearer " + loginDataJson.body.token,
					},
				}
			);
			const userDataJson = await userDataFetched.json();

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
		}
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
							<input
								type="checkbox"
								id="remember-me"
								checked={seSouvenir}
								onChange={(e) => setSeSouvenir(e.target.checked)}
							/>
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
