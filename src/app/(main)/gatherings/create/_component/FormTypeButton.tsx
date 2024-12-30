import clsx from "clsx";

interface FormTypeButtonProps {
  activeValue: string | boolean;
  value: string;
  buttonText: string;
  onChange: (value: string | boolean) => void;
}

export default function FormTypeButton({ activeValue, value, buttonText, onChange }: FormTypeButtonProps) {
  return (
    <button
      type="button"
      className={clsx(
        "rounded-xl bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700 transition-all sm:text-base",
        value === activeValue && "bg-gray-250 text-main",
      )}
      onClick={() => onChange(activeValue)}
    >
      {buttonText}
    </button>
  );
}
