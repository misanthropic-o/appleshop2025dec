import "./ColorChoiceShit.css";
import { useTheme } from "../contexts/ThemeContext";

export default function ColorChocieShit(props) {
  const { isDark } = useTheme();
  
  const handleClick = (e) => {
    e.preventDefault();
    if (props.onClick) {
      props.onClick();
    }
  };
  
  return (
    <a
      href="#"
      className={isDark ? "colorrrrrorororo-dark" : "colorrrrrorororo"}
      onClick={handleClick}
    >
      {props.ColorChoiceAAA}
    </a>
  );
}
