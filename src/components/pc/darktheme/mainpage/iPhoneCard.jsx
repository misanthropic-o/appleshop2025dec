import UIKitBtn from "../../../UIKitBtn";
import "./iPhoneCard.css";
import { useTheme } from "../../../../contexts/ThemeContext";

function IPhoneCard() {
  const { isDark } = useTheme();

  return (
    <>
      <div className="iphone-card-dark">
        <div className="iphone-shit-dark">
          <p>iPhone</p>
          <div className="iphone-images-dark">
            <div className="orange-iphone-container">
              <img
                className="iphone-orange-dark"
                src="src\assets\pc\iphoneorange.png"
                alt="Оранжевый iPhone"
              />
            </div>
            <div className="white-iphone-container">
              <img
                className="iphone-white-dark"
                src="src\assets\pc\iphonewhite.png"
                alt="Белый iPhone"
              />
            </div>

            <div className="blue-iphone-container">
              <img
                className="iphone-blue-dark"
                src="src\assets\pc\iphoneblack.png"
                alt="Синий iPhone"
              />
            </div>
          </div>
        </div>
        <div className="iphone-card-other-content-dark">
          <p>
            Новое поколение <br />
            iPhone
          </p>
          <UIKitBtn
            UIKitBtnWidth="261px"
            UIKitBtnHeight="86px"
            UIKitBtnFontSize="2.5rem"
            UIKitBtnContent="Купить"
          />
        </div>
      </div>
    </>
  );
}

export default IPhoneCard;
