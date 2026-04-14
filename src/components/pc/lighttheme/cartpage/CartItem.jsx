import "./CartItem.css";
import { useCart } from "../../../../contexts/CartContext";

export default function CartItem(props) {
  const { removeFromCart } = useCart();

  const handleRemove = () => {
    if (props.itemId) {
      removeFromCart(props.itemId);
      console.log("Removed item:", props.itemId);
    }
  };

  return (
    <>
      <div className="cart-item">
        <img className="cart-item-img" src={props.CartItemImgSrc}></img>
        <div className="cart-item-content">
          <div className="cart-item-top-content">
            <p className="item-name">{props.CartItemName}</p>
            <div className="mem-color">
              <p className="item-color">{props.ItemColor}</p>
              <p className="item-memory">{props.ItemMem}</p>
            </div>
          </div>
          <div className="cart-item-btm-content">
            <p className="cart-item-price">{props.ItemPrice}</p>
            <button className="item-remove" onClick={handleRemove}>Убрать</button>
          </div>
        </div>
      </div>
    </>
  );
}
