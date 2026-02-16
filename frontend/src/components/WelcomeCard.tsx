import { ArrowRight } from "lucide-react";
import Button from "./ui/Button";
import logo from "/logo.png";
import Card from "./ui/Card";
import { Link } from "react-router-dom";
const WelcomeCard = () => {
  return (
    <Card>
      <div className="flex items-center justify-center">
        <img
          className="size-6.5 sm:size-7.5  mr-2"
          src={logo}
          alt="logo"
          width={50}
          height={50}
        />
        <h1 className="text-white text-lg md:text-2xl font-bold text-center">
          Welcome to SiddikHouse
        </h1>
      </div>
      <div className="text-center">
        <p className="text-grey md:text-lg text-center mt-6 sm:mt-4 md:leading-8 w-[90%]  md:w-[80%] lg:w-[90%] mx-auto">
          We’re working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks :)
        </p>
        <Button
          href="/login"
          icon={<ArrowRight size={19} />}
          label="Get your username"
          //onClick={() => alert("Waitlist joined!")}
          className="mt-8 md:mt-10 mx-auto"
        />
      </div>
      <div className="mt-4 text-center">
        <span className="text-blue mr-1">Have an invite text?</span>
        <Link to="/login" className="text-blue hover:underline">
          Sign in
        </Link>
      </div>
    </Card>
  );
};

export default WelcomeCard;
