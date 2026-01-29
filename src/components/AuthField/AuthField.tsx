import InputField from "../InputField/InputField";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

interface AuthFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  error?: string | null;
  autoComplete?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  className?: string;
}

function AuthField({
  id,
  label,
  placeholder = "", // undefined일 경우 빈 문자열로 대체
  error = null,
  ...props
}: AuthFieldProps) {
  return (
    <div className="auth-form__field">
      <label htmlFor={id}>{label}</label>
      <InputField
        id={id}
        name={id}
        placeholder={placeholder} // 이제 무조건 string이 됨
        {...props}
      />
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

export default AuthField;
