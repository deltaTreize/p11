import { useState } from "react";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Login, isLogin } from "../../redux/actions/action.js";

import "./sign-in.scss";

export function SignIn() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const logged = useSelector(state => state.allReducer.isLogged);
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
console.log(loginDataJson);
			if (loginDataJson.status === 200) {
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
		
				const userData = {
					id: userDataJson.body.id,
					firstName: userDataJson.body.firstName,
					lastName: userDataJson.body.lastName,
					userName: userDataJson.body.userName,
					token: `${loginDataJson.body.token}`,
				};
				dispatch(Login(userData));
				dispatch(isLogin());
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
							Username
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

					{logged && <Link
						type="button"
						className="sign-in-button"
						onClick={HandleSubmit}
						to={'/User'}
					>
						Sign In
					</Link>}
					{!logged && <Link
						type="button"
						className="sign-in-button"
						onClick={HandleSubmit}
						to={'/Sign-In'}
					>
						Sign In
					</Link>

					}
				</form>
			</section>
		</main>
	);
}
