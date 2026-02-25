import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";

type StepAvatarProps = {
  onNext: () => void;
};

const StepAvatar = ({ onNext }: StepAvatarProps) => {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
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
    onNext();
  };
  return (
    <Card className="relative pb-32">
      <div className="w-87.5 mx-auto">
        <div className="flex justify-center items-center gap-4 mb-5 md:mb-7">
          <img className="size-7.5" src={"/monkey.png"} alt={"Avatar"} />
          <h2 className="text-white  text-lg  md:text-[22px] font-bold">
            {" "}
            Okay, Ab Siddik
          </h2>
        </div>
        <div className="mx-auto text-center ">
          <img
            className="size-25 border-5 border-blue rounded-full object-cover mx-auto mb-4"
            src={"/avatar.png"}
            alt={"Ab Siddik"}
          />

          <input
            type="file"
            //value={name}
            id="avatar"
            name="avatar"
            onChange={(e) => {
              const value = e.target.value;
              setName(value);
              //if (error) {
              setError(validateName(value));
              //}
            }}
            //placeholder="Upload your avatar"
            className={`bg-secondary text-white rounded-lg px-4 py-2 h-[40px] w-[90%] mx-auto hidden focus:outline-0  ${error ? "border border-red-500" : ""}`}
          />

          {/*{error && <p className="text-red-500 text-sm mt-2">{error}</p>}*/}
          <label
            htmlFor="avatar"
            className="cursor-pointer text-blue  mt-6 px-4 text-center w-[200px] mx-auto"
          >
            Upload your avatar
          </label>
        </div>

        <Button
          className="mt-10 w-32.5 mx-auto"
          label="Next"
          onClick={handleNext}
        />
      </div>
    </Card>
  );
};

export default StepAvatar;
