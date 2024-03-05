import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BackArrow } from "../../../components/backArrow/backArrow";

export function UserAccontPage (){
  const firstName = useSelector((state) => state.allReducer.user.firstName);
	const lastName = useSelector((state) => state.allReducer.user.lastName);
	const [dataUsers, setDataUsers] = useState([]);
  const { userNbAccount } = useParams();

  useEffect(() => {
		fetch("http://localhost:3001/api/v1/user/profile", {
			method: "POST",
			headers: {
				Authorization: "Bearer " + localStorage.token,
			},
		})
			.then((alldata) => alldata.json())
			.then((data) => {
				console.log(data.body.account);
				setDataUsers(data.body.account);
			});
	}, []);
  const targetAccount = dataUsers
  ? dataUsers.find((nb) => nb.nbAccount === userNbAccount)
  : null;
  console.log(targetAccount);

if (targetAccount) {
  return(
			<main className="main bg-dark">
				<div className="header">
				<BackArrow chemin={`/user`}/>
					<h1>
						{lastName} {firstName}
					</h1>
				</div>
				<div className="account">
					<p className="account-amount-description">
						{targetAccount.name}
					</p>
					<p className="account-amount-description">
						{targetAccount.nbAccount}
					</p>
					<p className="account-amount-description">
						{targetAccount.solde} €
					</p>
				</div>
				{targetAccount.operations.map((data) => (
					<div className="account" key={data.title}>
						<p className="account-amount-description">
							{data.date}
						</p>
						<p className="account-amount-description colum accountTitle">
							{data.title}
							<span className="account-amount-description accountDescrition">
								{data.description}
							</span>
						</p>
						<p className="account-amount-description">
							{data.montant} €
						</p>
					</div>
				))}

			</main>
		);
}
	}