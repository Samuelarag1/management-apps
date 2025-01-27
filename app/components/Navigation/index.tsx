"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Teko } from "next/font/google";

const teko = Teko({
  weight: "700",
  subsets: ["latin"],
});
const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSmoothScroll = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href")?.substring(1);
    const targetElement = document.getElementById(targetId || "");
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: "smooth",
      });
    }
    setMenuOpen(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX === null) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;

    if (diffX > 50) {
      setMenuOpen(true);
    }
    if (diffX < -50) {
      setMenuOpen(false);
    }

    setStartX(null);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className="navbar"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <h1 className={`${teko.className} text-3xl`}>
        Samarag<span className="text-blue-600">Tech</span>
      </h1>
      <div className="hamburger">
        <input
          className="checkbox"
          type="checkbox"
          checked={menuOpen}
          onChange={toggleMenu}
        />
        <svg fill="none" viewBox="0 0 50 50" height="50" width="50">
          <path
            className="lineTop line"
            strokeLinecap="round"
            strokeWidth="4"
            stroke="black"
            d="M6 11L44 11"
          ></path>
          <path
            strokeLinecap="round"
            strokeWidth="4"
            stroke="black"
            d="M6 24H43"
            className="lineMid line"
          ></path>
          <path
            strokeLinecap="round"
            strokeWidth="4"
            stroke="black"
            d="M6 37H43"
            className="lineBottom line"
          ></path>
        </svg>
      </div>

      <nav className={`menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="/home" className="nav-link" onClick={handleSmoothScroll}>
              Inicio
            </a>
          </li>
          <li>
            <a
              href="#services"
              className="nav-link"
              onClick={handleSmoothScroll}
            >
              Servicios
            </a>
          </li>
          <li>
            <a
              href="#clients"
              className="nav-link"
              onClick={handleSmoothScroll}
            >
              Clientes
            </a>
          </li>
          <li>
            <a href="#planes" className="nav-link" onClick={handleSmoothScroll}>
              Planes y precios
            </a>
          </li>
          <li>
            <a href="#faq" className="nav-link" onClick={handleSmoothScroll}>
              Preguntas Frequentes
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
