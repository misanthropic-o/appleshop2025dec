import React, { useEffect, useState } from "react";
import "./BackToTop.css";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={`back-to-top ${visible ? "visible" : "hidden"}`}
      onClick={handleClick}
      aria-label="Back to top"
    >
      ^
    </button>
  );
}
