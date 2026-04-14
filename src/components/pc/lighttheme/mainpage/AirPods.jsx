import "./AirPods.css";
import UIKitBtn from "../../../UIKitBtn";

function AirPods() {
  return (
    <div className="air-pods">
      <div className="air-pods-txt-content">
        <p className="air-pods-title">AirPods</p>
        <p className="air-pods-desc">
          Лучшие беспроводные
          <br />
          наушники
        </p>
      </div>
      <UIKitBtn
        UIKitBtnWidth="112px"
        UIKitBtnHeight="49px"
        UIKitBtnFontSize="1.2rem"
        UIKitBtnContent="Купить"
        to="/airpods"
      />
      <img alt="Наушники AirPods" src="src\assets\pc\airpodsmainpage.png"></img>
    </div>
  );
}

export default AirPods;
