import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

import "./Navbar.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen((previousState) => !previousState);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <nav className="navbar">

            <div className="navbar__container">

                <Link
                    to="/"
                    className="navbar__logo"
                    onClick={closeMenu}
                >
                    LOVE CAN BUILD
                </Link>

                <ul className={`navbar__menu ${isOpen ? "navbar__menu--open" : ""}`}>

                    <li>
                        <NavLink to="/" onClick={closeMenu}>
                            Accueil
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/about" onClick={closeMenu}>
                            À propos
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/consultations" onClick={closeMenu}>
                            Consultations
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/products" onClick={closeMenu}>
                            Produits
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/events" onClick={closeMenu}>
                            Événements
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/contact" onClick={closeMenu}>
                            Contact
                        </NavLink>
                    </li>

                </ul>

                <Link
                    to="/appointment"
                    className="navbar__button"
                >
                    Prendre rendez-vous
                </Link>

                <button
                    className="navbar__toggle"
                    onClick={toggleMenu}
                    aria-label="Ouvrir le menu"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

            </div>

        </nav>
    );
}

export default Navbar;