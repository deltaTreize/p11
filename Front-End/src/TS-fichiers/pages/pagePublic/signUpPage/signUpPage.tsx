import React, { useState } from "react";
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
		role: "user",
	});

	function createUser(event: { preventDefault: () => void; }) {
		event.preventDefault();
		if (password !== confPassword) {
			setErrorMessage("Le mot de passe n'est pas correct! ");
			setDisplay("flex");
		}
		if (password === confPassword) {
			fetch("https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user/signup", {
				method: "POST",
				headers: headersList,
				body: bodyContent,
			}).then(async (response) => {
				if (response.status === 400) {
					console.log("error", response.json());
					
					setDisplay("flex");
					setErrorMessage("L'adresse email est déjà utilisée");
				}
				if (response.status === 200) {
					const data = await response.json();
					console.log( "data",data);

        // Envoi de l'e-mail de confirmation avec l'ID de l'utilisateur
        fetch(`https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/send-confirmation-email/${data.userId}`)
          .then(() => {
						setDisplay("flex");
						setErrorMessage("en attente de confirmation...");
          })
					.catch((error) => {
            console.error('Erreur lors de l\'envoi de l\'e-mail de confirmation:', error);
            // Gérer l'erreur
          });
					setDisplay("none");
					window.location.replace("./sign-In");
				}
			});
		}
	}

	return (
		<main>
			<div className="main bg-blur"></div>
			<div className="header">
				<h1>CREER UN COMPTE</h1>
			</div>
			<form className="form-signup" onSubmit={createUser}>
				<div>
					<input
						placeholder="Nom"
						type="text"
						id="lastName"
						minLength={4}
						required
						onChange={(e) => setLastName(e.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="Prenom"
						type="text"
						id="firstName"
						minLength={4}
						required
						onChange={(e) => setFirstName(e.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="Nom d'utilisateur"
						type="text"
						id="userName"
						minLength={4}
						required
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="Email"
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
					<input
						placeholder="Mot de passe"
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
					<input
						placeholder="Confirmer mot de passe"
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
			<p className="errorMessage" style={{ display: `${display}` }}>{errorMessage}</p>
		</main>
	);
}
