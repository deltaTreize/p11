export interface SignInAction {
	type: "SIGN_IN";
	payload: UserState;
}

export interface LogoutAction {
	type: "LOGOUT";
}

export interface TokenOnAction {
	type: "TOKEN_ON";
	payload:{token:string}
}

export interface TokenOffAction {
	type: "TOKEN_OFF";
}

export interface TokenState {
	token: string | null;
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
