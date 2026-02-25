import { useState } from "react";
import StepOtp from "../Steps/StepOtp";
import StepPhoneEmail from "../Steps/StepPhoneEmail";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
};

const Authenticate = () => {
  const [step, setStep] = useState<number>(1);
  const StepComponent = steps[step as keyof typeof steps];
  const handleNext = () => {
    if (step === 2) {
      return;
    }
    setStep((prev) => prev + 1);
  };
  return <StepComponent onNext={handleNext} />;
};

export default Authenticate;
