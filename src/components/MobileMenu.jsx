import React from "react";
import "./MobileMenu.css";
import { useTheme } from "../contexts/ThemeContext";
import { useLocation } from "react-router-dom";

export default function MobileMenu({ isOpen, onClose }) {
  const { isDark } = useTheme();
  const location = useLocation();

  return (
    <>
      {isOpen && (
        <div
          className="mobile-menu-overlay"
          onClick={onClose}
        />
      )}
      <nav className={`mobile-menu ${isOpen ? "open" : ""} ${isDark ? "mobile-menu-dark" : "mobile-menu-light"}`}>
        <ul className="mobile-menu-items">
          <li>
            <a
              href="/iphone"
              className={location.pathname.startsWith("/iphone") ? "active-link" : ""}
              onClick={onClose}
            >
              iPhone
            </a>
          </li>
          <li>
            <a
              href="/ipad"
              className={location.pathname.startsWith("/ipad") ? "active-link" : ""}
              onClick={onClose}
            >
              iPad
            </a>
          </li>
          <li>
            <a
              href="/watch"
              className={location.pathname.startsWith("/watch") ? "active-link" : ""}
              onClick={onClose}
            >
              Watch
            </a>
          </li>
          <li>
            <a
              href="/airpods"
              className={location.pathname.startsWith("/airpods") ? "active-link" : ""}
              onClick={onClose}
            >
              AirPods
            </a>
          </li>
          <li>
            <a href="https://github.com/webgrotesk/" onClick={onClose}>
              GitHub
            </a>
          </li>
          <li>
            <a href="https://t.me/webgrotesk" onClick={onClose}>
              Telegram
            </a>
          </li>
          <li>
            <a href="https://t.me/webgrotesk" onClick={onClose}>
              Баг-репорт
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
