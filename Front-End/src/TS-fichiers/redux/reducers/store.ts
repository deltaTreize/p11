import { configureStore, Reducer, Store } from "@reduxjs/toolkit";
import { persistCombineReducers, PersistConfig, persistStore } from "redux-persist";
import { PersistPartial } from "redux-persist/es/persistReducer";
import storage from "redux-persist/lib/storage";
import { AuthActionTypes, RootState } from "../actions/typeAction";
import tokenReducer from "./tokenReduceur";
import userReducer from "./userReduceur";

// Définissez la configuration de persistance
const persistConfig: PersistConfig<RootState> = {
  key: "root",
  storage,
};

// Définissez le type de votre rootReducer avec le Reducer correct
const rootReducer: Reducer<RootState & PersistPartial, AuthActionTypes> = persistCombineReducers(persistConfig, {
  user: userReducer,
  token: tokenReducer,
});

// Configurez votre store
const store: Store<RootState & PersistPartial> = configureStore({
  reducer: rootReducer as Reducer<RootState & PersistPartial>,
});

// Créez un persistor persistant
export const persistor = persistStore(store);

export default store;
