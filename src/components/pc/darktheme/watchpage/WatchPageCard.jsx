import "./WatchPageCard.css";
import UIKitBtn from "../../../UIKitBtn";
import MemorySelection from "../../../MemorySelection";
import { useTheme } from "../../../../contexts/ThemeContext";

function WatchCardPage() {
  const { isDark } = useTheme();

  return (
    <>
      <div className="watch-card-page-dark">
        <div className="watch-card-left-dark">
          <div className="watch-card-left-text-dark">
            <p className="watch-card-titlee-dark">Watch</p>
            <p className="watch-card-textt-dark">
              Лучший способ следить за
              <br />
              своим здоровьем.
            </p>
          </div>
          <div className="damn">
            <p className="iphone-price-dark">30 000₽</p>
            <div className="watch-page-card-buttons-dark">
              <UIKitBtn
                UIKitBtnWidth="200px"
                UIKitBtnHeight="68px"
                UIKitBtnFontSize="2rem"
                UIKitBtnContent="Купить"
              />
            </div>
          </div>
        </div>
        <div className="watch-card-right">
          <img alt="Экземпляр iPad" src="src\assets\pc\wtachbig.png"></img>
        </div>
      </div>
    </>
  );
}

export default WatchCardPage;
