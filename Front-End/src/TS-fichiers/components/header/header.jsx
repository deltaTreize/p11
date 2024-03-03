import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Logout, isLogout } from "../../redux/actions/action.js";

import "./header.scss";

export function Header() {
	const userName = useSelector((state) => state.allReducer.user.userName);
	const logged = useSelector((state) => state.allReducer.isLogged);

	const dispatch = useDispatch();
	const handleLogout = () => {
		dispatch(Logout());
		dispatch(isLogout());
	};

	return (
		<div className="main-nav">
			<NavLink className="main-nav-logo" to={"/"}>
				<img
					className="main-nav-logo-image"
					src="../assets/argentBankLogo.png"
					alt="Argent Bank Logo"
				/>
			</NavLink>
			<nav className="navLinks">
				{logged && (
					<NavLink
						className="main-nav-item"
						id="userLink"
						to={"/edit"}
					>
						<i className="fa fa-user-circle"></i>
						{userName}
					</NavLink>
				)}
				;
				{!logged && (
					<NavLink
						className="main-nav-item"
						id="signInLink"
						to={"/sign-In"}
					>
						<i className="fa fa-user-circle"></i>
						Sign In
					</NavLink>
				)}
				;
				{logged && (
					<NavLink
						className="main-nav-item"
						id="signOutLink"
						to={"/"}
						onClick={handleLogout}
					>
						<i className="fa fa-sign-out"></i>
						Sign Out
					</NavLink>
				)}
				;
			</nav>
		</div>
	);
}
