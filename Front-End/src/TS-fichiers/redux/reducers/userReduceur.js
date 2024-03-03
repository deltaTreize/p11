
let initialState = {
	id: "",
	firstName: "",
	lastName: "",
	userName: "",
};

if (localStorage.token){
	const userDataFetched = await fetch(
		"http://localhost:3001/api/v1/user/profile",
		{
			method: "POST",
			headers: {
				Authorization: "Bearer " + localStorage.token,
			},
		}
		);
		
		const userDataJson = await userDataFetched.json();
		
		initialState = {
			id: userDataJson.body.id,
			firstName: userDataJson.body.firstName,
			lastName: userDataJson.body.lastName,
			userName: userDataJson.body.userName,
		};
}

const userReduceur = ( state = initialState, action) => {
	switch (action.type) {
		case "SIGN_IN":
			return {
				id: action.payload.id,
				firstName: action.payload.firstName,
				lastName: action.payload.lastName,
				userName: action.payload.userName,
			};

		case "LOGOUT":
			return state = initialState = {
				id: "",
				firstName: "",
				lastName: "",
				userName: "",
			};

		default:
			return state;
	}
};
export default userReduceur;
