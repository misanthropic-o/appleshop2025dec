import React, { useEffect, useRef, useState } from "react";
import "./ImageSlider.css";
import { useTheme } from "../contexts/ThemeContext";

export default function ImageSlider({ slides = [], title }) {
  const { isDark } = useTheme();
  if (slides.length < 3) return null;
  const clonesBefore = slides.slice(-3);
  const clonesAfter = slides.slice(0, 3);
  const allSlides = [...clonesBefore, ...slides, ...clonesAfter];

  const SLIDES_VISIBLE = 3;
  const SLIDE_WIDTH = 100 / SLIDES_VISIBLE; // %

  const [index, setIndex] = useState(3);
  const [withTransition, setWithTransition] = useState(true);
  const trackRef = useRef(null);

  const goNext = () => {
    setWithTransition(true);
    setIndex((i) => i + 1);
  };

  const goPrev = () => {
    setWithTransition(true);
    setIndex((i) => i - 1);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onTransitionEnd = () => {
      if (index >= slides.length + 3) {
        setWithTransition(false);
        setIndex(3);
      }

      if (index < 3) {
        setWithTransition(false);
        setIndex(slides.length + 2);
      }
    };

    track.addEventListener("transitionend", onTransitionEnd);
    return () => track.removeEventListener("transitionend", onTransitionEnd);
  }, [index, slides.length]);

  useEffect(() => {
    if (!withTransition) {
      const timer = setTimeout(() => {
        setWithTransition(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [withTransition]);

  return (
    <section className={isDark ? "slider-section-dark" : "slider-section"}>
      {title && <h2 className={isDark ? "slider-title-dark" : "slider-title"}>{title}</h2>}

      <div className={isDark ? "slider-container-dark" : "slider-container"}>
        <button className={isDark ? "nav-button-dark left" : "nav-button left"} onClick={goPrev}>
          ❮
        </button>

        <div className={isDark ? "carousel-dark" : "carousel"}>
          <div
            ref={trackRef}
            className={`slides ${
              withTransition ? "transition" : "no-transition"
            }${isDark ? "-dark" : ""}`}
            style={{ transform: `translateX(-${index * SLIDE_WIDTH}%)` }}
          >
            {allSlides.map((slide, i) => (
              <div className={isDark ? "slide-dark" : "slide"} key={i}>
                <img src={slide.image} alt={slide.title} />
                <p className={isDark ? "slide-title-item-dark" : "slide-title-item"}>{slide.title}</p>
              </div>
            ))}
          </div>
        </div>

        <button className={isDark ? "nav-button-dark right" : "nav-button right"} onClick={goNext}>
          ❯
        </button>
      </div>
    </section>
  );
}
