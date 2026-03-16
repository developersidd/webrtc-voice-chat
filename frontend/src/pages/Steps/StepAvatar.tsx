import { Pencil } from "lucide-react";
import { useState } from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import activateSelector from "../../redux/features/activate/activateSelector";
import { setAvatar } from "../../redux/features/activate/activateSlice";

type StepAvatarProps = {
  onNext: () => void;
};

const StepAvatar = ({ onNext }: StepAvatarProps) => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const activateSlice = useAppSelector(activateSelector);
  const dispatch = useAppDispatch();
  const [imageToUpload, setImageToUpload] = useState("/avatar.png");
  console.log("🚀 ~ imageToUpload:", imageToUpload);
  const handleNext = () => {
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
            Okay, <span className="capitalize">{activateSlice.fullName}</span>
          </h2>
        </div>
        <div className="mx-auto text-center relative">
          <img
            className="size-27 border-5 border-blue rounded-full object-cover mx-auto"
            src={imageToUpload}
            alt={"Ab Siddik"}
          />
          {avatarFile && (
            <h5 className="text-sm text-blue-50 mt-1.5">{avatarFile.name}</h5>
          )}
          <input
            type="file"
            //value={name}
            accept=".png,.jpg,.jpeg"
            id="avatarFile"
            name="avatarFile"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                const image = URL.createObjectURL(file);
                setImageToUpload(image);
                setAvatarFile(file);
                dispatch(setAvatar(image));
              }
            }}
            className={`hidden`}
          />

          <label
            title="Upload avatarFile"
            htmlFor="avatarFile"
            className="cursor-pointer text-white absolute top-1 right-[125px] "
          >
            <Pencil className="inline size-4.5" />
          </label>
        </div>

        <Button
          disabled={!avatarFile}
          className="mt-10 w-32.5 mx-auto disabled:opacity-80 disabled:cursor-not-allowed"
          label="Next"
          onClick={handleNext}
        />
      </div>
    </Card>
  );
};

export default StepAvatar;
