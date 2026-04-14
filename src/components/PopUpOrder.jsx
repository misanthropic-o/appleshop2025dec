import { useState } from "react";
import "./PopUpOrder.css";
import Inpput from "./Inpput.jsx";
import { useTheme } from "../contexts/ThemeContext";
import { useCart } from "../contexts/CartContext";

export default function PopUpOrder({ onClose, cartItems }) {
  const { isDark } = useTheme();
  const { clearCart } = useCart();
  const [telegramUsername, setTelegramUsername] = useState("");

  const handleSubmit = async () => {
    if (!telegramUsername.trim()) {
      window.alert("Пожалуйста, введите имя пользователя Telegram");
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telegramUsername: telegramUsername.trim(),
          items: cartItems,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Order placed successfully");
        clearCart();
        window.alert("Заказ успешно оформлен! Мы свяжемся с вами в Telegram.");
        if (onClose) onClose();
      } else {
        console.log("Order failed:", data.error);
        window.alert("Ошибка при оформлении заказа: " + (data.error || "Неизвестная ошибка"));
      }
    } catch (error) {
      console.log("Order error:", error);
      window.alert("Ошибка подключения к серверу");
    }
  };

  return (
    <div
      className="popup-overlay"
      onClick={(e) => {

        if (e.target.classList.contains("popup-overlay")) {
          if (onClose) onClose();
        }
      }}
    >
      <div className={isDark ? "order-pop-up-dark modal" : "order-pop-up modal"} role="dialog" aria-modal="true">
        <p className={isDark ? "order-pop-up-title-dark" : "order-pop-up-title"}>
          Для потверждения заказа
          <br />
          оставьте заявку в Telegram
        </p>
        <div className={isDark ? "inputs-n-shit-dark" : "inputs-n-shit"}>
          <Inpput
            LabelInfo="Имя пользователя в Telegram"
            IPlchld="Вводить тут..."
            IWidth="420px"
            value={telegramUsername}
            onChange={(e) => setTelegramUsername(e.target.value)}
          />
        </div>
        <button className={isDark ? "shitovoz-dark" : "shitovoz"} onClick={handleSubmit}>
          Оставить заявку
        </button>
      </div>
    </div>
  );
}
