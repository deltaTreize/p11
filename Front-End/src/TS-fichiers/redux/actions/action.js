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

export function IsLoggin() {
	return {
		type: "ISLOGIN",
	};
}

export function IsLogout() {
	return {
		type: "ISLOGOUT",
	};
}

export function TokenOn() {
	return {
		type: 'TOKEN_ON',
	};
}

export function TokenOff (){
	return {
		type: 'TOKEN_OFF',
	};
}