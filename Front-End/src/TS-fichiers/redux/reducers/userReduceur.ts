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
	beneficiairesExternes: [],
	category: [],
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
				beneficiairesExternes: action.payload.beneficiairesExternes,
				category: action.payload.category
			};

		case "UPDATE_ACCOUNT":
			return {
				...state,
				account: action.payload.account,

			};

		case "UPDATE_BENEFICIAIRES":
			return {
				...state,
				beneficiairesExternes: action.payload.beneficiairesExternes,
			};

		case "UPDATE_CATEGORY":
			return {
				...state,
				category: action.payload.category,
			};
			
		case "UPDATE_BUDGET":
			return {
				...state,
				budget: action.payload.budget,
			};

		case "LOGOUT":
			return initialState;

		default:
			return state;
	}
};

export default userReducer;
