import { Link } from "react-router-dom";

import './button.scss';

export function Button({type, onClick, to, text}){

  return(
    <Link
    type={type}
    className= 'buttonArgentBank'
    onClick={onClick}
    to={to}
  >
    {text}
  </Link>

  )

}