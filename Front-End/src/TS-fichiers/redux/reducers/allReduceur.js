import { combineReducers } from "redux";
import  userReduceur  from "./userReduceur";
import  loggedReduceur  from "./loggedReduceur";

const allReduceur = combineReducers({
  user : userReduceur,
  isLogged : loggedReduceur
})

export default allReduceur;