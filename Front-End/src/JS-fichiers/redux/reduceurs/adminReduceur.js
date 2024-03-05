const adminReduceur = (state = localStorage.id === "65e580d07d663d473c1b5047" ? true : false, action) => {
	switch (action.type) {
		case "ADMIN":
			return state = true;
		case "NOTADMIN":
			return state = false;
		default:
			return state;
	}
};

export default adminReduceur;
