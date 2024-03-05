import { StrictMode } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./TS-fichiers/components/header/header.jsx";
import { Footer } from "./TS-fichiers/components/footer/footer.jsx";
import { HomePage } from "./TS-fichiers/pages/homePage/homePage.jsx";
import { SignIn } from "./TS-fichiers/pages/sign-in/sign-In.jsx";
import { SignUp } from "./TS-fichiers/pages/sign-up/sign-Up.jsx";
import { User } from "./TS-fichiers/pages/user/user.jsx";
import { EditPage } from "./TS-fichiers/pages/editPage/editPage.jsx";
import { AdminPage } from "./TS-fichiers/pages/adminPage/adminPage.jsx";
import { AdminUserPage } from "./TS-fichiers/pages/adminUserPage/AdminUserPage.jsx";
import { AdminUserAccountPage } from "./TS-fichiers/pages/adminUserAccountPage/adminUserAccountPage.jsx";
import { UserAccontPage } from "./TS-fichiers/pages/userAccontPage/userAccontPage.jsx";

import "./App.scss";
import { useSelector } from "react-redux";

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
					{admin && <Route path="/admin/:userLastName" element={<AdminUserPage />} />}
					{admin && <Route path="/admin/:userLastName/:nbAccount" element={<AdminUserAccountPage />} />}
					{logged && <Route path="/user" element={<User />} />}
					{logged && <Route path="/user/:userNbAccount" element={<UserAccontPage />} />}
					{logged && <Route path="/edit" element={<EditPage />} />}
				</Routes>
				<Footer />
			</BrowserRouter>
		</StrictMode>
	);
}

export default App;
