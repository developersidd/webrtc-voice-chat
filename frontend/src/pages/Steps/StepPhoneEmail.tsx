import { Mail, Phone } from "lucide-react";
import { useState, type JSX } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
type StepPhoneEmailProps = {
  onNext: () => void;
};

type TabUnion =
  | { name: "phone"; icon: JSX.Element }
  | { name: "email"; icon: JSX.Element };

const tabs: TabUnion[] = [
  { name: "phone", icon: <Phone className="text-white" /> },
  { name: "email", icon: <Mail size={25} className="text-white" /> },
];

const StepPhoneEmail = ({ onNext }: StepPhoneEmailProps) => {
  const [tab, setTab] = useState<TabUnion>(tabs[0]);
  const [phone, setPhone] = useState("");
  console.log("🚀 ~ phone:", phone);
  const [email, setEmail] = useState("");
  const changeTab = (tab: TabUnion) => {
    setTab(tab);
  };
  return (
    <div className="">
      <Card className="relative pb-32">
        <div className="absolute -top-16 right-0   flex gap-3">
          {tabs.map((t) => (
            <button
              key={t.name}
              onClick={() => changeTab(t)}
              className={` ${tab.name === t.name ? "bg-blue" : "bg-secondary"} px-3 py-2.75 rounded-lg`}
            >
              {t.icon}
            </button>
          ))}
        </div>
        <div className="w-87.5 mx-auto">
          <div className="flex justify-center items-center gap-4 mb-7 md:mb-9">
            <img
              className="size-7.5"
              src={tab.name === "phone" ? "/phone.png" : "/mail.png"}
              alt={tab.name}
            />
            <h2 className="text-white  text-lg  md:text-[22px] font-bold">
              {" "}
              Enter your{" "}
              {tab.name === "phone" ? "phone number" : "email address"}
            </h2>
          </div>
          <div className="mx-auto text-center ">
            {tab.name === "phone" ? (
              <PhoneInput
                //isValid={(inputNumber, country, countries) => {}}
                enableSearch
                country={"bd"}
                buttonClass="!pl-[10px] !outline-none"
                searchClass="!bg-secondary mb-2"
                dropdownClass="!bg-secondary !text-grey"
                containerClass="mb-4 h-[50px] !w-[90%]  mx-auto"
                excludeCountries={["il"]}
                inputClass="h-full !border-0 !bg-secondary !text-grey !rounded-lg"
                value={phone}
                onChange={(phone) => setPhone(phone)}
                placeholder="Enter your phone number"
                //className="bg-secondary text-white rounded-lg px-4 py-2 w-[87.5%] mx-auto block"
              />
            ) : (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jhondo@example.com"
                className="bg-secondary text-white rounded-lg px-4 py-2 h-[50px] w-[80%] mx-auto block text-center"
              />
            )}
          </div>
          <Button
            className="mt-10 w-32.5 mx-auto"
            label="Next"
            onClick={onNext}
          />
          <p className="text-grey text-sm mt-5 px-4 text-center">
            By entering your number, you’re agreeing to our Terms of Service and
            Privacy Policy. Thanks!
          </p>
        </div>
      </Card>
    </div>
  );
};

export default StepPhoneEmail;
