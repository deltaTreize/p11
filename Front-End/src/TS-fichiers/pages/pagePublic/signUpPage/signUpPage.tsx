import React, { useState } from "react";
import { BackArrow } from "../../../components/backArrow/backArrow";
import "./signUpPage.scss";

export function SignUp() {
	const [checked, setChecked] = useState(false);
	const [inputType, setInputType] = useState("password");
	const [checked2, setChecked2] = useState(false);
	const [inputType2, setInputType2] = useState("password");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [userName, setUserName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");
	const [display, setDisplay] = useState("none");
	const [errorMessage, setErrorMessage] = useState("kjhnmkljqdenbm");

	function handleChecked() {
		setChecked(!checked);
		!checked ? setInputType("text") : setInputType("password");
	}
	function handleChecked2() {
		setChecked2(!checked2);
		!checked2 ? setInputType2("text") : setInputType2("password");
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

	function createUser(event: { preventDefault: () => void; }) {
		event.preventDefault();
		if (password !== confPassword) {
			setErrorMessage("Le mot de passe n'est pas correct! ");
			setDisplay("flex");
		}
		if (password === confPassword) {
			fetch("http://localhost:3001/api/v1/user/signup", {
				method: "POST",
				headers: headersList,
				body: bodyContent,
			}).then((response) => {
				if (response.status === 400) {
					setDisplay("flex");
					setErrorMessage("L'adresse email est déjà utilisée");
				}
				if (response.status === 200) {
					setDisplay("none");
					window.location.replace("./sign-In");
				}
			});
		}
	}

	return (
		<main className="main bg-dark-signUp">
			<div className="header">
				<BackArrow chemin={"/sign-In"} />
				<h1>CREER UN COMPTE</h1>
			</div>
			<div className="background">
				<span></span>
			</div>
			<form className="form-signup" onSubmit={createUser}>
				<div>
					<span className="inputTitle">Nom</span>
					<input
						type="text"
						id="lastName"
						minLength={4}
						required
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div>
					<span className="inputTitle">Prénom</span>
					<input
						type="text"
						id="firstName"
						minLength={4}
						required
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div>
					<span className="inputTitle">Nom d'utilisateur</span>
					<input
						type="text"
						id="userName"
						minLength={4}
						required
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<div>
					<span className="inputTitle">Email</span>
					<input
						type="email"
						id="email"
						minLength={4}
						required
						onChange={(e) => {
							setEmail(e.target.value);
							setDisplay("none");
						}}
					/>
				</div>
				<div>
					<span className="inputTitle">Mot de passe</span>
					<input
						type={inputType}
						id="password"
						minLength= {4}
						required
						onChange={(e) => {
							setPassword(e.target.value);
							setDisplay("none");
						}}
					/>
					<span className="show" onClick={handleChecked}>
						{checked && <i className="fa-solid fa-eye"></i>}
						{!checked && <i className="fa-solid fa-eye-slash"></i>}
					</span>
				</div>
				<div>
					<span className="inputTitle">Confirmation Mot de passe</span>
					<input
						type={inputType2}
						id="confirmPassword"
						minLength={4}
						required
						onChange={(e) => {
							setConfPassword(e.target.value);
							setDisplay("none");
						}}
					/>
					<span className="show" onClick={handleChecked2}>
						{checked2 && <i className="fa-solid fa-eye"></i>}
						{!checked2 && <i className="fa-solid fa-eye-slash"></i>}
					</span>
				</div>
				<input
					type="submit"
					className="buttonArgentBank SIGNUP"
					value="CREER UN COMPTE"
				/>
			</form>
			<p style={{ display: `${display}` }}>{errorMessage}</p>
		</main>
	);
}
