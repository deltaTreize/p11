import { StrictMode } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./JS-fichiers/components/header/header.jsx";
import { Footer } from "./JS-fichiers/components/footer/footer.jsx";
import { HomePage } from "./JS-fichiers/pages/pagePublic/homePage/homePage.jsx";
import { SignIn } from "./JS-fichiers/pages/pagePublic/signInPage/signInPage.jsx";
import { SignUp } from "./JS-fichiers/pages/pagePublic/signUpPage/signUpPage.jsx";
import { User } from "./JS-fichiers/pages/pagesUsers/userPage/userPage.jsx";
import { EditPage } from "./JS-fichiers/pages/pagesUsers/editPage/editPage.jsx";
import { AdminPage } from "./JS-fichiers/pages/pagesAdmin/adminPage/adminPage.jsx";
import { AdminUserPage } from "./JS-fichiers/pages/pagesAdmin/adminUserPage/AdminUserPage.jsx";
import { AdminUserAccountPage } from "./JS-fichiers/pages/pagesAdmin/adminUserAccountPage/adminUserAccountPage.jsx";
import { UserAccontPage } from "./JS-fichiers/pages/pagesUsers/userAccontPage/userAccontPage.jsx";
import { useSelector } from "react-redux";

import "./App.scss";

function App() {
	const logged = useSelector((state) => state.allReducer.isLogged);
	const admin = useSelector((state) => state.allReducer.admin);

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
					{admin && <Route path="/admin/:userId/:nbAccount" element={<AdminUserAccountPage />} />}
					{logged && <Route path="/user" element={<User />} />}
					{logged && <Route path="/user/:userId" element={<User />} />}
					{logged && <Route path="/user/:userId/:userNbAccount" element={<UserAccontPage />} />}
					{logged && <Route path="/edit/:userId" element={<EditPage />} />}
				</Routes>
				<Footer />
			</BrowserRouter>
		</StrictMode>
	);
}

export default App;
