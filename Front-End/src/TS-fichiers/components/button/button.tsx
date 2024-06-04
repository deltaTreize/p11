import React from "react";
import { Link } from "react-router-dom";
import './button.scss';

interface Props {
  type: string;
  to: string;
  text: string;
  className: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

export function Button({type, onClick, to, text, className}: Props){

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