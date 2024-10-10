import clsx from "clsx";
import { ReactNode } from "react";

type ButtonSize = "L" | "S";
type ButtonVariant = "primary" | "secondary" | "destructive";

const Button = ({
  children,
  size,
  variant,
  ...props
}: {
  children: ReactNode;
  size: ButtonSize;
  variant: ButtonVariant;
}) => {
  const baseStyles =
    "rounded-full font-bold transition-all max-w-[255px] w-full";

  const sizeStyles: Record<ButtonSize, string> = {
    L: "py-3 px-6 text-sm",
    S: "py-2 px-5 text-xs",
  };

  const variantStyles: Record<ButtonVariant, string> = {
    primary: "bg-primary text-white hover:bg-primary-light",
    secondary:
      "bg-neutral-lightestGray text-primary hover:bg-neutral-lightGray",
    destructive: "bg-accent-red text-white hover:bg-accent-lightRed",
  };

  return (
    <button
      className={clsx(baseStyles, sizeStyles[size], variantStyles[variant])}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
