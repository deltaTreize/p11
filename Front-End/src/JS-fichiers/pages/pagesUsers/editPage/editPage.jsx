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

	async function handleChange() {
		let headersList = {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			userName: `${userNameValue}`,
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
			email: email,
		};
		dispatch(Login(userData));
		setUserNameValue("");
	}

	return (
		<main className="main bg-dark mainEdit">
			<div className="header">
				<BackArrow chemin={`/user/${id}`} />
				<h1>Vos Informations</h1>
			</div>
			<div className="header-edit">
				<form action="" onSubmit={handleChange}>
					<div className="allLabel">
						<label htmlFor="userName">
							Nom d'utilisateur:
							<input
								type="text"
								placeholder={userName}
								id="userName"
								onChange={(e) =>
									setUserNameValue(e.target.value)
								}
							/>
						</label>
						<div className="infos">
							<p className="infos-title">email:</p>
							<p className="infos-content">{email}</p>
						</div>
						<div className="infos">
							<p className="infos-title">Nom:</p>
							<p className="infos-content">{lastName}</p>
						</div>
						<div className="infos">
							<p className="infos-title">Prénom:</p>
							<p className="infos-content">{firstName}</p>
						</div>
						<div className="infos">
							<p className="infos-title">votre conseillé:</p>
							<p className="infos-content">{"DUPOND Jean"}</p>
						</div>
						<div className="infos">
							<p className="infos-title">date de création:</p>
							<p className="infos-content">{createdAt.slice(0, 10)}</p>
						</div>
					</div>
					<div className="edit-buttons">
						<input
							className="buttonArgentBank"
							type={"submit"}
							text="Save"
						/>
						<Button to={`/user/${id}`} text="Cancel" />
					</div>
				</form>
			</div>
		</main>
	);
}
