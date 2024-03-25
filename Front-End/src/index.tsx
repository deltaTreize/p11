import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import persistor from "./TS-fichiers/redux/reducers/store";
import {persistStore} from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import Spinner from "./TS-fichiers/components/spinner/spinner";





ReactDOM.render(
	<Provider store={persistor}>
		<React.StrictMode>
			<PersistGate loading={<Spinner/>} persistor={persistStore(persistor)}>
			<App />
			</PersistGate>
		</React.StrictMode>
	 </Provider>,
	 document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
