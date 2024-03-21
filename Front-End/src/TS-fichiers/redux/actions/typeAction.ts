export const SIGN_IN = "SIGN_IN";
export const LOGOUT = "LOGOUT";
export const TOKEN_ON = "TOKEN_ON";
export const TOKEN_OFF = "TOKEN_OFF";


export interface SignInAction {
	type: typeof SIGN_IN;
	payload: UserState;
}

export interface LogoutAction {
	type: typeof LOGOUT;
}

export interface TokenOnAction {
	type: typeof TOKEN_ON;
	payload:{token:string}
}

export interface TokenOffAction {
	type: typeof TOKEN_OFF;
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
	role: string;
	account: [];
}

export interface RootState {
	token: TokenState;
	user: UserState;
}

export type AuthActionTypes =
	| SignInAction
	| LogoutAction
	| TokenOnAction
	| TokenOffAction
