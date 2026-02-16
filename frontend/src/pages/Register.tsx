import { useState } from "react";
import StepAvatar from "./Steps/StepAvatar";
import StepName from "./Steps/StepName";
import StepOtp from "./Steps/StepOtp";
import StepPhoneEmail from "./Steps/StepPhoneEmail";
import StepUsername from "./Steps/StepUsername";

const steps = {
  1: StepPhoneEmail,
  2: StepOtp,
  3: StepName,
  4: StepAvatar,
  5: StepUsername,
};

const Register = () => {
  const [step, setStep] = useState<number>(1);
  const StepComponent = steps[step as keyof typeof steps];
  const handleNext = () => {
    if (step === 5) {
      return;
    }
    setStep((prev) => prev + 1);
  };
  return <StepComponent onNext={handleNext} />;
};

export default Register;
