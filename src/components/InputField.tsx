import "./InputField.css";

interface InputFieldProps {
    type?: string
    placeholder?: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function InputField({ type = "text", placeholder, value, onChange}: InputFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input-field"
    />
  );
}

export default InputField;
