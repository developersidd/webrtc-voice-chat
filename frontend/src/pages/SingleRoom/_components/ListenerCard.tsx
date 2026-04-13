import type { User } from "./RoomBoard";

const ListenerCard = ({ user }: { user: User }) => (
  <div className="flex flex-col items-center gap-1.5 group cursor-pointer">
    <div className="relative">
      <img
        src={user.avatar}
        alt={user.name}
        className="size-12 md:size-16  rounded-full object-cover ring-1 ring-slate-700 group-hover:ring-slate-500 transition-all duration-200"
      />
    </div>
    <span className="text-xs md:text-sm text-slate-400 group-hover:text-slate-300 transition-colors truncate max-w-[56px] text-center">
      {user.name}
    </span>
  </div>
);

export default ListenerCard;
