import { isValidPhoneNumber, type CountryCode } from "libphonenumber-js";
import { Mail, Phone } from "lucide-react";
import { useState, type JSX } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useSendOTPMutation } from "../../redux/features/auth/authApi";

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
  const navigate = useNavigate();
  const [sendOTP, { isLoading }] = useSendOTPMutation();
  const [tab, setTab] = useState<TabUnion>(tabs[1]);
  const [isValid, setIsValid] = useState(false);
  const [showError, setShowError] = useState(false);
  const [phoneData, setPhoneData] = useState({
    phone: "",
    info: {
      countryCode: "",
      name: "",
      dialCode: "",
      format: "",
    },
  });
  const [email, setEmail] = useState("");

  // handle tab change
  const changeTab = (tab: TabUnion) => {
    setTab(tab);
    setIsValid(false);
    setShowError(false);
  };

  // validate phone number
  const validePhoneNumber = (phone: string, countryCode: string) => {
    const isValid = isValidPhoneNumber(
      phone,
      countryCode?.toUpperCase() as CountryCode,
    );

    // check for bd phone number length
    const isValidLength =
      countryCode === "bd" ? phone.replace(/\D/g, "").length === 13 : true;
    setIsValid(isValid && isValidLength);
  };

  // handle next button click
  const handleNext = async () => {
    if (!isValid) return;
    //  sent otp to email
    try {
      const res = await sendOTP({
        email,
      }).unwrap(); 
      console.log("🚀 ~ res:", res);
      if (res.data?.status === 200) {
        toast.success("OTP sent successfully!");
        return onNext();
      }
    } catch (error) {
      console.log("Error sending OTP:", error);
      toast.error("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="">
      <Card className="relative pb-32">
        {/*<div className="absolute -top-16 right-0   flex gap-3">
          {tabs.map((t) => (
            <button
              key={t.name}
              onClick={() => changeTab(t)}
              className={` ${tab.name === t.name ? "bg-blue" : "bg-secondary"} px-3 py-2.75 rounded-lg`}
            >
              {t.icon}
            </button>
          ))}
        </div>*/}
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
                enableSearch
                country={"bd"}
                buttonClass="!pl-[10px] !outline-none"
                searchClass="!bg-secondary mb-2"
                dropdownClass="!bg-secondary !text-grey"
                containerClass={`mb- h-[50px] !w-[90%]  mx-auto `}
                excludeCountries={["il"]}
                inputClass={`h-full !border-0  !bg-secondary !text-grey !rounded-lg ${!isValid && showError ? "!border-1 !border-red-500" : ""} !outline-none`}
                value={phoneData.phone}
                onChange={(phone, data) => {
                  console.log("🚀 ~ data:", data);
                  validePhoneNumber(phone, data?.countryCode);
                  setPhoneData({
                    phone,
                    info: data,
                  });
                }}
                placeholder="Enter your phone number"
                //className="bg-secondary text-white rounded-lg px-4 py-2 w-[87.5%] mx-auto block"
              />
            ) : (
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setIsValid(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value));
                }}
                placeholder="jhondo@example.com"
                className="focus:outline-0 bg-secondary text-white rounded-lg px-4 py-2 h-[50px] w-[80%] mx-auto block text-center"
              />
            )}
            {!isValid && showError && (
              <p className="text-red-500 text-sm mt-2">
                Please enter a valid{" "}
                {tab.name === "phone" ? "phone number" : "email address"}.
              </p>
            )}
          </div>

          <Button
            //isLoading={isLoading}
            disabled={!isValid || isLoading}
            className="mt-10 w-32.5 mx-auto disabled:opacity-80 disabled:cursor-not-allowed"
            label="Next"
            onClick={handleNext}
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
