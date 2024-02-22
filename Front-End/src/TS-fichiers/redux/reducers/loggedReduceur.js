const loggedReduceur = (state = false, action) => { // false
	switch (action.type) {
		case "ISLOGIN":
			return (state = true);
		case "ISLOGOUT":
			return (state = false); //false
		default:
			return state;
	}
};

export default loggedReduceur;