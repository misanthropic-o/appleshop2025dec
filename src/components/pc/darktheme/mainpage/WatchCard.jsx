import "./WatchCard.css";
import UIKitBtn from "../../../UIKitBtn";
import { useTheme } from "../../../../contexts/ThemeContext";

function WatchCard() {
  const { isDark } = useTheme();

  return (
    <>
      <div className="watch-card-dark">
        <div className="watch-card-content-dark">
          <div className="watch-card-txt-content-dark">
            <p className="watch-card-title-dark">Watch</p>
            <p>
              Лучшие смарт-
              <br />
              часы на рынке
            </p>
          </div>
          <UIKitBtn
            UIKitBtnWidth="312px"
            UIKitBtnHeight="83px"
            UIKitBtnFontSize="2.625rem"
            UIKitBtnContent="Купить"
            to="/watch"
          />
        </div>
        <img alt="Apple Watch" src="src\assets\pc\watchmainpage.png"></img>
      </div>
    </>
  );
}

export default WatchCard;
