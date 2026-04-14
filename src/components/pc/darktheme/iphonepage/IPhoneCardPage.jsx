import MemorySelection from "../../../MemorySelection";
import "./IPhoneCardPage.css";
import UIKitBtn from "../../../UIKitBtn";
import { useTheme } from "../../../../contexts/ThemeContext";

function IPhoneCardPage() {
  const { isDark } = useTheme();

  return (
    <>
      <div className="iphone-page-card-dark">
        <div className="iphone-page-card-left-dark">
          <p>iPhone</p>
          <img
            alt="Несколько iPhone 17 Pro Max"
            src="src\assets\pc\iphones.png"
          ></img>
        </div>
        <div className="iphone-page-card-right-dark">
          <div className="iphone-page-text-info-dark">
            <p className="iphone-page-card-right-title-dark">iPhone 17 Pro Max</p>
            <p className="iphone-page-card-right-text-dark">
              iPhone 17 Pro и iPhone 17 Pro Max созданы
              <br />
              заново внутри и снаружи. Это самые
              <br />
              технологичные модели iPhone из всех, что
              <br />
              когда-либо выпускала Apple.
              <br />В основе нового дизайна лежит цельный
              <br />
              корпус из термокованного алюминия.
              <br />
              Он обеспечивает высокую прочность,
              <br />
              увеличивает ёмкость аккумулятора и помогает
              <br />
              раскрыть потенциал производительности.
            </p>
          </div>

          <div className="iphone-page-card-right-info-dark">
            <p className="iphone-price-dark">150 000₽</p>
            <div className="iphone-page-card-buttons-dark">
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
      </div>
    </>
  );
}

export default IPhoneCardPage;
