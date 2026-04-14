import "./CartPage.css";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import { useCart } from "../../../../contexts/CartContext";

function CartPage() {
  const { cartItems, getTotalPrice } = useCart();

  return (
    <>
      <div className="cart-page-dark">
        <div className="cart-items-dark">
          {cartItems.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            cartItems.map((item) => (
              <CartItem
                key={item.id}
                CartItemName={item.name}
                ItemColor={item.color || "—"}
                ItemMem={item.memory || "—"}
                ItemPrice={item.price}
                CartItemImgSrc={item.image}
                itemId={item.id}
              />
            ))
          )}
        </div>
        <CartTotal TotalPrice={`${getTotalPrice().toLocaleString("ru-RU")} руб.`} />
      </div>
    </>
  );
}

export default CartPage;
