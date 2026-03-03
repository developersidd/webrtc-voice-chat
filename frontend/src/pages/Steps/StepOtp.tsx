import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

type StepOtpProps = {
  onNext: () => void;
};

const StepOtp = ({ onNext }: StepOtpProps) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  console.log("🚀 ~ pathname:", pathname);
  const isLogin = pathname?.toLowerCase() === "/login";
  const [code, setCode] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  console.log("🚀 ~ error:", error);
  const inputs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
    i: number,
  ) => {
    //console.log("🚀 ~ e:", e);
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[i] = value;
      setCode(newCode);
      if (i < inputs.length - 1) {
        inputs[i + 1]?.current?.focus();
      }
      if (newCode.every((c) => c !== "")) {
        setError("");
      }
    } else if (value === "") {
      const newCode = [...code];
      newCode[i] = "";
      setCode(newCode);
    }
  };

  const handleNext = () => {
    const isFilled = code.every((c) => c !== "");
    console.log("🚀 ~ isFilled:", isFilled);
    setError(isFilled ? "" : "please fill the code box!");
    //if (error || !isFilled) return;
    //onNext();
    return navigate("/activate", {
      replace: true,
      //state: { phone: phoneData.phone, email },
    });
  };
  return (
    <Card className="">
      <div className="w-87.5 mx-auto">
        <div className="flex justify-center items-start  mb-7 md:mb-9 ">
          <img
            className="w-[22.85px] h-[28px]"
            src={"/lock-emoji.png"}
            alt={"otp"}
          />
          <h2 className="text-white text-lg  md:text-[22px] md:leading-7.5 font-bold text-center w-[60%] md:w-[75%]">
            {" "}
            Enter the code we just texted you
          </h2>
        </div>
        <div className="mb-7 md:mb-9">
          <div className="flex justify-center items-center gap-4 mb-2">
            {code.map((c, i) => (
              <input
                key={i}
                ref={inputs[i]}
                type="text"
                maxLength={1}
                value={c}
                onChange={(e) => handleChange(e, i)}
                className={`w-12 h-12 text-center text-lg rounded-xl bg-secondary
                  ${
                    error &&
                    code[i] === "" &&
                    `drop-shadow-red-800
                  drop-shadow-sm`
                  }
                  text-white focus:outline-0 focus:drop-shadow-sm focus:drop-shadow-blue focus:bg-[#454545]
                  `}
              />
            ))}
          </div>
          {error && (
            <p className="text-center text-red-500 text-sm mt-0">{error}</p>
          )}
          <p className="text-grey text-sm mt-5 px-4 text-center">
            Didn't receive? Tap to resend
          </p>
        </div>

        <Button
          className="mt-10 w-32.5 mx-auto"
          label={isLogin ? "Submit" : "Next"}
          onClick={handleNext}
        />
      </div>
    </Card>
  );
};

export default StepOtp;
