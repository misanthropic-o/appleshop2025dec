import { useState, useRef, useEffect } from "react";
import "./iPadCardPage.css";
import UIKitBtn from "../../../UIKitBtn";
import MemorySelection from "../../../MemorySelection";
import ColorChoice from "../../../ColorChoice";
import { useAuth } from "../../../../contexts/AuthContext";
import { useCart } from "../../../../contexts/CartContext";
import { useNavigate } from "react-router-dom";

function IPadCardPage() {
  const [showColorChoice, setShowColorChoice] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const colorChoiceRef = useRef(null);
  const buttonRef = useRef(null);
  const { user } = useAuth();
  const { addToCart, cartItems } = useCart();
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
   
    if (user && selectedMemory && selectedColor && !hasAddedToCart.current) {
      hasAddedToCart.current = true;
      
      const price = "150 000₽";
      const itemToAdd = {
        name: "iPad",
        price: price,
        color: selectedColor.name,
        memory: selectedMemory,
        image: selectedColor.image || "/violipad.png",
      };

      console.log("Auto-adding to cart:", itemToAdd);
      console.log("Current cart before add:", cartItems);
      
      addToCart(itemToAdd);

      window.alert("Товар добавлен в корзину");
      
      setTimeout(() => {
        setSelectedMemory(null);
        setSelectedColor(null);
        setShowColorChoice(false);
        hasAddedToCart.current = false;
      }, 1000);
    }
  }, [selectedMemory, selectedColor, user, addToCart]);

  const handleMemoryClick = (memory) => {
    if (!user) {
      window.alert("Пожалуйста, войдите в систему или зарегистрируйтесь");
      navigate("/signup");
      return;
    }
    setSelectedMemory(memory);
    console.log("Memory selected:", memory);
  };

  const handleBuyClick = () => {
    if (!user) {
      window.alert("Пожалуйста, войдите в систему или зарегистрируйтесь");
      navigate("/signup");
      return;
    }

    if (!selectedMemory) {
      window.alert("Пожалуйста, выберите объем памяти");
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
      <div className="ipad-card-page">
        <div className="ipad-card-left">
          <div className="ipad-card-left-text">
            <p className="ipad-card-titlee">iPad</p>
            <p className="ipad-card-textt">
              Самый производительный
              <br />
              планшет в мире.
            </p>
          </div>
          <div className="damn">
            <p className="iphone-price">150 000₽</p>
            <div className="iphone-page-card-buttons" style={{ position: "relative" }}>
              <MemorySelection
                MemorySelectionContent1="256 ГБ"
                MemorySelectionContent2="512 ГБ"
                MemorySelectionContent3="1 ТБ"
                onMemorySelect={handleMemoryClick}
              />
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
                      productType="ipad"
                      onColorSelect={handleColorSelect}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="ipad-card-right">
          <img alt="Экземпляр iPad" src="src\assets\pc\ipad.png"></img>
        </div>
      </div>
    </>
  );
}

export default IPadCardPage;
