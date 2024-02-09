import React from "react";
import { NavLink } from "react-router-dom";

import "./header.scss";

export function Header() {
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
				<NavLink className="main-nav-item" id="userLink" to={"/User"}>
					<i className="fa fa-user-circle"></i>
					Tony
				</NavLink>
				<NavLink className="main-nav-item" id="signInLink" to={"/Sign-In"}>
					<i className="fa fa-user-circle"></i>
					Sign In
				</NavLink>
				<NavLink className="main-nav-item" id="signOutLink" to={"/"}>
					<i className="fa fa-sign-out"></i>
					Sign Out
				</NavLink>
			</nav>
		</div>
	);
}
