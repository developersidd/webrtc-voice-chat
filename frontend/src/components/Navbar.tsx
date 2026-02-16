import logo from "/logo.png";
const Navbar = () => {
  return (
    <header className="bg-primary container mx-auto px-4 py-10 flex items-center justify-between">
      <div className="flex items-center">
        <img
          className="w-[37.65px] h-7.5 mr-3"
          src={logo}
          alt="logo"
          width={50}
          height={50}
        />
        <h1 className="text-white font-bold text-2xl"> SiddikHouse</h1>
      </div>
    </header>
  );
};

export default Navbar;
