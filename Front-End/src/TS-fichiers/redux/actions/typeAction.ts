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

export interface searchAction{
	type: "changeSearch";
	payload: SearchState
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
	search: SearchState;
}

export interface SearchState{
	searchName: string;
	sortBy: string;
	sortOrder: string;
	page: number;
	limit: number
}

export type AuthActionTypes =
	| SignInAction
	| LogoutAction
	| TokenOnAction
	| TokenOffAction
	| searchAction
