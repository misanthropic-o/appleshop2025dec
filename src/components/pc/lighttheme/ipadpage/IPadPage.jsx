import IPadCardPage from "./IPadCardPage";
import "./IPadPage.css";
import ImageSlider from "../../../ImageSlider";
import ItemDescription from "../../../ItemDescription";

function IPadPage() {
  return (
    <>
      <div className="ipad-page">
        <IPadCardPage />
        <div className="slider-iphone-page">
          <ImageSlider
            title="Цвет"
            slides={[
              {
                title: "Голубой",
                image: "src/assets/pc/ipadblue.png",
              },
              {
                title: "Серый",
                image: "src/assets/pc/ipadgray.png",
              },
              {
                title: "Фиолетовый",
                image: "src/assets/pc/ipadviol.png",
              },
            ]}
          />
        </div>
      </div>
      <div className="item-description-placeholder-ipad">
        <p className="description-title">Характеристики</p>
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
    </>
  );
}

export default IPadPage;
