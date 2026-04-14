import "./AirPodsPage.css";
import ImageSlider from "../../../ImageSlider";
import ItemDescription from "../../../ItemDescription";
import AirPodsPageCard from "./AirPodsPageCard.jsx";

function AirPodsPage() {
  return (
    <>
      <div className="airpods-page">
        <AirPodsPageCard />
        <div className="item-description-placeholder-ipad">
          <p className="description-title">Характеристики</p>
          <ItemDescription
            ItemDescAlt="AirPods рядом с телефоном"
            ItemDescImgSrc="src\assets\pc\airpods1.png"
            ItemDescDesc="Персонализированный пространственный
            звук с динамическим отслеживанием
            головы размещает звук вокруг вас, создавая
            трехмерный опыт прослушивания музыки, телешоу, фильмов, игр и многого другого."
          />
          <ItemDescription
            ItemDescAlt="Внтури AirPods"
            ItemDescImgSrc="src\assets\pc\airpodscpu.png"
            ItemDescDesc="AirPods 4 выпускаются в двух версиях. В
            одной из них они впервые предлагают
            возможность активного шумоподавления
            в открытом дизайне. Работая на 
            чипе H2 и модернизированных микрофонах,
            он помогает уменьшить низкочастотный шум окружающей среды."
          />
          <ItemDescription
            ItemDescAlt="Внутренности iPhone"
            ItemDescImgSrc="src\assets\pc\iphonecpu.png"
            ItemDescDesc="Обтекаемый зарядный футляр более,
            чем на 10% меньше по объему, чем предыдущее 
            околение, без ущерба для времени зарядки. А AirPods 4
            с активным шумоподавлением оснащены
            беспроводным зарядным футляром — самым
            маленьким в отрасли с этой функцией — а также
            встроенным динамиком для Локатора, который
            поможет вам отслеживать его местоположение."
          />
        </div>
      </div>
    </>
  );
}

export default AirPodsPage;
