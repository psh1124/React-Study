import InputField from "../InputField/InputField";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface AuthFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  className?: string;
  value: string;
  error?: string | null;
  autoComplete?: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

function AuthField({
  id,
  label,
  placeholder = "",
  error = null,
  ...props
}: AuthFieldProps) {
  return (
    <div className="auth-form__field">
      <label htmlFor={id}>{label}</label>
      <InputField id={id} name={id} placeholder={placeholder} {...props} />
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default AuthField;
