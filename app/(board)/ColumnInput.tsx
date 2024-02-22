import Remove from "@/components/svgs/Remove";
import { LegacyRef, Ref, Reference, useEffect, useRef, useState } from "react";

interface ColumnInputProps {
  value: string;
  onChange: (newValue: string) => void;
}

export default function ColumnInput({ value, onChange }: ColumnInputProps) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [touched, setTouched] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (!touched) {
      setTouched(true);
    }
    setIsEmpty(e.target.validity.valueMissing);
  };

  const handleBlur = (e: any) => {
    setIsEmpty(e.target.validity.valueMissing);
    if (!touched) {
      setTouched(true);
    }
  };

  useEffect(() => {
    isEmpty
      ? (inputRef.current!.style.border = "1px solid #EA5555")
      : (inputRef.current!.style.border = "1px solid #828FA340");
  }, [touched, inputRef.current?.value]);
  return (
    <div className="relative">
      <input
        type="text"
        className="input w-[320px]"
        onChange={handleChange}
        onBlur={handleBlur}
        defaultValue={value}
        placeholder="e.g. Todo"
        required
        ref={inputRef}
      />
      {touched && isEmpty && (
        <span className="text-red text-xs absolute right-5 top-1/2 -translate-y-1/2 tracking-wider">
          Can't be empty
        </span>
      )}
    </div>
  );
}
