import "./InputField.css";

interface InputFieldProps {
  id?: string;
  name?: string;
  className?: string;
  type?: string;
  placeholder?: string;
  value: string;
  autoComplete?: string;
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
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default InputField;
