import "./InputField.css";

interface InputFieldProps {
  id?: string;
  name?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  value: string;
  autoComplete?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

function InputField({
  id,
  name,
  className,
  type = "text",
  placeholder,
  value,
  autoComplete,
  disabled,
  onChange,
  onBlur,
}: InputFieldProps) {
  return (
    <input
      id={id}
      name={name}
      className={`input-field ${className}`}
      type={type}
      placeholder={placeholder}
      value={value}
      autoComplete={autoComplete}
      disabled={disabled}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default InputField;
