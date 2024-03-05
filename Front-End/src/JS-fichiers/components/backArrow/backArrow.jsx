import { NavLink } from "react-router-dom";

import './backArrow.scss';

export function BackArrow ({chemin}) {

  return(
    <NavLink to={chemin}>
      <i className="fa-solid fa-arrow-left" style={{color: "#ffffff"}}></i>
    </NavLink>
  )
}