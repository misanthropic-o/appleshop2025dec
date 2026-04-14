import ImageSlider from "../../../ImageSlider";
import ItemDescription from "../../../ItemDescription";
import IPhoneCardPage from "./IPhoneCardPage";
import "./IPhonePage.css";
import { useTheme } from "../../../../contexts/ThemeContext";

function IPhonePage() {
  const { isDark } = useTheme();

  return (
    <>
      <section className="iphone-page-dark">
        <IPhoneCardPage />
        <div className="slider-iphone-page-dark">
          <p className="slider-title"></p>
          <ImageSlider
            title="Цвет"
            slides={[
              {
                title: "Cosmic Orange",
                image: "src/assets/pc/ornageiphonefull.png",
              },
              {
                title: "Deep Blue",
                image: "src/assets/pc/blackiphonefull.png",
              },
              {
                title: "Silver",
                image: "src/assets/pc/whiteiphonefull.png",
              },
            ]}
          />
        </div>
        <div className="item-description-placeholder-dark">
          <p className="description-title-dark">Характеристики</p>
          <ItemDescription
            ItemDescAlt="Внутренности iPhone"
            ItemDescImgSrc="src\assets\pc\iphonea19.png"
            ItemDescDesc="Даже при работе с самыми требовательными
            графическими и медиафайлами iPhone 17 Pro 
            сохраняет высочайшую скорость. Новая система
            охлаждения с лазерной паровой камерой
            эффективно отводит тепло от чипа A19 Pro.
            Она работает вместе с алюминиевой конструкцией
            корпуса, чтобы поддерживать стабильную
            производительность даже при пиковых нагрузках."
          />
          <ItemDescription
            ItemDescAlt="Камера iPhone"
            ItemDescImgSrc="src\assets\pc\iphonecamera.png"
            ItemDescDesc="Обновлённый телеобъектив получил
            усовершенствованный дизайн и сенсор, площадь которого увеличена на 56%. 
            Эквивалентное фокусное расстояние
            200 миллиметрови 8-кратный оптический зум дают самый длинный зум в истории iPhone."
          />
          <ItemDescription
            ItemDescAlt="Внутренности iPhone"
            ItemDescImgSrc="src\assets\pc\iphonecpu.png"
            ItemDescDesc="Новый внутренний дизайн освободил место
            для аккумулятора большей ёмкости. Это
            позволилоiPhone 17 Pro и iPhone 17 Pro Max
            достичь самого продолжительного
            времени автономной работы среди 
            всех моделей iPhone. Эти устройства готовы 
            к работе в любом режиме и без ограничений по времени."
          />
        </div>
      </section>
    </>
  );
}

export default IPhonePage;
