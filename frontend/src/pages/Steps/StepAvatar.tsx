type StepAvatarProps = {
  onNext: () => void;
};

const StepAvatar = ({ onNext }: StepAvatarProps) => {
  return (
    <div className="step-avatar">
      <h2>Step Avatar</h2>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default StepAvatar;
