
const loggedReduceur = (state = localStorage.token ? true : false , action) => {
	switch (action.type) {
		case "ISLOGIN":
			return (state = true);

		case "ISLOGOUT":
			return (state = false);

		default:
			return state;
	}
};

export default loggedReduceur;
