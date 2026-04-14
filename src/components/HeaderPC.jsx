import "./HeaderPC.css";
import { useTheme } from "../contexts/ThemeContext";
import { useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import { useState } from "react";

function HeaderPC() {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className={isDark ? "header-dark" : "header-white"}>
        <nav className={isDark ? "nav-dark" : "nav-white"}>
          <div className="nav-left">
            <a className={`logo ${location.pathname === '/' || location.pathname === '/home' ? 'active-link' : ''}`} href="/home">
              storé
            </a>
          </div>

          <div className="nav-center">
            <ul className="nav-main-content">
              <li>
                <a href="/iphone" className={location.pathname.startsWith('/iphone') ? 'active-link' : ''}>iPhone</a>
              </li>
              <li>
                <a href="/ipad" className={location.pathname.startsWith('/ipad') ? 'active-link' : ''}>iPad</a>
              </li>
              <li>
                <a href="/watch" className={location.pathname.startsWith('/watch') ? 'active-link' : ''}>Watch</a>
              </li>
              <li>
                <a href="/airpods" className={location.pathname.startsWith('/airpods') ? 'active-link' : ''}>AirPods</a>
              </li>
              <li>
                <a href="https://github.com/webgrotesk/">GitHub</a>
              </li>
              <li>
                <a href="https://t.me/webgrotesk">Telegram</a>
              </li>
              <li>
                <a href="https://t.me/webgrotesk">Баг-репорт</a>
              </li>
            </ul>
          </div>

          <div className="nav-right">
            <div className="nav-btns">
              <button
                className="hamburger-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
              <a
                className={isDark ? "theme-change-btn-dark" : "theme-change-btn-white"}
                onClick={toggleTheme}
                style={{ cursor: "pointer" }}
              >
                <span className={isDark ? "theme-change-icn-dark" : "theme-change-icn-white"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="15px"
                    viewBox="0 -960 960 960"
                    width="15px"
                    fill={isDark ? "#FFFFFF" : "#000000"}
                  >
                    <path d="M484-80q-84 0-157.5-32t-128-86.5Q144-253 112-326.5T80-484q0-146 93-257.5T410-880q-18 99 11 193.5T521-521q71 71 165.5 100T880-410q-26 144-138 237T484-80Zm0-80q88 0 163-44t118-121q-86-8-163-43.5T464-465q-61-61-97-138t-43-163q-77 43-120.5 118.5T160-484q0 135 94.5 229.5T484-160Zm-20-305Z" />
                  </svg>
                </span>
              </a>
              <a href="/cart" className={isDark ? "cart-btn-dark" : "cart-btn-white"}>
                <span className={isDark ? "cart-icn-dark" : "cart-icn-white"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="15px"
                    viewBox="0 -960 960 960"
                    width="15px"
                    fill={isDark ? "#FFFFFF" : "#000000"}
                  >
                    <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
                  </svg>
                </span>
              </a>
              <a href="/signup" className={isDark ? "profile-btn-dark" : "profile-btn-white"}>
                <span className={isDark ? "profile-icn-dark" : "profile-icn-white"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="23px"
                    viewBox="0 -960 960 960"
                    width="23px"
                    fill={isDark ? "#FFFFFF" : "#000000"}
                  >
                    <path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </nav>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

      <div className="subheader">
        <p>
          При покупке 2 147 483 647 единиц iPhone скидка 5% на -1-ый iPhone{" "}
        </p>
      </div>
    </>
  );
}

export default HeaderPC;
