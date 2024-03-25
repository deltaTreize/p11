import React from "react";

import "./spinner.scss";
export default function Spinner() {
	return (
		<div className="container">
            <p className="loading">Loading...</p>
			<div id="spinner"></div>
		</div>
	);
}
