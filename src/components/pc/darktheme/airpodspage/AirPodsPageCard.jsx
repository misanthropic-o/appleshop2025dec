import "./AirPodsPageCard.css";
import airpodLeft from "../../../../assets/pc/airpodleft.png";
import airpodRight from "../../../../assets/pc/airpodright.png";
import caseTop from "../../../../assets/pc/caseto.png";
import caseBottom from "../../../../assets/pc/case.png";
import UIKitBtn from "../../../UIKitBtn";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "../../../../contexts/ThemeContext";

function AirPodsPageCard() {
  const { isDark } = useTheme();
  const [earbudOffset, setEarbudOffset] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const componentRef = useRef(null);

  useEffect(() => {
    console.log("Setting up scroll listener...");

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      setScrollPosition(scrollY);

      console.log("Scroll Y:", scrollY);

      const maxScrollDistance = 500;
      const progress = Math.min(1, scrollY / maxScrollDistance);
      const offset = progress * 100;

      console.log("Progress:", progress, "Offset:", offset);

      setEarbudOffset(offset);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    console.log("Scroll listener set up");

    return () => {
      console.log("Cleaning up scroll listener");
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="airpods-card-page-dark" ref={componentRef}>
      <p className="airpods-title-dark">AirPods</p>
      <div className="airpods-card-text-content-dark">
        <p className="text-left">
          Наушники с лучшей
          <br /> в мире системой
          <br />
          активного
          <br />
          шумоподавления.
        </p>
        <div className="airpod-wrapper">
          <img src={caseTop} alt="case top" className="case case-top" />
          <div
            className="ears-container"
            style={{
              bottom: `${160 + earbudOffset}px`,
              transition: "bottom 0.1s ease",
            }}
          >
            <img
              src={airpodLeft}
              alt="left earbud"
              className="ear ear-left"
              style={{
                transform: `translateY(${earbudOffset}px)`,
                transition: "transform 0.1s ease",
              }}
            />
            <img
              src={airpodRight}
              alt="right earbud"
              className="ear ear-right"
              style={{
                transform: `translateY(${earbudOffset}px)`,
                transition: "transform 0.1s ease",
              }}
            />
          </div>

          <img
            src={caseBottom}
            alt="case bottom"
            className="case case-bottom"
          />
        </div>
        <div className="right-content-container">
          <p className="text-right">
            Устраняет в два раза
            <br />
            больше нежелательных
            <br />
            шумов, чем AirPods Pro 2,
            <br />
            и в четыре раза больше,
            <br />
            чем AirPods Pro.
          </p>
          <div className="airpods-price">
            <p className="iphone-price">30 000₽</p>
            <UIKitBtn
              UIKitBtnWidth="200px"
              UIKitBtnHeight="68px"
              UIKitBtnFontSize="2rem"
              UIKitBtnContent="Купить"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AirPodsPageCard;
