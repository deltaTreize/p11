import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../redux/actions/action.js";
import { Button } from "../../components/button/button.jsx";

import "./editPage.scss";


export function EditPage() {
	const id = useSelector((state) => state.allReducer.user.id);
	const userName = useSelector((state) => state.allReducer.user.userName);
	const firstName = useSelector((state) => state.allReducer.user.firstName);
	const lastName = useSelector((state) => state.allReducer.user.lastName);
	const token = useSelector((state) => state.allReducer.user.token);
  const dispatch = useDispatch()

	const [inputValue, setInputValue] = useState(``);

	async function handleChange() {
		let headersList = {
			Accept: "*/*",
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
				headers: headersList,
				body: bodyContent,
			}
		);
		const userDataJson = await userDataFetched.json();
      console.log(userDataJson);
      console.log(inputValue);
    const userData = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      userName: inputValue,
      token: token,

    };
    dispatch(Login(userData));
    setInputValue('')
	}

	return (
		<main className="main bg-white">
			<div className="header-edit">
				<h1>Edit user info</h1>
				<label htmlFor="userName">
					User name:
					<input
						type="text"
						placeholder={userName}
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
					<Button onClick={handleChange} text="Save"/>
					<Button to={"/user"} text="Cancel"/>
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
