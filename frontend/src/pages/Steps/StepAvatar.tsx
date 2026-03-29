import { useState } from "react";
import { toast } from "sonner";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { useActivateMutation } from "../../redux/features/activate/activateApi";
import activateSelector from "../../redux/features/activate/activateSelector";
import { setAvatar } from "../../redux/features/activate/activateSlice";
import { useNavigate } from "react-router-dom";
import { setAuth } from "../../redux/features/auth/authSlice";
//
//type StepAvatarProps = {
//  onNext: () => void;
//};

const StepAvatar = () => {
  const [activate, { isLoading }] = useActivateMutation();
  const activateSlice = useAppSelector(activateSelector);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [image, setImage] = useState("/avatar.png");
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        dispatch(setAvatar(reader.result as string));
      };
      // Start reading the file as a data URL
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    try {
      if (!image) return;
      const result = await activate({
        avatar: image,
        name: activateSlice.fullName,
      }).unwrap();
      if (result?.statusCode === 200) {
        toast.success("Your account has been activated successfully!");
        dispatch(setAuth(result?.data));
        return navigate("/room");
      }
      console.log("🚀 ~ result:", result);
    } catch (error) {
      toast.error(
        "An error occurred while activating your account. Please try again.",
      );
      console.error("Error occurred while activating:", error);
    }
    //onNext();
  };
  return (
    <Card className="relative pb-32">
      <div className="w-87.5 mx-auto">
        <div className="flex justify-center items-center gap-4 mb-5 md:mb-7">
          <img className="size-7.5" src={"/monkey.png"} alt={"Avatar"} />
          <h2 className="text-white  text-lg  md:text-[22px] font-bold">
            {" "}
            Okay, <span className="capitalize">{activateSlice.fullName}</span>
          </h2>
        </div>
        <div className="mx-auto text-center relative">
          <img
            className="size-27 border-5 border-blue rounded-full object-cover mx-auto mb-5"
            src={image}
            alt={"Ab Siddik"}
          />
          <input
            type="file"
            accept=".png,.jpg,.jpeg"
            id="avatar"
            name="avatar"
            onChange={handleFileChange}
            className={`hidden`}
          />

          <label
            title="Upload avatar"
            htmlFor="avatar"
            className="cursor-pointer text-blue"
          >
            Choose a different avatar
          </label>
        </div>

        <Button
          //isLoading={isLoading}
          disabled={!image || isLoading}
          className="mt-9 w-32.5 mx-auto"
          label="Next"
          onClick={handleNext}
        />
      </div>
    </Card>
  );
};

export default StepAvatar;
