import { Link } from "react-router-dom";

import './button.scss';

export function Button({type, onClick, to, text, className}){

  return(
    <Link
    type={type}
    className= {`buttonArgentBank ${className}`}
    onClick={onClick}
    to={to}
  >
    {text}
  </Link>

  )

}