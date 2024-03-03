import { combineReducers } from "redux";
import  userReduceur  from "./userReduceur";
import  loggedReduceur  from "./loggedReduceur";
import tokenReduceur from "./tokenReduceur";

const allReduceur = combineReducers({
  user : userReduceur,
  isLogged : loggedReduceur,
  token: tokenReduceur,
})

export default allReduceur;