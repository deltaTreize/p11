
import {
  ADMIN,
  AuthActionTypes,
  IS_LOGIN,
  IS_LOGOUT,
  LOGOUT,
  NOT_ADMIN,
  SIGN_IN,
  TOKEN_OFF,
  TOKEN_ON,
} from "./typeAction";

interface UserData{
  id: string;
  lastName: string;
  firstName: string;
  email: string;
  userName: string;
  createdAt: string;
}

export function Login(userData: UserData): AuthActionTypes {
  return {
    type: SIGN_IN,
    payload: userData,
  };
}

export function Logout(): AuthActionTypes {
  return {
    type: LOGOUT,
  };
}

export function IsLoggin(): AuthActionTypes {
  return {
    type: IS_LOGIN,
  };
}

export function IsLogout(): AuthActionTypes {
  return {
    type: IS_LOGOUT,
  };
}

export function TokenOn(): AuthActionTypes {
  return {
    type: TOKEN_ON,
  };
}

export function TokenOff(): AuthActionTypes {
  return {
    type: TOKEN_OFF,
  };
}

export function Admin(): AuthActionTypes {
  return {
    type: ADMIN,
  };
}

export function NotAdmin(): AuthActionTypes {
  return {
    type: NOT_ADMIN,
  };
}
