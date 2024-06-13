import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import Spinner from "./TS-fichiers/components/spinner/spinner";
import persistor from "./TS-fichiers/redux/reducers/store";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
	<Provider store={persistor}>
		<React.StrictMode>
			<PersistGate loading={<Spinner />} persistor={persistStore(persistor)}>
				<App />
			</PersistGate>
		</React.StrictMode>
	</Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
