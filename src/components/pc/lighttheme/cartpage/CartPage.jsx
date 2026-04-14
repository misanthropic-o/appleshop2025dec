import { useEffect } from "react";
import "./CartPage.css";
import CartItem from "./CartItem";
import CartTotal from "./CartTotal";
import { useCart } from "../../../../contexts/CartContext";

function CartPage() {
  const { cartItems, getTotalPrice } = useCart();

  useEffect(() => {
    console.log("CartPage - cartItems:", cartItems);
    console.log("CartPage - cartItems length:", cartItems.length);
  }, [cartItems]);

  return (
    <>
      <div className="cart-page">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>Корзина пуста</p>
          ) : (
            cartItems.map((item) => {
              console.log("Rendering cart item:", item);
              return (
                <CartItem
                  key={item.id}
                  CartItemName={item.name}
                  ItemColor={item.color || "—"}
                  ItemMem={item.memory || "—"}
                  ItemPrice={item.price}
                  CartItemImgSrc={item.image}
                  itemId={item.id}
                />
              );
            })
          )}
        </div>
        <CartTotal TotalPrice={`${getTotalPrice().toLocaleString("ru-RU")} руб.`} />
      </div>
    </>
  );
}

export default CartPage;
