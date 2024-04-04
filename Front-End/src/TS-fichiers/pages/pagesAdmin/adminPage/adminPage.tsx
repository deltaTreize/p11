import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BackArrow } from "../../../components/backArrow/backArrow";
import { Button } from "../../../components/button/button";
import { RootState, UserState } from "../../../redux/actions/typeAction";
import "./adminPage.scss";

export function AdminPage() {
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const lastName = useSelector((state: RootState) => state.user.lastName);
	const id = useSelector((state: RootState) => state.user.id);
	const [allUsers, setAllUsers] = useState<UserState[]>([]);
	const [portefeuilleAllClient, setPortefeuilleAllClient] = useState<number>(0);
	const [isModaleOpen, setIsModaleOpen] = useState<boolean>(false);
	const [newfirstName, setNewFirstName] = useState<string>("");
	const [newlastName, setNewLastName] = useState<string>("");
	const [userName, setUserName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [confPassword, setConfPassword] = useState<string>("");
	const [display, setDisplay] = useState<string>("none");
	const [errorMessage, setErrorMessage] = useState<string>("kjhnmkljqdenbm");
	const [checked, setChecked] = useState<boolean>(false);
	const [inputType, setInputType] = useState<string>("password");
	const [checked2, setChecked2] = useState<boolean>(false);
	const [inputType2, setInputType2] = useState<string>("password");

	interface User {
		confirmed: boolean;
		role: string;
	}
	interface userData {
		account: AccountData[];
	}
	interface AccountData {
		solde: number;
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
					const filteredUsers = dataJson.body.filter(
						(user: User) => user.role === "user" && user.confirmed === true
					);
					setAllUsers(filteredUsers);
				}
			});
	}, [id]);

	useEffect(() => {
		let totalSolde: number = 0;
		allUsers.forEach((userData: userData) => {
			userData.account.forEach((data: AccountData) => {
				totalSolde += data.solde;
			});
		});
		setPortefeuilleAllClient(totalSolde);
	}, [allUsers]);

	function handleChecked() {
		setChecked(!checked);
		!checked ? setInputType("text") : setInputType("password");
	}
	function handleChecked2() {
		setChecked2(!checked2);
		!checked2 ? setInputType2("text") : setInputType2("password");
	}

	function createUser() {
		let headersList = {
			Accept: "*/*",
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			email: `${email}`,
			password: `${password}`,
			firstName: `${newfirstName}`,
			lastName: `${newlastName}`,
			userName: `${userName}`,
			role: "admin",
		});

		if (password !== confPassword) {
			setErrorMessage("Le mot de passe n'est pas correct! ");
			setDisplay("flex");
		}
		if (password === confPassword) {
			fetch("http://localhost:3001/api/v1/user/signup", {
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
					console.log("data", data);
				}
			});
		}
	}

	return (
		<main className="main bg-dark">
			<ReactModal
				isOpen={isModaleOpen}
				className="Modal"
				overlayClassName="Overlay"
				ariaHideApp={!isModaleOpen}
				onRequestClose={() => setIsModaleOpen(false)}
				shouldCloseOnOverlayClick={true}
			>
				<form className="form-signup" onSubmit={createUser}>
					<div>
						<span className="inputTitle">Nom</span>
						<input
							type="text"
							id="lastName"
							minLength={4}
							required
							onChange={(e) => setNewLastName(e.target.value)}
						/>
					</div>
					<div>
						<span className="inputTitle">Prénom</span>
						<input
							type="text"
							id="firstName"
							minLength={4}
							required
							onChange={(e) => setNewFirstName(e.target.value)}
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
							minLength={4}
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
			</ReactModal>

			<div className="header">
				<BackArrow chemin={"/user"} />
				<h1>
					{lastName} {firstName}
				</h1>
				<p className="portefeuilleClient">
					Votre portefeuille client global est de :{" "}
					{portefeuilleAllClient.toFixed(2)} €
				</p>
				<Button
					type={""}
					to={""}
					text={"créer un compte administrateur"}
					className={"addAdminUser"}
					onClick={() => setIsModaleOpen(true)}
				/>
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
								<p className="AdminAllUser-wrapper-id"> Id: {user.id}</p>
								<div className="allAccountUser">
									{user.account.map((data: accountData) =>
										data.visible === true ? (
											<div className="AdminUserAccount" key={data._id}>
												<p className="AdminUserAccount-name">{data.name}</p>
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
												<p className="AdminUserAccount-name">{data.name}</p>
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
