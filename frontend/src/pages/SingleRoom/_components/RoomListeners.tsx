import ListenerCard from "./ListenerCard";
import type { User } from "./RoomBoard";

const RoomListeners = ({ listeners }: { listeners: User[] }) => {
  return (
    <div>
      <p className="text-xs font-semibold text-slate-500 tracking-widest uppercase mb-6">
        Others in the room
      </p>
      <div
        className="grid gap-5"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(72px, 1fr))",
        }}
      >
        {listeners.map((u) => (
          <ListenerCard key={u.id} user={u} />
        ))}
      </div>
    </div>
  );
};

export default RoomListeners;
