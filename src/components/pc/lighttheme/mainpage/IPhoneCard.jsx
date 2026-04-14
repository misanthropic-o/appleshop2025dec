import UIKitBtn from "../../../UIKitBtn";
import "./iPhoneCard.css";

function IPhoneCard() {
  return (
    <>
      <div className="iphone-card">
        <div className="iphone-shit">
          <p>iPhone</p>
          <div className="iphone-images">
            <div className="orange-iphone-container">
              <img
                className="iphone-orange"
                src="src\assets\pc\iphoneorange.png"
                alt="Оранжевый iPhone"
              />
            </div>
            <div className="white-iphone-container">
              <img
                className="iphone-white"
                src="src\assets\pc\iphonewhite.png"
                alt="Белый iPhone"
              />
            </div>

            <div className="blue-iphone-container">
              <img
                className="iphone-blue"
                src="src\assets\pc\iphoneblack.png"
                alt="Синий iPhone"
              />
            </div>
          </div>
        </div>
        <div className="iphone-card-other-content">
          <p>
            Новое поколение <br />
            iPhone
          </p>
          <UIKitBtn
            UIKitBtnWidth="261px"
            UIKitBtnHeight="86px"
            UIKitBtnFontSize="2.5rem"
            UIKitBtnContent="Купить"
            to="/iphone"
          />
        </div>
      </div>
    </>
  );
}

export default IPhoneCard;
