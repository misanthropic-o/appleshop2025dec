import "./WatchPage.css";
import WatchCardPage from "./WatchPageCard";
import ImageSlider from "../../../ImageSlider";
import ItemDescription from "../../../ItemDescription";
import { useTheme } from "../../../../contexts/ThemeContext";

function WatchPage() {
  const { isDark } = useTheme();

  return (
    <>
      <div className="watch-page-dark">
        <WatchCardPage />
        <ImageSlider
          title="Цвет"
          slides={[
            {
              title: "Черный",
              image: "public/slidimg1wwatch.jpg",
            },
            {
              title: "Титановый",
              image: "public/slidimg2wwatch.jpg",
            },
            {
              title: "Синий кожаный",
              image: "public/slidimg3wwatch.jpg",
            },
            {
              title: "Серебряный Hermes",
              image: "public/slidimg4wwatch.png",
            },
            {
              title: "Оранжевый Hermes",
              image: "public/slidimg5wwatch.png",
            },
            {
              title: "Неон",
              image: "public/slidimg6wwatch6.png",
            },
          ]}
        />
        <div className="item-description-placeholder-dark">
          <p className="description-title-dark">Характеристики</p>
          <ItemDescription
            ItemDescAlt="Apple Watch в крунном плане"
            ItemDescImgSrc="src\assets\pc\watch1.png"
            ItemDescDesc="Series 10 являются важной вехой 
            для Apple Watch. Они оснащены самым большим
            и самым продвинутым дисплеем от Apple,
            показывающим больше информации на экране,
            чем когда-либо.С первым широкоугольным
            OLED-дисплеем Apple экран становится ярче
            при просмотре под углом, что облегчает чтении при быстром взгляде."
          />
          <ItemDescription
            ItemDescAlt="Apple Watch сбоку"
            ItemDescImgSrc="src\assets\pc\wtch2.png"
            ItemDescDesc="Series 10 - самые тонкие часы за всю историю Apple.
            Чтобы сделать это возможным,
            переработан почти каждый их аспект,
            включая SiP, Digital Crown, динамик,
            процессор и антенну. Все это объединяется, чтобы создать часы, наполненные инновациями."
          />
          <ItemDescription
            ItemDescAlt="Функционал Apple Watch"
            ItemDescImgSrc="src\assets\pc\watch3.png"
            ItemDescDesc="Series 10 - идеальный фитнес-партнер.
            Он мотивирует вас оставаться активным, отслеживает
            все ваши тренировки и дает вам необходимые
            показатели.Новый датчик температуры воды
            дает вам больше информации о тренировках
            по плаванию. А новый датчик глубины делает
            Series 10 отличными для плавания и сноркелинга."
          />
        </div>
      </div>
    </>
  );
}

export default WatchPage;
