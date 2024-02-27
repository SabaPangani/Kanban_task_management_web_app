import { LegacyRef, Ref, Reference, useEffect, useRef, useState } from "react";

interface ColumnInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (newValue: string) => void;
}

export default function Input({
  type,
  placeholder,
  onChange,
  value,
}: ColumnInputProps) {
  const [isEmpty, setIsEmpty] = useState(false);
  const [touched, setTouched] = useState(false);

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
      {type == "textarea" ? (
        <>
          <textarea
            className="input h-[135px] pt-2 resize-none"
            onChange={handleChange}
            onBlur={handleBlur}
            defaultValue={value}
            placeholder={placeholder}
            required
            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          />
          {touched && isEmpty && type === "textarea" && (
            <span className="text-red text-xs absolute right-5 top-1/2 -translate-y-1/2 tracking-wider">
              Can't be empty
            </span>
          )}
        </>
      ) : (
        <input
          type={type}
          className="input"
          onChange={handleChange}
          onBlur={handleBlur}
          defaultValue={value}
          placeholder={placeholder}
          required
          ref={inputRef as React.RefObject<HTMLInputElement>}
        />
      )}
      {touched && isEmpty && (
        <span className="text-red text-xs absolute right-5 top-1/2 -translate-y-1/2 tracking-wider">
          Can't be empty
        </span>
      )}
    </div>
  );
}
