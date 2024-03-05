const tokenReduceur = (state = localStorage.token, action) => {
	switch (action.type) {
		case "TOKEN_ON":
			return state;

		case "TOKEN_OFF":
			return (state = "");

		default:
			return state;
	}
};
export default tokenReduceur;
