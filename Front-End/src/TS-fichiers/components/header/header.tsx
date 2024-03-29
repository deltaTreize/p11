import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Logout, TokenOff } from "../../redux/actions/action";
import { RootState } from "../../redux/actions/typeAction";
import "./header.scss";

export function Header() {
	const token = useSelector((state: RootState) => state.token.token);
	const userName = useSelector((state: RootState) => state.user.userName);
	const logged =  token !== null ? true :  false;
	const userId = useSelector((state: RootState) => state.user.id);
	const dispatch = useDispatch();
	
	const handleLogout = () => {
		localStorage.id = '';
		dispatch<any>(TokenOff());
		dispatch<any>(Logout());
	};

	return (
		<div className="main-nav">
			<NavLink className="main-nav-logo" to={"/"}>
				<img
					className="main-nav-logo-image"
					src="../../assets/argentBankLogo.png"
					alt="Argent Bank Logo"
				/>
			</NavLink>
			<nav className="navLinks">
				{logged && (
					<NavLink
						className="main-nav-item"
						id="userLink"
						to={`/user/${userId}`}
					>
						<i className="fa fa-user-circle"></i>
						{userName}
					</NavLink>
				)}
				{!logged && (
					<NavLink
						className="main-nav-item"
						id="signInLink"
						to={"/sign-In"}
					>
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
			</nav>
		</div>
	);
}
