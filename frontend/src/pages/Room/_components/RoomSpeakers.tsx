import type { User } from "./RoomBoard";
import SpeakerCard from "./SpeakerCard";

type RoomSpeakersProps = {
  speakers: User[];
  provideAudioRef: (id: string, node: HTMLAudioElement | null) => void;
};

const RoomSpeakers = ({ speakers, provideAudioRef }: RoomSpeakersProps) => {
  return (
    <div className="mb-10">
      <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-6">
        Speakers
      </p>
      <div className="flex flex-wrap gap-8">
        {speakers.map((u) => (
          <SpeakerCard key={u.id} user={u} provideAudioRef={provideAudioRef} />
        ))}
      </div>
    </div>
  );
};

export default RoomSpeakers;
