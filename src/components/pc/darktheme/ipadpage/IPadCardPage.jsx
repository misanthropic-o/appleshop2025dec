import "./iPadCardPage.css";
import UIKitBtn from "../../../UIKitBtn";
import MemorySelection from "../../../MemorySelection";
import { useTheme } from "../../../../contexts/ThemeContext";

function IPadCardPage() {
  const { isDark } = useTheme();

  return (
    <>
      <div className="ipad-card-page-dark">
        <div className="ipad-card-left-dark">
          <div className="ipad-card-left-text-dark">
            <p className="ipad-card-titlee-dark">iPad</p>
            <p className="ipad-card-textt-dark">
              Самый производительный
              <br />
              планшет в мире.
            </p>
          </div>
          <div className="damn">
            <p className="iphone-price">150 000₽</p>
            <div className="iphone-page-card-buttons">
              <MemorySelection
                MemorySelectionContent1="256 ГБ"
                MemorySelectionContent2="512 ГБ"
                MemorySelectionContent3="1 ТБ"
              />
              <UIKitBtn
                UIKitBtnWidth="200px"
                UIKitBtnHeight="68px"
                UIKitBtnFontSize="2rem"
                UIKitBtnContent="Купить"
              />
            </div>
          </div>
        </div>
        <div className="ipad-card-right">
          <img alt="Экземпляр iPad" src="src\assets\pc\ipad.png"></img>
        </div>
      </div>
    </>
  );
}

export default IPadCardPage;
