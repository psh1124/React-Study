import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

function Button({ children, disabled = false, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="button"
    >
        {children}
    </button>
  );
}

export default Button