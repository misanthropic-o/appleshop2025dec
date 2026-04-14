import { useState, useRef, useEffect } from "react";
import "./WatchPageCard.css";
import UIKitBtn from "../../../UIKitBtn";
import ColorChoice from "../../../ColorChoice";
import { useAuth } from "../../../../contexts/AuthContext";
import { useCart } from "../../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function WatchCardPage() {
  const [showColorChoice, setShowColorChoice] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const colorChoiceRef = useRef(null);
  const buttonRef = useRef(null);
  const { user } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        colorChoiceRef.current &&
        !colorChoiceRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowColorChoice(false);
      }
    };

    if (showColorChoice) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorChoice]);

  const hasAddedToCart = useRef(false);
  
  useEffect(() => {

    if (user && selectedColor && !hasAddedToCart.current) {
      hasAddedToCart.current = true;
      
      const price = "30 000₽";
      const itemToAdd = {
        name: "Watch",
        price: price,
        color: selectedColor.name,
        memory: null,
        image: selectedColor.image || "/blackwatch.png",
      };

      console.log("Auto-adding to cart:", itemToAdd);
      
      addToCart(itemToAdd);

      window.alert("Товар добавлен в корзину");
      
      setTimeout(() => {
        setSelectedColor(null);
        setShowColorChoice(false);
        hasAddedToCart.current = false;
      }, 1000);
    }
  }, [selectedColor, user, addToCart]);

  const handleBuyClick = () => {
    if (!user) {
      window.alert("Пожалуйста, войдите в систему или зарегистрируйтесь");
      navigate("/signup");
      return;
    }

    if (!selectedColor) {
      setShowColorChoice(true);
      return;
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowColorChoice(false);
    console.log("Color selected:", color);
  };

  return (
    <>
      <div className="watch-card-page">
        <div className="watch-card-left">
          <div className="watch-card-left-text">
            <p className="watch-card-titlee">Watch</p>
            <p className="watch-card-textt">
              Лучший способ следить за
              <br />
              своим здоровьем.
            </p>
          </div>
          <div className="damn">
            <p className="iphone-price">30 000₽</p>
            <div className="watch-page-card-buttons" style={{ position: "relative" }}>
              <div style={{ position: "relative" }}>
                <div ref={buttonRef}>
                  <UIKitBtn
                    UIKitBtnWidth="200px"
                    UIKitBtnHeight="68px"
                    UIKitBtnFontSize="2rem"
                    UIKitBtnContent="Купить"
                    onClick={handleBuyClick}
                  />
                </div>
                {showColorChoice && (
                  <div ref={colorChoiceRef} style={{ position: "absolute", top: "80px", left: "0" }}>
                    <ColorChoice
                      productType="watch"
                      onColorSelect={handleColorSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="watch-card-right">
          <img alt="Экземпляр iPad" src="src\assets\pc\wtachbig.png"></img>
        </div>
      </div>
    </>
  );
}

export default WatchCardPage;
