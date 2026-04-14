import "./IPadCard.css";
import UIKitBtn from "../../../UIKitBtn";
import { useTheme } from "../../../../contexts/ThemeContext";

function IPadCard() {
  const { isDark } = useTheme();

  return (
    <>
      <div className="ipad-card-dark">
        <img
          alt="Несколько планшетов iPad"
          src="src\assets\pc\ipadmainpage.png"
          className="bih-im-cooler-than-a-cooler-shout-out-to-my-jeweller-hit-a-lick-been-rich-ever-since-im-a-rich-ninja-hallelujah"
        ></img>
        <div className="ipad-card-content-dark">
          <div>
            <p className="ipad-card-title-dark">iPad</p>
            <p className="ipad-card-text-dark">
              Самый производительный
              <br />
              планшет в мире.
            </p>
          </div>
          <UIKitBtn
            UIKitBtnWidth="312px"
            UIKitBtnHeight="83px"
            UIKitBtnFontSize="2.5rem"
            UIKitBtnContent="Купить"
            to="/ipad"
          />
        </div>
      </div>
    </>
  );
}

export default IPadCard;
