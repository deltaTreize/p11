import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Logout, TokenOff, changeSearch } from "../../redux/actions/action";
import { RootState, SearchState } from "../../redux/actions/typeAction";
import "./header.scss";

export function Header() {
	const token = useSelector((state: RootState) => state.token.token);
	const userName = useSelector((state: RootState) => state.user.userName);
	const role = useSelector((state: RootState) => state.user.role);
	const logged = token !== "" ? true : false;
	const userId = useSelector((state: RootState) => state.user.id);
	const picture = useSelector((state: RootState) => state.user.picture);
	const dispatch = useDispatch();

	const data: SearchState = {
		searchName: "",
		sortBy: "lastName",
		sortOrder: "asc",
		page: 1,
		limit: 3,
	};

	const handleLogout = () => {
		localStorage.id = "";
		dispatch<any>(TokenOff());
		dispatch<any>(Logout());
		dispatch<any>(changeSearch(data));
	};

	return (
		<div className="main-nav">
			<NavLink className="main-nav-logo" to={"/"}>
				<img
					className="main-nav-logo-image"
					src="../../../assets/argentBankLogo.png"
					alt="Argent Bank Logo"
				/>
			</NavLink>
			{role === "user" && (
				<nav className="navLinks">
					<NavLink
						className="comptes navLink"
						id="comptesLink"
						to={`/user/home`}
					>
						Comptes
					</NavLink>
					<NavLink
						className="virement navLink"
						id="virementLink"
						to={`/user/${userId}/virement`}
					>
						Virement
					</NavLink>
					<NavLink
						className="budget navLink"
						id="budgetLink"
						to={`/user/${userId}/budget`}
					>
						Budget
					</NavLink>
				</nav>
			)}
			<div className="connectionLinks">
				{logged && (
					<NavLink
						className="main-nav-item"
						id="userLink"
						to={`/edit/${userId}`}
					>
						{picture && (
							<img
								src={`data:image/png;base64,${picture}`}
								alt="user"
								id="userImage"
							/>
						)}
						{!picture && <i className="fa fa-user-circle"></i>}
						{userName}
					</NavLink>
				)}
				{!logged && (
					<NavLink className="main-nav-item" id="signInLink" to={"/sign-In"}>
						<i className="fa fa-user-circle"></i>
						Se connecter
					</NavLink>
				)}
				{logged && (
					<NavLink
						className="main-nav-item"
						id="signOutLink"
						to={"/"}
						onClick={handleLogout}
					>
						<i className="fa fa-sign-out"></i>
						Se deconnecter
					</NavLink>
				)}
			</div>
		</div>
	);
}
