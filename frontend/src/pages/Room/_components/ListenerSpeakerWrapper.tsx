import type { User } from "./RoomBoard";
import RoomListeners from "./RoomListeners";
import RoomSpeakers from "./RoomSpeakers";

type ListenerSpeakerWrapperProps = {
  speakers: User[];
  listeners: User[];
  provideAudioRef: (id: string, node: HTMLAudioElement | null) => void;
};

const ListenerSpeakerWrapper = ({
  speakers,
  listeners,
  provideAudioRef,
}: ListenerSpeakerWrapperProps) => {
  return (
    <>
      {/* Speakers section */}
      <RoomSpeakers provideAudioRef={provideAudioRef} speakers={speakers} />

      {/* Divider */}
      <div className="h-px bg-input mb-8" />

      {/* Listeners section */}
      <RoomListeners listeners={listeners} />
    </>
  );
};

export default ListenerSpeakerWrapper;
