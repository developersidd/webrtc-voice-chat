import { cn } from "@sglara/cn";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

type ButtonProps = {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
};

const Button = ({
  label,
  href,
  onClick,
  icon = <ArrowRight size={19} />,
  className,
}: ButtonProps) => {
  return (
    <button
      className={cn`bg-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full cursor-pointer flex items-center justify-center
        ${className || ""}`}
      onClick={onClick}
    >
      {href ? (
        <Link to={href} className="flex items-center">
          <span>{label}</span>
          {icon && <span className="ml-2">{icon}</span>}
        </Link>
      ) : (
        <>
          <span>{label}</span>
          {icon && <span className="ml-2">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
