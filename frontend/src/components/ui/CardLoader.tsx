import Card from "./Card";
import Loader from "./Loader";

type CardLoaderProps = {
  text?: string;
  className?: string;
};

const CardLoader = ({ text, className }: CardLoaderProps) => {
  return (
    <Card className={`flex flex-col justify-center items-center h-72 lg:h-95 ${className || ""}`}>
      <Loader className="size-9 lg:size-12" />
      <p className="text-base lg:text-xl font-bold text-white mt-5">
        {text || "Activating your account..."}
      </p>
    </Card>
  );

  
};

export default CardLoader;
