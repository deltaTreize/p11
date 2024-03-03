import { useState } from "react";
import { Button } from "../../components/button/button.jsx";

import "./sign-up.scss";

export function SignUp() {
	const [checked, setChecked] = useState(false);
	const [inputType, setInputType] = useState("password");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [display, setDisplay] = useState("none");

	function handleChecked() {
		setChecked(!checked);
		!checked ? setInputType("text") : setInputType("password");
	}
	let headersList = {
		Accept: "*/*",
		"Content-Type": "application/json",
	};

	let bodyContent = JSON.stringify({
		email: `${email}`,
		password: `${password}`,
		firstName: `${firstName}`,
		lastName: `${lastName}`,
		userName: `${userName}`,
	});

	function createUser(event) {
		event.preventDefault();
		fetch("http://localhost:3001/api/v1/user/signup", {
			method: "POST",
			headers: headersList,
			body: bodyContent,
		}).then((response) => {
			if (response.status === 400) {
				setDisplay("flex");
			}
			if (response.status === 200) {
				setDisplay("none");
				window.location.replace("./sign-In");
			}
		});

		// dataFetched.status === 400 ? setDisplay("flex") : setDisplay("none");
	}

	return (
		<main className="main bg-dark-signUp">
			<h2>SIGN-UP</h2>
			<div className="background">
				<span></span>
			</div>
			<form className="form-signup" onSubmit={createUser}>
				<div>
					<span className="inputTitle">First Name</span>
					<input
						type="text"
						id="firstName"
						minLength="4"
						required
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div>
					<span className="inputTitle">Last Name</span>
					<input
						type="text"
						id="lastName"
						minLength="4"
						required
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div>
					<span className="inputTitle">User Name</span>
					<input
						type="text"
						id="userName"
						minLength="4"
						required
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<div>
					<span className="inputTitle">Email</span>
					<input
						type="text"
						id="email"
						minLength="4"
						required
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<span className="inputTitle">Password</span>
					<input
						type={inputType}
						id="password"
						minLength="4"
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					<span id="show" onClick={handleChecked}>
						{checked && <i className="fa-solid fa-eye"></i>}
						{!checked && <i className="fa-solid fa-eye-slash"></i>}
					</span>
				</div>
				<input
					type="submit"
					className="buttonArgentBank"
					value="SIGN-UP"
				/>
			</form>
			<p style={{ display: `${display}` }}>
				L'adresse email est déjà utilisée!
			</p>
		</main>
	);
}
