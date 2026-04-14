import "./Input.css";
import { useTheme } from "../contexts/ThemeContext";

export default function Inpput(props) {
  const { isDark } = useTheme();
  return (
    <>
      <div>
        <p className={isDark ? "label-for-input-dark" : "label-for-input"}>{props.LabelInfo}</p>
        <input
          type={props.type || "text"}
          placeholder={props.IPlchld}
          className={isDark ? "input-custom-dark" : "input-custom"}
          value={props.value || ""}
          onChange={props.onChange}
          style={{ width: props.IWidth }}
        ></input>
      </div>
    </>
  );
}
