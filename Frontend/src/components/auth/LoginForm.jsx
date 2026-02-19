import { useState } from "react";
import api from "../../api/client";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Message from "../ui/Message";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // валидируем email простым regex
  const isEmailValid = email => /\S+@\S+\.\S+/.test(email);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("❗ Все поля обязательны");
      return;
    }
    if (!isEmailValid(email)) {
      setMessage("❗ Неверный формат email");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.access_token);
      setMessage("✅ Вход выполнен");
    } catch (e) {
      setMessage("❌ Ошибка входа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        onClick={handleLogin}
        disabled={!email || !password || loading}
      >
        {loading ? "Загрузка..." : "Войти"}
      </Button>
      <Message text={message} className={message.includes("✅") ? "success" : ""} />
    </>
  );
}
