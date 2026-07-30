// Navbar.jsx
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import "./css/Navbar.css";
import { Menu, X } from "lucide-react";
import navLinks from "./const/navLinks";

const DESKTOP_BREAKPOINT = 769;

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(
        window.innerWidth >= DESKTOP_BREAKPOINT
    );

    const closeMenu = () => setIsOpen(false);

    useEffect(() => {
        const handleResize = () => {
            setIsDesktop(window.innerWidth >= DESKTOP_BREAKPOINT);
            setIsOpen(false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const navLinksMarkup = (
        <ul className={`navbar-links ${!isDesktop && isOpen ? "open" : ""}`}>
            {navLinks.map((link) => (
                <li key={link.path}>
                    <NavLink
                        to={link.path}
                        end={link.path === "/"}
                        aria-label={link.name}
                        onClick={closeMenu}
                    >
                        {link.name}
                    </NavLink>
                </li>
            ))}
        </ul>
    );

    return (
        <>
            <nav className="navbar">
                <div className="navbar-logo"><img src="path/to/logo.png" alt="Logo" /></div>

                {!isDesktop && (
                    <button
                        className="navbar-toggle"
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Ouvrir le menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                )}

                {isDesktop && navLinksMarkup}
            </nav>

            {!isDesktop && navLinksMarkup}

            {!isDesktop && isOpen && (
                <div className="navbar-overlay" onClick={closeMenu}></div>
            )}
        </>
    );
}

export default Navbar;