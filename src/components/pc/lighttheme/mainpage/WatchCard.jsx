import "./WatchCard.css";
import UIKitBtn from "../../../UIKitBtn";

function WatchCard() {
  return (
    <>
      <div className="watch-card">
        <div className="watch-card-content">
          <div className="watch-card-txt-content">
            <p className="watch-card-title">Watch</p>
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
