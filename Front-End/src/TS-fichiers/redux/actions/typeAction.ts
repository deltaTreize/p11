export const SIGN_IN = "SIGN_IN";
export const LOGOUT = "LOGOUT";
export const IS_LOGIN = "IS_LOGIN";
export const IS_LOGOUT = "IS_LOGOUT";
export const TOKEN_ON = "TOKEN_ON";
export const TOKEN_OFF = "TOKEN_OFF";
export const ADMIN = "ADMIN";
export const NOT_ADMIN = "NOT_ADMIN";

interface UserData {
	id: string;
	lastName: string;
	firstName: string;
	email: string;
	userName: string;
	createdAt: string;
}



export interface SignInAction {
	type: typeof SIGN_IN;
	payload: UserData;
}

export interface LogoutAction {
	type: typeof LOGOUT;
}

export interface IsLoginAction {
	type: typeof IS_LOGIN;
}

export interface IsLogoutAction {
	type: typeof IS_LOGOUT;
}

export interface TokenOnAction {
	type: typeof TOKEN_ON;
}

export interface TokenOffAction {
	type: typeof TOKEN_OFF;
}

export interface AdminAction {
	type: typeof ADMIN;
}

export interface NotAdminAction {
	type: typeof NOT_ADMIN;
}

export interface AdminState {
	isAdmin: boolean;
}

export interface LoggedState {
	isLoggedIn: boolean;
}

export interface TokenState {
	token: string;
}

export interface UserState {
	id: string;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	createdAt: string;
	account: [];
}

export interface RootState {
	admin: AdminState;
	isLogged: LoggedState;
	token: TokenState;
	user: UserState;
}

export type AuthActionTypes =
	| SignInAction
	| LogoutAction
	| IsLoginAction
	| IsLogoutAction
	| TokenOnAction
	| TokenOffAction
	| AdminAction
	| NotAdminAction;
