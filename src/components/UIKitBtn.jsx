import "./UIKitBtn.css";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigate } from "react-router-dom";

function UIKitBtn(props) {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    } else if (props.to) {
      navigate(props.to);
    }
  };

  return (
    <button
      className={isDark ? "ui-kit-btn-dark" : "ui-kit-btn"}
      id={props.UIKitBtnID}
      onClick={handleClick}
      style={{
        width: props.UIKitBtnWidth,
        height: props.UIKitBtnHeight,
        fontSize: props.UIKitBtnFontSize,
      }}
    >
      {props.UIKitBtnContent}
    </button>
  );
}

export default UIKitBtn;
