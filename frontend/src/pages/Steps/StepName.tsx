import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAppDispatch } from "../../redux/app/hooks";
import { setFullName } from "../../redux/features/activate/activateSlice";

type StepNameProps = {
  onNext: () => void;
};

const StepName = ({ onNext }: StepNameProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const dispatch = useAppDispatch();
  const validateName = (name: string) => {
    if (name.trim() === "") {
      return "Name is required";
    } else if (name.trim().length < 6) {
      return "Name must be at least 6 characters";
    }
    return "";
  };
  console.log("🚀 ~ error:", error);

  const handleNext = () => {
    const error = validateName(name);
    setError(error);
    if (error) return;
    dispatch(setFullName(name));
    onNext();
  };
  return (
    <Card className="relative pb-32">
      <div className="w-87.5 mx-auto">
        <div className="flex justify-center items-center gap-4 mb-7 md:mb-9">
          <img className="size-7.5" src={"/face-emoji.png"} alt={"name"} />
          <h2 className="text-white  text-lg  md:text-[22px] font-bold">
            {" "}
            What's your full name?
          </h2>
        </div>
        <div className="mx-auto text-center ">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              const value = e.target.value;
              setName(value);
              //if (error) {
              setError(validateName(value));
              //}
            }}
            placeholder="Your full name"
            className={`bg-secondary text-white rounded-lg px-4 py-2 h-[40px] w-[90%] mx-auto focus:outline-0 block ${error ? "border border-red-500" : ""}`}
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <p className="text-grey text-sm mt-6 px-4 text-center w-[200px] mx-auto">
            People use real names at siddikhouse :)
          </p>
        </div>

        <Button
          disabled={!name || !!error}
          className="mt-10 w-32.5 mx-auto"
          label="Next"
          onClick={handleNext}
        />
      </div>
    </Card>
  );
};

export default StepName;
