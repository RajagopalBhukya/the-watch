import React, { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  ["HOME", "#home"],
  ["SHOP", "#shop"],
  ["COLLECTIONS", "#collections"],
  ["ABOUT US", "#about"],
  ["CONTACT", "#contact"],
];

export default function Navbar({ count, onCart }) {
  const [show, setShow] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const showTimer = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShow(false);
      setMenuOpen(false);
      window.clearTimeout(showTimer.current);
      showTimer.current = window.setTimeout(() => setShow(true), 220);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.clearTimeout(showTimer.current);
    };
  }, []);

  return (
    <header className={`nav-wrap ${show ? "show" : ""}`}>
      <div className="glass-nav">
        <a href="#home" className="brand-logo" aria-label="The Watch home">
          <img src="/the-watch-logo.png" alt="The Watch" />
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {NAV_LINKS.map(([label, href]) => (
            <a className="water-dot" href={href} key={label}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button className="water-dot" onClick={onCart}>
            CART <b className="cart-badge">{count}</b>
          </button>
          <button
            className="water-dot menu-btn"
            onClick={() => setMenuOpen((current) => !current)}
          >
            MENU
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-nav glass-nav" aria-label="Mobile navigation">
          {NAV_LINKS.map(([label, href]) => (
            <a
              className="water-dot"
              href={href}
              key={label}
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
