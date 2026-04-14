import "./LogInPage.css";
import Inpput from "C:/Users/webgrotesk/Documents/store/src/components/Inpput.jsx";
import { useTheme } from "../../../../contexts/ThemeContext";

export default function LogInPage() {
  const { isDark } = useTheme();

  return (
    <>
      <div className="login-page-dark">
        <div className="inpoots-dark">
          <p className="inpoots-title-dark">Войти</p>
          <div className="inpoootis-dark">
            <div className="fkk">
              <Inpput
                LabelInfo="Имя пользовтеля"
                IPlchld="Вводить тут..."
                IWidth="526px"
              />
            </div>
            <div className="fkk">
              <Inpput
                LabelInfo="Пароль"
                IPlchld="Вводить тут..."
                IWidth="526px"
              />
            </div>
          </div>
          <div className="buttonsssss-dark">
            <button className="sendform-login-dark">Войти</button>
            <a className="no-account-dark" href="/signup">
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
