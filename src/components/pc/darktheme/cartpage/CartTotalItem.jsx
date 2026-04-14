import "./CartTotalItem.css";
import { useTheme } from "../../../../contexts/ThemeContext";

export default function CartTotalItem(props) {
  const { isDark } = useTheme();

  return (
    <div className="cart-total-item-dark">
      <p>{props.CartTotalItem}</p>
      <p>{props.CartTotalPrice}</p>
    </div>
  );
}
