import {
	LogoutAction,
	SignInAction,
	TokenOffAction,
	TokenOnAction,
	UserState,
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
