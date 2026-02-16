import React from 'react'

type StepNameProps = {
    onNext: () => void;
}

const StepName = ({ onNext }: StepNameProps) => {
  return (
    <div className="step-name">
      <h2>Step Name</h2>
      <button onClick={onNext}>Next</button>
    </div>
  )
}

export default StepName