import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../redux/actions/action.js";

import "./editPage.scss";


export function EditPage() {
	const userName = useSelector((state) => state.allReducer.user.userName);
	const firstName = useSelector((state) => state.allReducer.user.firstName);
	const lastName = useSelector((state) => state.allReducer.user.lastName);
	const token = useSelector((state) => state.allReducer.user.token);
  const dispatch = useDispatch()

	const [inputValue, setInputValue] = useState(`${userName}`);

	async function handleChange() {
		let headersList = {
			Accept: "*/*",
			"User-Agent": "Thunder Client (https://www.thunderclient.com)",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			userName: `${inputValue}`,
		});
		const userDataFetched = await fetch(
			"http://localhost:3001/api/v1/user/profile",
			{
				method: "PUT",
				body: bodyContent,
				headers: headersList,
			}
		);
		const userDataJson = await userDataFetched.json();

    const userData = {
      userName: userDataJson.body.userName,
    };
    dispatch(Login(userData));
	}

	return (
		<main className="main bg-white">
			<div className="header-edit">
				<h1>Edit user info</h1>
				<label htmlFor="userName">
					User name:
					<input
						type="text"
						value={inputValue}
						id="userName"
						onChange={(e) => setInputValue(e.target.value)}
					/>
				</label>
				<label htmlFor="firstName">
					First name:
					<input
						type="text"
						value={firstName}
						id="firstName"
						disabled
					/>
				</label>
				<label htmlFor="lastName">
					Last name:
					<input
						type="text"
						value={lastName}
						id="lastName"
						disabled
					/>
				</label>
				<div className="edit-buttons">
					<button className="edit-button" onClick={handleChange}>
						Save
					</button>
					<button className="edit-button">Cancel</button>
				</div>
			</div>
			<section className="account-edit">
				<div className="account-content-wrapper">
					<h3 className="account-title">
						Argent Bank Checking (x8349)
					</h3>
					<p className="account-amount">$2,082.79</p>
					<p className="account-amount-description">
						Available Balance
					</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button-edit">
						<i
							className="fa-solid fa-chevron-right"
							style={{ color: "#ffffff" }}
						></i>
					</button>
				</div>
			</section>
			<section className="account-edit">
				<div className="account-content-wrapper">
					<h3 className="account-title">
						Argent Bank Savings (x6712)
					</h3>
					<p className="account-amount">$10,928.42</p>
					<p className="account-amount-description">
						Available Balance
					</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button-edit">
						<i
							className="fa-solid fa-chevron-right"
							style={{ color: "#ffffff" }}
						></i>
					</button>
				</div>
			</section>
			<section className="account-edit">
				<div className="account-content-wrapper">
					<h3 className="account-title">
						Argent Bank Credit Card (x8349)
					</h3>
					<p className="account-amount">$184.30</p>
					<p className="account-amount-description">
						Current Balance
					</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button-edit">
						<i
							className="fa-solid fa-chevron-right"
							style={{ color: "#ffffff" }}
						></i>
					</button>
				</div>
			</section>
		</main>
	);
}
