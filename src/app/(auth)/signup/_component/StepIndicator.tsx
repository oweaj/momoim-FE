interface StepIndicatorProps {
  steps: number;
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex justify-center gap-2 py-5">
      {Array.from({ length: steps }, (_, i) => (
        <div key={i} className={`h-2 w-2 rounded-full ${i + 1 === currentStep ? "bg-main" : "bg-gray-300"}`} />
      ))}
    </div>
  );
}
