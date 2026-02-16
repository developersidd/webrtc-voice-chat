import { Mail, Phone } from "lucide-react";
import { useState, type JSX } from "react";
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
  const [email, setEmail] = useState("");
  const changeTab = (tab: TabUnion) => {
    setTab(tab);
  };
  return (
    <div className="">
      <Card className="relative">
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
        <div>
          <div className="flex justify-center items-center gap-4 mb-10">
            <img
            className="size-7.5"
              src={tab.name === "phone" ? "/phone.png" : "/mail.png"}
              alt={tab.name}
            />
            <h2 className="text-white  text-lg  md:text-[22px] font-bold">
              {" "}
              Enter your {tab.name}
            </h2>

          </div>
          <button onClick={onNext}>Next</button>
        </div>
      </Card>
    </div>
  );
};

export default StepPhoneEmail;
