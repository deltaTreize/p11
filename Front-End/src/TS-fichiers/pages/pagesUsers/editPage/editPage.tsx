import { useState } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { BackArrow } from "../../../components/backArrow/backArrow";
import { Button } from "../../../components/button/button";
import { Login } from "../../../redux/actions/action";

import React from "react";
import "./editPage.scss";
import { AuthActionTypes, RootState } from "../../../redux/actions/typeAction.js";

interface UserData{
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  userName: string;
	createdAt: string;
}

export function EditPage() {
	const id = useSelector((state: RootState) => state.user.id);
	const userName = useSelector((state: RootState) => state.user.userName);
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const lastName = useSelector((state: RootState) => state.user.lastName);
	const email = useSelector((state: RootState) => state.user.email);
	const createdAt = useSelector((state: RootState) => state.user.createdAt);
	const token = useSelector((state: RootState) => state.token.token);
	const dispatch:Dispatch<AuthActionTypes>= useDispatch();

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
		fetch(
			"http://localhost:3001/api/v1/user/profile",
			{
				method: "PUT",
				headers: headersList,
				body: bodyContent,
			}
		);
		const userData: UserData = {
			id: id,
			firstName: firstName,
			lastName: lastName,
			userName: userNameValue,
			email: email,
			createdAt: createdAt,
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
							type="submit"
							value="Save"
						/>
						<Button to={`/user/${id}`} text="Cancel" type={""} className={""} onClick={function (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void {
							throw new Error("Function not implemented.");
						} } />
					</div>
				</form>
			</div>
		</main>
	);
}
