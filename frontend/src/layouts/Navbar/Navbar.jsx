import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

import LanguageSwitcher from "@components/common/LanguageSwitcher";

import "./Navbar.css";

function Navbar() {

    const { t } = useTranslation();

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
                        <NavLink to="/" end onClick={closeMenu}>
                            {t("navbar.home")}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/about" onClick={closeMenu}>
                            {t("navbar.about")}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/consultations" onClick={closeMenu}>
                            {t("navbar.consultations")}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/products" onClick={closeMenu}>
                            {t("navbar.products")}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/events" onClick={closeMenu}>
                            {t("navbar.events")}
                        </NavLink>
                    </li>

                    <li>
                        <NavLink to="/contact" onClick={closeMenu}>
                            {t("navbar.contact")}
                        </NavLink>
                    </li>

                </ul>

                <LanguageSwitcher />

                <Link
                    to="/appointment"
                    className="navbar__button"
                >
                    {t("navbar.appointment")}
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
