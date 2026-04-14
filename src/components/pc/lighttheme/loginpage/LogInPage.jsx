import { useState } from "react";
import "./LogInPage.css";
import Inpput from "../../../Inpput.jsx";
import { useAuth } from "../../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LogInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
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

    const result = await login(username.trim(), password);
    
    if (result.success) {
      window.alert("Вход выполнен успешно!");
      navigate("/");
    } else {
      window.alert("Ошибка входа: " + (result.error || "Неизвестная ошибка"));
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="inpoots">
          <p className="inpoots-title">Войти</p>
          <div className="inpoootis">
            <div className="fkk">
              <Inpput
                LabelInfo="Имя пользовтеля"
                IPlchld="Вводить тут..."
                IWidth="526px"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="fkk">
              <Inpput
                LabelInfo="Пароль"
                IPlchld="Вводить тут..."
                IWidth="526px"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
              />
            </div>
          </div>
          <div className="buttonsssss">
            <button className="sendform-login" onClick={handleSubmit}>Войти</button>
            <a className="no-account" href="/signup">
              У меня
              <br />
              нет аккаунта
            </a>
          </div>
        </div>
        <img alt="Фото iPhone в руках" src="public\meowie.png"></img>
      </div>
    </>
  );
}
