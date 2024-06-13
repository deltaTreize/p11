export interface SignInAction {
	type: "SIGN_IN";
	payload: UserState;
}

export interface UpdateAccountAction {
	type: "UPDATE_ACCOUNT";
	payload: {
		account: AccountData[];
	};
}

export interface UpdateBeneficiairesAction {
	type: "UPDATE_BENEFICIAIRES";
	payload: {
		beneficiairesExternes: Beneficiaires[];
	};
}
export interface UpdateBudgetAction {
	type: "UPDATE_BUDGET";
	payload: {
		budget: Budget[];
	};
}

export interface LogoutAction {
	type: "LOGOUT";
}

export interface TokenOnAction {
	type: "TOKEN_ON";
	payload: { token: string };
}

export interface TokenOffAction {
	type: "TOKEN_OFF";
}

export interface searchAction {
	type: "changeSearch";
	payload: SearchState;
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
	_id: string;
}

export interface RootState {
	token: TokenState;
	user: UserState;
	search: SearchState;
}

export interface SearchState {
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
	| UpdateAccountAction
	| UpdateBeneficiairesAction
	| UpdateBudgetAction

