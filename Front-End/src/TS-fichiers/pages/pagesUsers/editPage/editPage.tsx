import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { Button } from "../../../components/button/button";
import { Login } from "../../../redux/actions/action";
import { AuthActionTypes, RootState, UserState } from "../../../redux/actions/typeAction.js";
import "./editPage.scss";


export function EditPage() {
	const id = useSelector((state: RootState) => state.user.id);
	const userName = useSelector((state: RootState) => state.user.userName);
	const firstName = useSelector((state: RootState) => state.user.firstName);
	const lastName = useSelector((state: RootState) => state.user.lastName);
	const email = useSelector((state: RootState) => state.user.email);
	const createdAt = useSelector((state: RootState) => state.user.createdAt);
	const role = useSelector((state: RootState) => state.user.role);
	const picture = useSelector((state: RootState) => state.user.picture);
	const token = useSelector((state: RootState) => state.token.token);
	const dispatch:Dispatch<AuthActionTypes>= useDispatch();

	const [userNameValue, setUserNameValue] = useState<string>(userName);
	const [pictureValue, setPictureValue] = useState<string>(picture);

	async function handleChange() {
		let headersList = {
			Accept: "*/*",
			Authorization: "Bearer " + token,
			"Content-Type": "application/json",
		};

		let bodyContent = JSON.stringify({
			userName: userNameValue,
			picture: pictureValue
		});
		fetch(
			"https://argentbank-bydelta13-api-c9d02df5fde5.herokuapp.com/api/v1/user/profile",
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
			picture: pictureValue,
			account: [],
		};
		dispatch(Login(userData));
		setUserNameValue("");
		setPictureValue("");
	}

	function uploadPicture(event: { target: { files: any[]; }; }) {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.onload = async () => {
            if (typeof reader.result === 'string') {
                const image = new Image();
                image.src = reader.result;
                image.onload = () => {
                    const canvas = document.createElement('canvas');
                    const maxWidth = 40;
                    const maxHeight = 40;
                    let width = image.width;
                    let height = image.height;

                    // Redimensionner l'image si elle dépasse les dimensions maximales
                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        width *= ratio;
                        height *= ratio;
                    }

                    canvas.width = width;
                    canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx?.drawImage(image, 0, 0, width, height);

                    // Convertir le canvas en base64
                    const base64String = canvas.toDataURL('image/jpeg');

                    console.log("base64", base64String);
                    if (typeof base64String === 'string') {
                        setPictureValue(base64String);
                    }
                };
            }
        };
        reader.readAsDataURL(file);
    }
};


	return (
		<main className="main bg-dark mainEdit">
			<div className="header-edit">
				<h1>Vos Informations</h1>
			</div>
			<div className="edit">
				<form action="" onSubmit={handleChange}>
					<div className="allLabel">
						<label htmlFor="userName">
							Nom d'utilisateur
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
							<p className="infos-edit-title">email</p>
							<p className="infos-edit-content">{email}</p>
						</div>
						<div className="infos-edit">
							<p className="infos-edit-title">Nom</p>
							<p className="infos-edit-content">{lastName}</p>
						</div>
						<div className="infos-edit">
							<p className="infos-edit-title">Prénom</p>
							<p className="infos-edit-content">{firstName}</p>
						</div>
						<div className="infos-edit">
							<p className="infos-edit-title">votre conseiller</p>
							<p className="infos-edit-content">{"DUPOND Jean"}</p>
						</div>
						<div className="infos-edit">
							<p className="infos-edit-title">date de création</p>
							<p className="infos-edit-content">{createdAt.slice(0, 10)}</p>
						</div>
						<label htmlFor="picture">	
						photo de profil
						<input type="file" id="picture" accept="image/*" onChange={ ()=> uploadPicture }/>
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
