import { useState } from "react";
import StepAvatar from "../Steps/StepAvatar";
import StepName from "../Steps/StepName";

const steps = {
  1: StepName,
  2: StepAvatar,
};

const Activate = () => {
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

export default Activate;
