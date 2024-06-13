import React from "react";
import { NavLink } from "react-router-dom";
import "./backArrow.scss";

interface BackArrowProps {
	chemin: string;
}

export function BackArrow({ chemin }: BackArrowProps) {
	return (
		<NavLink to={chemin} className={"backArrow"}>
			<i className="fa-solid fa-arrow-left" style={{ color: "#ffffff" }}></i>
		</NavLink>
	);
}
