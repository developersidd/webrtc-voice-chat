import SoundWave from "../../../components/ui/SoundWave";

const SpeakerCard = ({ user }: { user: User }) => (
  <div className="flex flex-col items-center gap-2 group cursor-pointer">
    <div className="relative">
      {user.isSpeaking && (
        <span className="absolute inset-0 rounded-full border-2 border-success/40 animate-ping" />
      )}
      <div
        className={[
          "p-[3px] rounded-full transition-all duration-300",
          user.isSpeaking
            ? "bg-gradient-to-br from-success to-green-500 shadow-[0_0_18px_4px_rgba(52,211,153,0.35)]"
            : "bg-gradient-to-br from-input to-slate-700",
        ].join(" ")}
      >
        <img
          src={user.avatar}
          alt={user.name}
          className="w-20 h-20 rounded-full object-cover block"
        />
      </div>

      {/* Muted badge */}
      {user.isMuted && (
        <span className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary shadow-lg shadow-primary flex items-center justify-center text-xs">
          <img src="/assets/icons/muted.svg" alt="Muted" className="w-4" />
        </span>
      )}
    </div>

    {/* Sound wave or spacer */}
    <div className="h-4 flex items-center">
      {user.isSpeaking ? <SoundWave /> : <span />}
    </div>

    <span className="text-sm font-medium text-slate-200 tracking-wide">
      {user.name}
    </span>
  </div>
);
export default SpeakerCard;
