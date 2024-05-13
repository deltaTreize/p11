import React, { StrictMode } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Footer } from "./TS-fichiers/components/footer/footer";
import { Header } from "./TS-fichiers/components/header/header";
import { HomePage } from "./TS-fichiers/pages/pagePublic/homePage/homePage";
import { SignIn } from "./TS-fichiers/pages/pagePublic/signInPage/signInPage";
import { SignUp } from "./TS-fichiers/pages/pagePublic/signUpPage/signUpPage";
import { AdminPage } from "./TS-fichiers/pages/pagesAdmin/adminPage/adminPage";
import { AdminUserAccountPage } from "./TS-fichiers/pages/pagesAdmin/adminUserAccountPage/adminUserAccountPage";
import { AdminUserPage } from "./TS-fichiers/pages/pagesAdmin/adminUserPage/AdminUserPage";
import { EditPage } from "./TS-fichiers/pages/pagesUsers/editPage/editPage";
import { UserAccontPage } from "./TS-fichiers/pages/pagesUsers/userAccontPage/userAccontPage";
import { User } from "./TS-fichiers/pages/pagesUsers/userPage/userPage";
import { RootState } from "./TS-fichiers/redux/actions/typeAction";
import { VirementPage } from "./TS-fichiers/pages/pagesUsers/virementPage/virementPage";
import { Budget } from "./TS-fichiers/pages/pagesUsers/budgetPage/budgetPage";

function App() {
	const token = useSelector((state: RootState) => state.token);
	const logged: boolean = token ? true : false;
	const adminState: string = useSelector((state: RootState) => state.user.role);
	const admin: boolean = adminState === "admin" ? true : false;
	return (
		<StrictMode>
			<BrowserRouter>
				<Header />
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/sign-In" element={<SignIn />} />
					<Route path="/sign-Up" element={<SignUp />} />
					{admin && <Route path="/admin" element={<AdminPage />} />}
					{admin && <Route path="/admin/:userId" element={<AdminUserPage />} />}
					{admin && (
						<Route
							path="/admin/:userId/:nbAccount"
							element={<AdminUserAccountPage />}
						/>
					)}
					{logged && <Route path="/user/home" element={<User />} />}
					{logged && <Route path="/user/:userId" element={<User />} />}
					{logged && (
						<Route
							path="/user/home/:userId/:nbAccount"
							element={<UserAccontPage />}
						/>
					)}
					{logged && <Route path="/edit/:userId" element={<EditPage />} />}
					{logged && <Route path="/user/:userId/virement" element={<VirementPage />} />}
					{logged && <Route path="/user/:userId/budget" element={<Budget />} />}
				</Routes>
				<Footer />
			</BrowserRouter>
		</StrictMode>
	);
}

export default App;
