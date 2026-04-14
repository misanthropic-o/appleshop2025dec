import { useState } from "react";
import "./SignUpPage.css";
import Inpput from "../../../Inpput.jsx";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!username.trim()) {
      window.alert("Пожалуйста, введите имя пользователя");
      return;
    }

    if (!password) {
      window.alert("Пожалуйста, введите пароль");
      return;
    }

    if (password !== confirmPassword) {
      window.alert("Пароли не совпадают");
      return;
    }

    const telegramUsername = window.prompt("Введите ваш Telegram аккаунт (@username) или нажмите Отмена, чтобы пропустить:");

    const result = await signup(username.trim(), password, telegramUsername ? telegramUsername.trim() : null);
    
    if (result.success) {
      window.alert("Аккаунт успешно создан!");
      navigate("/");
    } else {
      window.alert("Ошибка регистрации: " + (result.error || "Неизвестная ошибка"));
    }
  };

  return (
    <>
      <div className="signup-page-dark">
        <div className="inpoots-dark">
          <p className="inpoots-title-dark">Регистрация</p>
          <div className="inpoootis-dark">
            <Inpput
              LabelInfo="Имя пользовтеля"
              IPlchld="Вводить тут..."
              IWidth="526px"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Inpput
              LabelInfo="Пароль"
              IPlchld="Вводить тут..."
              IWidth="526px"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
            />
            <Inpput
              LabelInfo="Потвердите пароль"
              IPlchld="Вводить тут..."
              IWidth="526px"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
            />
          </div>
          <div className="buttonsssss-dark">
            <button className="sendform-signup-dark" onClick={handleSubmit}>
              Создать
              <br />
              аккаунт
            </button>
            <a className="yes-account-dark" href="/login">
              У меня
              <br />
              есть аккаунт
            </a>
          </div>
        </div>
        <img alt="Фото iPhone в руках" src="public\meowie.png" />
      </div>
    </>
  );
}
