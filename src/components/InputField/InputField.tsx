import { forwardRef } from "react";
import "./InputField.css";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`input-field ${error ? "input-field--error" : ""} ${className || ""}`}
        {...props}
      />
    );
  },
);

InputField.displayName = "InputField";

export default InputField;
