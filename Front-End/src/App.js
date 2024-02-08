import { StrictMode } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Header } from "./TS-fichiers/components/header/header.tsx";
import { Footer } from "./TS-fichiers/components/footer/footer.tsx";
import { HomePage } from "./TS-fichiers/pages/homePage/homePage.tsx";
import { SignIn } from "./TS-fichiers/pages/sign-in/sign-In.tsx";
import { User } from "./TS-fichiers/pages/user/user.tsx";

import "./App.scss";

function App() {
	return (
		<>
			<StrictMode>
				<BrowserRouter>
					<Header />
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/Sign-In" element={<SignIn />} />
						<Route path="/User" element={<User />} />
					</Routes>
					<Footer />
				</BrowserRouter>
			</StrictMode>
		</>
	);
}

export default App;
