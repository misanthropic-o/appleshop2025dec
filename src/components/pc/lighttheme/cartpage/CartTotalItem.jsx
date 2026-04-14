import "./CartTotalItem.css";

export default function CartTotalItem(props) {
  return (
    <div className="cart-total-item">
      <p>{props.CartTotalItem}</p>
      <p>{props.CartTotalPrice}</p>
    </div>
  );
}
