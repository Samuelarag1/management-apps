"use client";
import React, { useState, useEffect } from "react";
import "./styles.css";
import { Teko } from "next/font/google";
import { usePathname } from "next/navigation";

const teko = Teko({
  weight: "700",
  subsets: ["latin"],
});

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const path = usePathname();
  if (path === "/") {
    return null;
  }

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="navbar">
      <h1 className={`${teko.className} text-3xl text-white`}>Panel Admin</h1>

      <label>
        <div className="w-9 h-10 cursor-pointer flex flex-col items-center justify-center">
          <input
            className="hidden peer"
            type="checkbox"
            checked={menuOpen}
            onChange={toggleMenu}
          />
          <div className="w-[50%] h-[2px] bg-white rounded-sm transition-all duration-300 origin-left translate-y-[0.45rem] peer-checked:rotate-[-45deg]" />
          <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-center peer-checked:hidden" />
          <div className="w-[50%] h-[2px] bg-white rounded-md transition-all duration-300 origin-left -translate-y-[0.45rem] peer-checked:rotate-[45deg]" />
        </div>
      </label>

      <nav className={`menu ${menuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <a href="/dashboard" className="nav-link">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/metrics" className="nav-link">
              Metricas
            </a>
          </li>
          <li>
            <a href="/projects" className="nav-link">
              Proyectos
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
