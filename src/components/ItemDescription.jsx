import "./ItemDescription.css";
import { useTheme } from "../contexts/ThemeContext";

function ItemDescription(props) {
  const { isDark } = useTheme();
  return (
    <>
      <div className={isDark ? "item-description-dark" : "item-description"}>
        <img
          alt={props.ItemDescAlt}
          src={props.ItemDescImgSrc}
          className={isDark ? "item-description-img-dark" : "item-description-img"}
        ></img>
        <div className={isDark ? "item-desc-content-dark" : "item-desc-content"}>
          <p className={isDark ? "item-desc-desc-dark" : "item-desc-desc"}>{props.ItemDescDesc}</p>
        </div>
      </div>
    </>
  );
}

export default ItemDescription;
