import "./ColorChoice.css";
import ColorChocieShit from "./ColorChoiceShit";
import { useTheme } from "../contexts/ThemeContext";

const COLOR_MAPPINGS = {
  ipad: [
    { name: "Фиолетовый", image: "/violipad.png" },
    { name: "Голубой", image: "/blueipad.png" },
    { name: "Черный", image: "/ipadblack.png" },
  ],
  iphone: [
    { name: "Белый", image: "/whiteiphone.png" },
    { name: "Оранжевый", image: "/orangeiphone.png" },
    { name: "Синий", image: "/deepblueiphne.png" },
  ],
  watch: [
    { name: "Черный", image: "/blackwatch.png" },
    { name: "Титановый", image: "/tiatniumwathc.png" },
    { name: "Синий кожаный", image: "/bluewatch.png" },
    { name: "Серебряный Hermes", image: "/hermessilverwatch.png" },
    { name: "Неон", image: "/neonwatch.png" },
    { name: "Оранжевый Hermes", image: "/hermesorangewatch.png" },
  ],
};

export default function ColorChoice(props) {
  const { isDark } = useTheme();
  const productType = props.productType || "iphone";
  const colors = COLOR_MAPPINGS[productType] || COLOR_MAPPINGS.iphone;

  return (
    <>
      <div className={isDark ? "color-choice-pop-up-dark" : "color-choice-pop-up"}>
        <p className={isDark ? "color-choice-title-dark" : "color-choice-title"}>Выберите Цвет</p>
        <div className={isDark ? "color-choice-fuck-dark" : "color-choice-fuck"}>
          {colors.map((color, index) => (
            <ColorChocieShit
              key={index}
              ColorChoiceAAA={color.name}
              onClick={() => props.onColorSelect && props.onColorSelect(color)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
