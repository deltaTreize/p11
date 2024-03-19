import React from "react";
import { Link } from "react-router-dom";
import './button.scss';

interface ButtonProps {
  type: string;
  to: string;
  text: string;
  className: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;

}

export function Button({type, onClick, to, text, className}: ButtonProps){

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