import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../../../redux/actions/action.js";
import { Button } from "../../../components/button/button.jsx";
import { BackArrow } from "../../../components/backArrow/backArrow";

import "./editPage.scss";

export function EditPage() {
	const id = useSelector((state) => state.allReducer.user.id);
	const userName = useSelector((state) => state.allReducer.user.userName);
	const firstName = useSelector((state) => state.allReducer.user.firstName);
	const lastName = useSelector((state) => state.allReducer.user.lastName);
	const email = useSelector((state) => state.allReducer.user.email);
	const createdAt = useSelector((state) => state.allReducer.user.createdAt);
	const token = useSelector((state) => state.allReducer.token);
	const dispatch = useDispatch();

	const [userNameValue, setUserNameValue] = useState(userName);
	const [emailValue, setEmailValue] = useState(email);

	async function handleChange() {
		let headersList = {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			userName: `${userNameValue}`,
			email: `${emailValue}`,
		});
		const userDataFetched = await fetch(
			"http://localhost:3001/api/v1/user/profile",
			{
				method: "PUT",
				headers: headersList,
				body: bodyContent,
			}
		);
		const userData = {
			id: id,
			firstName: firstName,
			lastName: lastName,
			userName: userNameValue,
			email: emailValue,
		};
		dispatch(Login(userData));
		setUserNameValue("");
		setEmailValue("");
	}

	return (
		<main className="main bg-dark mainEdit">
			<div className="header">
				<BackArrow chemin={"/user"} />
				<h1>Edit your info</h1>
			</div>
			<div className="header-edit">
				<form action="" onSubmit={handleChange}>
					<div className="allLabel">
						<label htmlFor="userName">
							User name:
							<input
								type="text"
								placeholder={userName}
								id="userName"
								onChange={(e) =>
									setUserNameValue(e.target.value)
								}
							/>
						</label>
						<label htmlFor="lastName">
							email:
							<input
								type="text"
								placeholder={email}
								id="lastName"
								onChange={(e) => setEmailValue(e.target.value)}
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
						<label htmlFor="lastName">
							votre conseillé:
							<input
								type="text"
								value="DUPOND Jean"
								id="lastName"
								disabled
							/>
						</label>
						<label htmlFor="lastName">
							date de création:
							<input
								type="text"
								value={createdAt.slice(0, 10)}
								id="lastName"
								disabled
							/>
						</label>
					</div>
					<div className="edit-buttons">
						<input
							className="buttonArgentBank"
							type={"submit"}
							text="Save"
						/>
						<Button to={"/user"} text="Cancel" />
					</div>
				</form>
			</div>
		</main>
	);
}
