import {
	AuthActionTypes,
	LOGOUT,
	SIGN_IN,
	UserState,
} from "../actions/typeAction";

let initialState: UserState = {
	id: "",
	firstName: "",
	lastName: "",
	userName: "",
	email: "",
	createdAt: "",
	role: "",
	account: [],
};

const userReducer = (	state = initialState,	action: AuthActionTypes ): UserState => {
	switch (action.type) {
		case SIGN_IN:
			return {
				id: action.payload.id,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				userName: action.payload.userName,
				email: action.payload.email,
				createdAt: action.payload.createdAt,
				account: action.payload.account,
				role: action.payload.role,
			};

		case LOGOUT:
			return initialState;

		default:
			return state;
	}
};

export default userReducer;
