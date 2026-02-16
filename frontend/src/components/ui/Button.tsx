import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  label: string;
  href: string;
  onClick: () => void;
  icon?: React.ReactNode;
  className?: string;
};

const Button = ({ label, href, onClick, icon, className }: ButtonProps) => {
  return (
    <button
      className={`bg-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full cursor-pointer flex items-center justify-center
        ${className || ""}`}
      onClick={onClick}
    >
      <Link to={href} className="flex items-center">
        <span>{label}</span>
        {icon && <span className="ml-2">{icon}</span>}
      </Link>
    </button>
  );
};

export default Button;
