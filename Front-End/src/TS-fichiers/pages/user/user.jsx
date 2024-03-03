import React from "react";
import { useSelector } from "react-redux";
import { Button } from "../../components/button/button.jsx";


import './user.scss'

export function User() {

  const firstName = useSelector(state => state.allReducer.user.firstName)
  const lastName = useSelector(state => state.allReducer.user.lastName)

	return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{firstName} {lastName}</h1>
        <Button to={"/edit"} text="Edit Name"/>
      </div>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <Button text="View transactions"/>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
        <Button text="View transactions"/>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
        <Button text="View transactions"/>
        </div>
      </section>
    </main>
	);
}


