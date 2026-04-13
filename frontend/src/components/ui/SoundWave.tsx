const SoundWave = () => (
  <div className="flex items-end justify-center gap-[2px] h-4">
    {[0, 1, 2, 3, 4].map((i) => (
      <span
        key={i}
        className="w-[3px] rounded-full bg-emerald-400"
        style={{
          animation: `soundbar 0.9s ease-in-out ${i * 0.12}s infinite alternate`,
          height: `${[6, 12, 9, 14, 7][i]}px`,
        }}
      />
    ))}
  </div>
);
export default SoundWave;
