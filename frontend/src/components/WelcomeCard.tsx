import logo from "/assets/logo.svg";
const WelcomeCard = () => {
  return (
    <div>
      <div className="flex items-center">
        <img
          className="w-7.5 h-7.5 mr-2"
          src={logo}
          alt="logo"
          width={50}
          height={50}
        />
        <h1 className="text-white text-2xl font-bold text-center mt-10">
          Welcome to SiddikHouse
        </h1>
      </div>
      <div>
        <p className="text-grey text-xl text-center mt-4 leading-9">
          We’re working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks :)
        </p>
      </div>
    </div>
  );
};

export default WelcomeCard;
