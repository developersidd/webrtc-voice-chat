import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { useVerifyOTPMutation } from "../../redux/features/auth/authApi";
import { authSelector } from "../../redux/features/auth/authSelector";
import { setAuth } from "../../redux/features/auth/authSlice";

const StepOtp = () => {
  const pathname = useLocation().pathname;
  const [verifyOtp, { isLoading }] = useVerifyOTPMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { otp } = useAppSelector(authSelector);
  const isLogin = pathname?.toLowerCase() === "/login";
  const [code, setCode] = useState(["", "", "", ""]);
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
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      const newCode = [...code];
      newCode[i] = value;
      setCode(newCode);
      if (i < inputs.length - 1) {
        inputs[i + 1]?.current?.focus();
      }
    } else if (value === "") {
      const newCode = [...code];
      newCode[i] = "";
      setCode(newCode);
    }
  };

  const isFilled = code.every((c) => c !== "");
  const handleNext = async () => {
    if (!isFilled || !otp.email || !otp.hash) {
      return toast.error("Please enter the complete OTP.");
    }
    try {
      const res = await verifyOtp({
        otp: code.join(""),
        email: otp.email,
        hash: otp.hash,
      }).unwrap();
      console.log("🚀 ~ res:", res);
      if (res?.statusCode === 200) {
        dispatch(setAuth(res?.data));
        toast.success("OTP verified successfully!");
      }
    } catch (error) {
      const errMsg =
        error?.data?.message || "Failed to verify OTP. Please try again.";
      toast.error(errMsg);
      console.error("Error verifying OTP:", error);
    }
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
                  text-white focus:outline-0 focus:drop-shadow-sm focus:drop-shadow-blue focus:bg-[#454545]
                  `}
              />
            ))}
          </div>
          {/* {error && (
                ${
                  error &&
                  code[i] === "" &&
                  `drop-shadow-red-800
                drop-shadow-sm`
                }
            <p className="text-center text-red-500 text-sm mt-0">{error}</p>
          )}
          */}
          <p className="text-grey text-sm mt-5 px-4 text-center">
            Didn't receive? Tap to resend
          </p>
        </div>

        <Button
          disabled={isLoading || !isFilled}
          className="mt-10 w-32.5 mx-auto "
          label={isLogin ? "Submit" : "Next"}
          onClick={handleNext}
        />
      </div>
    </Card>
  );
};

export default StepOtp;
