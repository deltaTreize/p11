
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
	updatedAt: string;
	role: string;
	picture: string;
	account: AccountData[];
	budget: Budget[];
	beneficiairesExternes: Beneficiaires[];
}

export interface AccountData {
	_id: number;
	name: string;
	nbAccount: string;
	solde: number;
	visible: boolean;
  cardNumber: string;
  cardDate: string;
	operations: Operation[];
}

export interface Operation {
	_id: string;
	date: string;
	title: string;
	description: string;
	montant: number;
	category: string;
}

export interface Budget {
	name: string;
	value: number;
}

export interface Beneficiaires {
	name: string;
	rib: string;
	onDelete: (rib: string) => void;
	onModify: ( oldRib: string, name: string, rib: string) => void;
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
	limit: number;
}

export type AuthActionTypes =
	| SignInAction
	| LogoutAction
	| TokenOnAction
	| TokenOffAction
	| searchAction
