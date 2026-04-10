import { X } from "lucide-react";
import React, { useEffect } from "react";
import { RemoveScrollBar } from "react-remove-scroll-bar";
import Button from "./ui/Button";

const topics = [
  {
    name: "open",
    icon: "/assets/icons/world-icon.svg",
    description: "Create a room, open to everyone",
  },
  {
    name: "social",
    icon: "/assets/icons/social-icon.svg",
    description: "Create a room, for people you follow",
  },
  {
    name: "private",
    icon: "/assets/icons/lock-icon.svg",
    description: "Create a room, for people you choose",
  },
];

type CreateRoomModalProps = {
  open: boolean;
  onClose: () => void;
};

const CreateRoomModal = ({ open, onClose }: CreateRoomModalProps) => {
  const [topic, setTopic] = React.useState({
    name: topics[0].name,
    description: topics[0].description,
  });
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);
  return (
    open && (
      <div
        className={`${open ? "" : ""} z-50 inset-0 w-full h-full fixed flex items-center justify-center bg-black/70`}
      >
        <RemoveScrollBar />
        <div className=" absolute inset-x-0  text-white bg-secondary w-full max-w-md mx-auto rounded-2xl flex flex-col gap-6 h-auto">
          <div className="p-6 pb-0">
            <h2 className="text-lg font-semibold">
              Enter the topic to be discussed
            </h2>
            <input
              className="bg-input text-white px-3 py-1.5 rounded-lg w-full mt-2 outline-0"
              type="text"
              placeholder="Topic"
            />
            <button
              onClick={onClose}
              className="
          absolute right-3.5 p-1.5 top-3.5 bg-input  rounded-full cursor-pointer 
          "
            >
              <X className="size-5" />
            </button>
          </div>
          {/* Topic Categories */}
          {/*<div className="w-full h-px absolute inset-x-0 bottom-[120px] bg-input" />*/}
          <div className="border-b border-b-input px-6 pb-7.5 pt-0">
            <h3 className="text-[17px] font-semibold mb-4">Room Type</h3>
            <div className="flex items-center gap-3 justify-between">
              {topics.map((t) => (
                <button
                  key={t.name}
                  onClick={() =>
                    setTopic({ name: t.name, description: t.description })
                  }
                  className={`${topic?.name === t.name ? "bg-input" : ""} px-7 pb-4.5 pt-2  rounded-lg flex flex-col items-center gap-1.5 cursor-pointer`}
                >
                  <img
                    className="size-13 object-cover"
                    src={t.icon}
                    alt={t.name}
                  />
                  <h6 className="text-sm capitalize">{t.name}</h6>
                </button>
              ))}
            </div>
          </div>
          <div className="px-6 pb-7 flex flex-col items-center gap-4">
            <h5 className="text-center text-sm text-grey">
              {topic
                ? topic.description
                : "Select a topic to see the description"}
            </h5>
            <Button
              label="Let's Go"
              className="bg-success flex-row-reverse px-8 py-1.5 hover:bg-green-400"
              icon={
                <img
                  className="size-4 sm:size-[20px]"
                  src="/assets/icons/confetti-icon.svg"
                  alt="confetti"
                />
              }
            />
          </div>
        </div>
      </div>
    )
  );
};

export default CreateRoomModal;
