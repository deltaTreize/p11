import { StrictMode } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./TS-fichiers/components/header/header.jsx";
import { Footer } from "./TS-fichiers/components/footer/footer.jsx";
import { HomePage } from "./TS-fichiers/pages/homePage/homePage.jsx";
import { SignIn } from "./TS-fichiers/pages/sign-in/sign-In.jsx";
import { SignUp } from "./TS-fichiers/pages/sign-up/sign-Up.jsx";
import { User } from "./TS-fichiers/pages/user/user.jsx";
import  { EditPage }  from "./TS-fichiers/pages/editPage/editPage.jsx";

import "./App.scss";
import { useSelector } from "react-redux";

function App() {
	const logged = useSelector(state => state.allReducer.isLogged)
	return (
		<>
			<StrictMode>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/Sign-In" element={<SignIn />} />
						<Route path="/Sign-Up" element={<SignUp />} />
						{logged && <Route path="/User" element={<User />} />}
						{logged && <Route path="/Edit" element={<EditPage />} />}
					</Routes>
					<Footer />
				</BrowserRouter>
			</StrictMode>
		</>
	);
}

export default App;
