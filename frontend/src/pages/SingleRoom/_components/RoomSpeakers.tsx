import type { User } from "./RoomBoard";
import SpeakerCard from "./SpeakerCard";

const RoomSpeakers = ({ speakers }: { speakers: User[] }) => {
  return (
    <div className="mb-10">
      <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-6">
        Speakers
      </p>
      <div className="flex flex-wrap gap-8">
        {speakers.map((u) => (
          <SpeakerCard key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
};

export default RoomSpeakers;
