import { useLocation } from "react-router-dom";

type StepOtpProps = {
  onNext: () => void;
};

const StepOtp = ({ onNext }: StepOtpProps) => {
  const pathname = useLocation().pathname;
  console.log("🚀 ~ pathname:", pathname);
  const isLogin = pathname?.toLowerCase() === "/login";
  return (
    <div className="step-otp">
      <h2>Step Otp</h2>
      <button onClick={onNext}> Submit </button>
    </div>
  );
};

export default StepOtp;
