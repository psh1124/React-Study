import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import InputField from "../InputField/InputField";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { usePasswordToggle } from "../../hooks/usePasswordToggle";

interface PasswordFieldProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string | null;
  autoComplete?: string;
  disabled: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

function PasswordField({
  id,
  label,
  placeholder,
  value,
  error,
  autoComplete = "current-password",
  disabled,
  onChange,
  onBlur,
}: PasswordFieldProps) {
  const { isVisible, toggle, type } = usePasswordToggle();

  return (
    <div className="auth-form__field">
      <label htmlFor={id}>{label}</label>
      <div className="password-wrapper">
        <InputField
          id={id}
          name={id}
          className="password-input"
          type={type}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
        />
        <button
          type="button"
          className="password-toggle"
          onClick={toggle}
          disabled={disabled}
          aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보기"}>
          {isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
        </button>
      </div>
      <div className="message-container">
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
}

export default PasswordField;
