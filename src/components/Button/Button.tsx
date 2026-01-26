import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "danger";
}

function Button({
  children,
  disabled = false,
  onClick,
  type = "button",
  variant = "primary",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`button ${variant}`}>
      {children}
    </button>
  );
}

export default Button;
