import {
	AccountData,
	Beneficiaires,
	Budget,
	LogoutAction,
	SearchState,
	SignInAction,
	TokenOffAction,
	TokenOnAction,
	UpdateAccountAction,
	UpdateBeneficiairesAction,
	UpdateBudgetAction,
	UserState,
	searchAction,
} from "./typeAction";

export function Login(data: UserState): SignInAction {
	return {
		type: "SIGN_IN",
		payload: {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			userName: data.userName,
			email: data.email,
			createdAt: data.createdAt,
			account: data.account,
			role: data.role,
			picture: data.picture,
			updatedAt: data.updatedAt,
			budget: data.budget,
			beneficiairesExternes: data.beneficiairesExternes,
		},
	};
}

export function UpdateAccount(data: AccountData[]): UpdateAccountAction {
	return {
		type: "UPDATE_ACCOUNT",
		payload: {
			account: data,
		},
	};
}

export function UpdateBeneficiaires(
	data: Beneficiaires[]
): UpdateBeneficiairesAction {
	return {
		type: "UPDATE_BENEFICIAIRES",
		payload: {
			beneficiairesExternes: data,
		},
	};
}
export function UpdateBudget(
	data: Budget[]
): UpdateBudgetAction {
	return {
		type: "UPDATE_BUDGET",
		payload: {
			budget: data,
		},
	};
}

export function Logout(): LogoutAction {
	return {
		type: "LOGOUT",
	};
}

export function TokenOn(token: string): TokenOnAction {
	return {
		type: "TOKEN_ON",
		payload: { token },
	};
}

export function TokenOff(): TokenOffAction {
	return {
		type: "TOKEN_OFF",
	};
}

export function changeSearch(data: SearchState): searchAction {
	return {
		type: "changeSearch",
		payload: {
			searchName: data.searchName,
			sortBy: data.sortBy,
			sortOrder: data.sortOrder,
			page: data.page,
			limit: data.limit,
		},
	};
}
