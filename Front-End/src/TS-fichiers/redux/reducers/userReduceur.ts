import {
	AuthActionTypes,
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
	picture: "",
	account: [],
	updatedAt: "",
	budget: [],
	beneficiairesExternes: []
};

const userReducer = (	state = initialState,	action: AuthActionTypes ): UserState => {
	switch (action.type) {
		case "SIGN_IN":
			return {
				...state,
				id: action.payload.id,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				userName: action.payload.userName,
				email: action.payload.email,
				createdAt: action.payload.createdAt,
				account: action.payload.account,
				role: action.payload.role,
				picture: action.payload.picture,
				updatedAt: action.payload.updatedAt,
				budget: action.payload.budget,
				beneficiairesExternes: action.payload.beneficiairesExternes
			};

		case "LOGOUT":
			return initialState;

		default:
			return state;
	}
};

export default userReducer;
