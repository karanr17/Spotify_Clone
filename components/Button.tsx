import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, disabled, children, type = "button", ...props }, ref) => {
    return (
      <button
        type={type}
        className={twMerge(
          `
            w-full
            rounded-full
           bg-green-500
            border
            border-transparent
            px-3
            py-3
            font-bold
            text-black
            disabled:cursor-not-allowed
            disabled:opacity-65
            hover:opacity-85
            transition
          `,
          className
        )}
        ref={ref}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
