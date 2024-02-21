let initialState= {
	id: "",
	firstName: "",
	lastName: "",
	userName: "",
	token: "",
};

const userReduceur = (state = initialState, action) => {
	switch (action.type) {
		case "SIGN_IN":
			return {
				id: action.payload.id,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				userName: action.payload.userName,
				token: action.payload.token,
			};

		case "LOGOUT":
			return initialState;

		default:
			return state;
	}
};

export default userReduceur;
