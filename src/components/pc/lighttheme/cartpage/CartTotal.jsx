import { useState } from "react";
import "./CartTotal.css";
import CartTotalItem from "./CartTotalItem";
import PopUpOrder from "../../../PopUpOrder";
import { useCart } from "../../../../contexts/CartContext";

export default function CartTotal(props) {
  const [showPopUp, setShowPopUp] = useState(false);
  const { cartItems, clearCart } = useCart();

  const handleBuyClick = () => {
    if (cartItems.length === 0) {
      window.alert("Корзина пуста");
      return;
    }
    setShowPopUp(true);
  };

  const handleRemoveAll = () => {
    if (cartItems.length === 0) {
      window.alert("Корзина уже пуста");
      return;
    }
    if (window.confirm("Вы уверены, что хотите удалить все товары из корзины?")) {
      clearCart();
      console.log("Cart cleared");
    }
  };

  return (
    <div className="cart-total">
      <p className="cart-total-title">Итог</p>
      <div className="total-items">
        {cartItems.map((item) => (
          <CartTotalItem
            key={item.id}
            CartTotalItem={item.name}
            CartTotalPrice={item.price}
          />
        ))}
      </div>
      <div className="institutionalized-manipulation-and-lies">
        <p className="total-price">Итоговая цена</p>
        <p className="total-price">{props.TotalPrice}</p>
      </div>
      <div className="cart-total-items">
        <button className="buttonpreset-add" onClick={handleBuyClick}>Купить</button>
        <button className="buttonpreset-remove" onClick={handleRemoveAll}>Удалить всё</button>
      </div>
      {showPopUp && (
        <PopUpOrder
          onClose={() => setShowPopUp(false)}
          cartItems={cartItems}
        />
      )}
    </div>
  );
}
