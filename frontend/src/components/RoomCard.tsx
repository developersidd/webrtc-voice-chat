import { cn } from "@sglara/cn";
import { User } from "lucide-react";

type Room = {
  id: number;
  topic: string;
  speakers: {
    id: number;
    name: string;
    avatar: string;
  }[];
  totalPeople: number;
};

const RoomCard = ({ room }: { room: Room }) => {
  return (
    <div className="bg-secondary rounded-3xl p-5 text-white relative">
      <h3 className="text-lg leading-6 mb-5">{room.topic}</h3>
      <div className="flex items-start gap-5 pb-2 relative">
        <div className="pr-10">
          {room.speakers.map((speaker, ind) => {
            return (
              <img
                key={speaker.id}
                className={cn(
                  `size-10 rounded-full border-[3px] bg-orange-600 absolute`,
                  ind === 1 ? "top-5 left-5 border-blue" : "",
                  ind === 2 ? "top-0 left-10 border-green-500" : "",
                )}
                src={
                  "https://ab-siddik.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fab-siddik.0cuzjx_s-n575.jpeg&w=1920&q=75"
                }
                alt={speaker.name}
              />
            );
          })}
        </div>
        <div className="ml-10 space-y-1">
          {room.speakers.map((speaker) => (
            <div key={speaker.id} className="flex items-baseline gap-1.5">
              <h4 className="text-[15px]">{speaker.name}</h4>
              <img
                className="size-4"
                src="/assets/icons/message-icon.png"
                alt="Verified"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-5 text-sm text-grey justify-end absolute right-4 bottom-2">
        <span className="font-bold text-[17px]">{room.totalPeople}</span>{" "}
        <User className="size-4.5 fill-grey" />
      </div>
    </div>
  );
};

export default RoomCard;
