import { cn } from "@sglara/cn";

type CardProps = {
  children: React.ReactNode;
  className?: string;
};
const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div
      className={cn`max-sm:w-[90%] max-w-150 bg-input rounded-[20px] flex-1 py-10 sm:py-12 lg:p-16 mt-10 mx-auto ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
