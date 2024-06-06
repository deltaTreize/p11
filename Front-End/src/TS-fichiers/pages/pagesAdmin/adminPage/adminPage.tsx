import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import { Button } from "../../../components/button/button";
import { changeSearch } from "../../../redux/actions/action";
import {
	AuthActionTypes,
	RootState,
	UserState,
} from "../../../redux/actions/typeAction";
import "./adminPage.scss";
import { AccountData } from "../../../interfaces/interfaces";

export function AdminPage() {
	const dispatch: Dispatch<AuthActionTypes> = useDispatch();
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const lastName = useSelector((state: RootState) => state.user.lastName);
	const id = useSelector((state: RootState) => state.user.id);
	const nameSearch = useSelector((state: RootState) => state.search.searchName);
	const nbPage = useSelector((state: RootState) => state.search.page);
	const limit = useSelector((state: RootState) => state.search.limit);
	const sortBy = useSelector((state: RootState) => state.search.sortBy);
	const sortOrder = useSelector((state: RootState) => state.search.sortOrder);
	const [totalPage, setTotalPage] = useState<number>(1);
	const [allUsersFiltered, setAllUsersFiltered] = useState<UserState[]>([]);
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
	const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
	const [nameValue, setNameValue] = useState<string>(nameSearch);
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		queryParams.set("name", nameSearch);
		queryParams.set("sortBy", sortBy);
		queryParams.set("sortOrder", sortOrder);
		queryParams.set("page", `${nbPage}`);
		queryParams.set("limit", `${limit}`);

		navigate({
			pathname: location.pathname,
			search: queryParams.toString(),
		});
	}, [nameSearch, nbPage, limit, sortBy, sortOrder]);

	useEffect(() => {
		fetch(
			`https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user/`,
			{
				method: "GET",
				headers: {
					id: `${id}`,
				},
			}
		)
			.then((data) => data.json())
			.then((dataJson) => {
				if (dataJson.body) {
					setAllUsers(dataJson.body);
				}
			});
	}, [id]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const newValue = event.target.value;
		setNameValue(newValue);
		const data = {
			searchName: newValue,
			sortBy: sortBy,
			sortOrder: sortOrder,
			page: nbPage,
			limit: limit,
		};

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		// Debounce
		const newTimeoutId = setTimeout(() => {
			dispatch(changeSearch(data));
		}, 1000);
		setTimeoutId(newTimeoutId);
	};

	useEffect(() => {
		if (location.search) {
			fetch(
				`https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user/admin${location.search}`,
				{
					method: "GET",
					headers: {
						id: `${id}`,
					},
				}
			)
				.then((data) => data.json())
				.then((dataJson) => {
					if (dataJson.body) {
						setAllUsersFiltered(dataJson.body.users);
						setTotalPage(dataJson.body.totalPages);
					}
				});
		}
	}, [location.search]);

	useEffect(() => {
		let totalSolde: number = 0;
		allUsers.forEach((userData) => {
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
			fetch(
				"https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user/signup",
				{
					method: "POST",
					headers: headersList,
					body: bodyContent,
				}
			).then(async (response) => {
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

	const renderDots = () => {
		const dots: JSX.Element[] = [];
		for (let i = 1; i <= totalPage; i++) {
			dots.push(
				<button
					key={i}
					onClick={() => {
						const data = {
							searchName: nameSearch,
							sortBy: sortBy,
							sortOrder: sortOrder,
							page: i,
							limit: limit,
						};
						dispatch(changeSearch(data));
					}}
					className={nbPage === i ? "active" : ""}
				>
					{i}
				</button>
			);
		}
		return dots;
	};

	return (
		<main className="main bg-dark main-admin">
			<ReactModal
				isOpen={isModaleOpen}
				className="Modal"
				overlayClassName="Overlay"
				ariaHideApp={!isModaleOpen}
				onRequestClose={() => setIsModaleOpen(false)}
				shouldCloseOnOverlayClick={true}
			>
				<form className="form-signup-admin" onSubmit={createUser}>
					<div className="form-signup-admin-group">
						<p className="inputTitle">Nom</p>
						<input
							type="text"
							id="lastName"
							minLength={4}
							required
							onChange={(e) => setNewLastName(e.target.value)}
						/>
					</div>
					<div className="form-signup-admin-group">
						<p className="inputTitle">Prénom</p>
						<input
							type="text"
							id="firstName"
							minLength={4}
							required
							onChange={(e) => setNewFirstName(e.target.value)}
						/>
					</div>
					<div className="form-signup-admin-group">
						<p className="inputTitle">Nom d'utilisateur</p>
						<input
							type="text"
							id="userName"
							minLength={4}
							required
							onChange={(e) => setUserName(e.target.value)}
						/>
					</div>
					<div className="form-signup-admin-group">
						<p className="inputTitle">Email</p>
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
					<div className="form-signup-admin-group">
						<p className="inputTitle">Mot de passe</p>
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
					<div className="form-signup-admin-group">
						<p className="inputTitle">Confirmation Mot de passe</p>
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
				<div className="filterBar">
					<input
						type="text"
						value={nameValue}
						onChange={handleInputChange}
						placeholder="Recherche par nom..."
					/>
					<input
						className="inputNumber"
						type="number"
						min={1}
						value={limit}
						onChange={(e) => {
							const data = {
								searchName: nameSearch,
								sortBy: sortBy,
								sortOrder: sortOrder,
								page: 1,
								limit: parseInt(e.target.value),
							};
							dispatch(changeSearch(data));
						}}
					/>
					<p className="filterBar-text"> utilisateurs par page</p>
				</div>
			</div>
			<div className="AdminAllUser-container">
				{allUsersFiltered.map((user: UserState) => (
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
								<div className="allAccountUser">
									{user.account.map((data: AccountData) =>
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
			<div className="pagination">{renderDots()}</div>
		</main>
	);
}
