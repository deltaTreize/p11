
export function Login(userData) {
	return {
		type: "SIGN_IN",
		payload: userData,
	};
}

export function Logout() {
	return {
		type: "LOGOUT",
	};
}

export function isLogin() {
	return {
		type: 'ISLOGIN',
	};
}
export function isLogout (){
	return {
		type: 'ISLOGOUT',
	};
}