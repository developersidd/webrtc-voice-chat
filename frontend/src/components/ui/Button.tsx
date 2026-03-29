import { cn } from "@sglara/cn";
import { ArrowRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";

type ButtonProps = {
  label: string;
  href?: string;
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
  className?: string;
};

const Button = ({
  label,
  href,
  onClick,
  isLoading = false,
  disabled = false,
  icon = <ArrowRight size={19} />,
  className,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn`bg-blue hover:bg-blue-500 text-white font-bold py-2 px-4 rounded-full cursor-pointer flex items-center justify-center
        ${className || ""}`}
      onClick={onClick}
    >
      {isLoading ? (
        <Loader color="#fff" />
      ) : href ? (
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
