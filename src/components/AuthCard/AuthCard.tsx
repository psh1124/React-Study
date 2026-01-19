import './AuthCard.css'

function AuthCard({ children }: { children: React.ReactNode }) {
  return <div className="auth-card">{children}</div>;
}

export default AuthCard;