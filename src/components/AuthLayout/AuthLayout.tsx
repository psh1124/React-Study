import "./AuthLayout.css";

interface AuthLayoutProps {
  children: React.ReactNode;
  align?: "center" | "top";
  className?: string;
  variant?: "login" | "signup" | "default";
}

function AuthLayout({
  children,
  align = "center",
  className = "",
  variant = "default",
}: AuthLayoutProps) {
  return (
    <div
      className={`
        auth-layout
        auth-layout--${align}
        ${variant !== "default" ? `auth-layout--${variant}` : ""}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default AuthLayout;
