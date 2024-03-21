
import {
  AuthActionTypes,
  LOGOUT,
  SIGN_IN,
  TOKEN_OFF,
  TOKEN_ON,
  UserState,
} from "./typeAction";


export function Login(data:UserState): AuthActionTypes {
  return {
    type: SIGN_IN,
    payload: {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      userName: data.userName,
      email: data.email,
      createdAt: data.createdAt,
      account: data.account,
      role: data.role,
    }
  };
}

export function Logout(): AuthActionTypes {
  return {
    type: LOGOUT,
  };
}

export function TokenOn(token:string): AuthActionTypes {
  return {
    type: TOKEN_ON,
    payload: {token}
  };
}

export function TokenOff(): AuthActionTypes {
  return {
    type: TOKEN_OFF,
  };
}
