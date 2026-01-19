import "./InputField.css";

interface InputFieldProps {
  id: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

function InputField({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  onBlur,
}: InputFieldProps) {
  return (
    <input
      id={id}
      className="input-field"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
}

export default InputField;
