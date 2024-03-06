import { useState } from "react";
import { useDispatch } from "react-redux";
import {
	TokenOn,
	Login,
	IsLoggin,
	Admin,
	NotAdmin,
} from "../../../redux/actions/action.js";
import { Button } from "../../../components/button/button.jsx";

import "./signInPage.scss";

export function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const HandleSubmit = async () => {
		const loginData = await fetch(
			"http://localhost:3001/api/v1/user/login",
			{
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					email: `${email}`,
					password: `${password}`,
				}),
			}
		);
		const loginDataJson = await loginData.json();


		if (loginDataJson.status === 200) {
			localStorage.setItem("token", loginDataJson.body.token);
			if (localStorage.token) {
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
		console.log(userDataJson);

				localStorage.setItem("id", userDataJson.body.id);
				userDataJson.body.role === "admin"
					? dispatch(Admin())
					: dispatch(NotAdmin());

				const userData = {
					id: userDataJson.body.id,
					firstName: userDataJson.body.firstName,
					lastName: userDataJson.body.lastName,
					userName: userDataJson.body.userName,
					email: userDataJson.body.email,
					createdAt: userDataJson.body.createdAt,
				};
				dispatch(Login(userData));
			}
			dispatch(TokenOn());
			dispatch(IsLoggin());
		}
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
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
							Password
							<input
								type="password"
								id="password"
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</label>
					</div>
					<div className="input-remember">
						<label>
							Remember me
							<input type="checkbox" id="remember-me" />
						</label>
					</div>
					<Button
						type="button"
						onClick={HandleSubmit}
						to={"/user"}
						text="Sign In"
					/>
					<Button type="button" to={"/sign-Up"} text="Sign Up" />
				</form>
			</section>
		</main>
	);
}
