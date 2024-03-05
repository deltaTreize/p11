import { React, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { BackArrow } from "../../../components/backArrow/backArrow";

import "./AdminUserPage.scss";

export function AdminUserPage() {
	const id = useSelector((state) => state.allReducer.user.id);
	const [allUsers, setAllUsers] = useState([]);
	const { userLastName } = useParams();

	useEffect(() => {
		fetch("http://localhost:3001/api/v1/user", {
			method: "GET",
			headers: {
				id: `${id}`,
			},
		})
			.then((data) => data.json())
			.then((dataJson) => setAllUsers(dataJson.body));
	}, []);

	const target = allUsers.length ? allUsers.find((location) => location.lastName === userLastName) : null;
  if (target) {
    return (
      <main className="main bg-dark">
        <div className="header">
        <BackArrow chemin={"/admin"}/>
          <h1>{target.lastName} {target.firstName}</h1>
        </div>
        {target.account.map((data) => (
          <Link to={`${data.nbAccount}`} key={data.firstName + data.nbAccount}>
							<div className="account" >
								<p className="account-amount-description">
									{data.name}
								</p>
								<p className="account-amount-description">
									{data.nbAccount}
								</p>
								<p className="account-amount-description">
									{data.solde} €
								</p>
							</div>
              </Link>
						))}

        {/* <section className="account" key={user.id}>
            <div className="account-content-wrapper">
              <h3 className="account-title">
                {user.lastName} {user.firstName}
              </h3>
              <p className="account-amount">{user.email}</p>
            
                <div className="account">
                  <p className="account-amount-description">
                    {data.name}
                  </p>
                  <p className="account-amount-description">
                    {data.nbAccount}
                  </p>
                  <p className="account-amount-description">
                    {data.solde} €
                  </p>
                </div>
            </div>
            <div className="account-content-wrapper cta"></div>
          </section> */}
      </main>
    );
    
  }
}
