import {
	LogoutAction,
	SearchState,
	SignInAction,
	TokenOffAction,
	TokenOnAction,
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
