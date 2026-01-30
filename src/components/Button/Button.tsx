import "./Button.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "danger" | "secondary";
  loading?: boolean;
}

function Button({
  children,
  disabled = false,
  loading = false,
  type = "button",
  variant = "primary",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`button ${variant} ${loading ? "loading" : ""} ${className}`}
      {...props}>
      {loading ? <div className="spinner" /> : children}
    </button>
  );
}

export default Button;
