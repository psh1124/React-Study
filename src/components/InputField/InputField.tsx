import "./InputField.css";

interface InputFieldProps {
  id?: string;
  name?: string;
  className: string;
  type?: string;
  placeholder?: string;
  value: string;
  autocomplete?: string;
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
  autocomplete,
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
      autoComplete={autocomplete}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default InputField;
