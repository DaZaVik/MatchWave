import LoginForm from "../components/auth/LoginForm";
import "../styles/auth.css"

export default function LoginPage() {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title"> MacthWave</h1>
        <p className="auth-subtitle">Введите email и пароль</p>
        <LoginForm />
      </div>
    </div>
  );
}
