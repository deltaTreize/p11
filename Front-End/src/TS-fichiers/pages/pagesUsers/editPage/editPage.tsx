import { useState } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "../../../components/button/button";
import { Login } from "../../../redux/actions/action";

import React from "react";
import "./editPage.scss";
import { AuthActionTypes, RootState, UserState } from "../../../redux/actions/typeAction.js";


export function EditPage() {
	const id = useSelector((state: RootState) => state.user.id);
	const userName = useSelector((state: RootState) => state.user.userName);
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const lastName = useSelector((state: RootState) => state.user.lastName);
	const email = useSelector((state: RootState) => state.user.email);
	const createdAt = useSelector((state: RootState) => state.user.createdAt);
	const role = useSelector((state: RootState) => state.user.role);
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
		const userData: UserState = {
			id: id,
			firstName: firstName,
			lastName: lastName,
			userName: userNameValue,
			email: email,
			createdAt: createdAt,
			role: role,
			account: [],
		};
		dispatch(Login(userData));
		setUserNameValue("");
	}

	return (
		<main className="main bg-dark mainEdit">
			<div className="header-edit">
				<h1>Vos Informations</h1>
			</div>
			<div className="edit">
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
						<div className="infos-edit">
							<p className="infos-edit-title">email:</p>
							<p className="infos-edit-content">{email}</p>
						</div>
						<div className="infos-edit">
							<p className="infos-edit-title">Nom:</p>
							<p className="infos-edit-content">{lastName}</p>
						</div>
						<div className="infos-edit">
							<p className="infos-edit-title">Prénom:</p>
							<p className="infos-edit-content">{firstName}</p>
						</div>
						<div className="infos-edit">
							<p className="infos-edit-title">votre conseillé:</p>
							<p className="infos-edit-content">{"DUPOND Jean"}</p>
						</div>
						<div className="infos-edit">
							<p className="infos-edit-title">date de création:</p>
							<p className="infos-edit-content">{createdAt.slice(0, 10)}</p>
						</div>
						<label htmlFor="picture">	
						photo de profil:
						<input type="file" id="picture"/>
						</label>

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
