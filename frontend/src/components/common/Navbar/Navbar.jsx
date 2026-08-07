import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import Button from "../../ui/Button";
import "./Navbar.css";

function Navbar({
    logo,
    links = [],
    cta,
    sticky = true,
    className = ""
}) {

    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [openedDropdown, setOpenedDropdown] = useState(null);

    useEffect(() => {

        if (!sticky) {return;}

        const handleScroll = () => {

            setScrolled(window.scrollY > 30);

        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener(
            "scroll",
            handleScroll
        );

    }, [sticky]);

    useEffect(() => {

        document.body.style.overflow = mobileOpen
            ? "hidden"
            : "";

        return () => {

            document.body.style.overflow = "";

        };

    }, [mobileOpen]);

    return (

        <header
            className={[
                "navbar",
                scrolled && "navbar--scrolled",
                className
            ]
                .filter(Boolean)
                .join(" ")}
        >

            <div className="navbar__container">

                <NavLink
                    to="/"
                    className="navbar__logo"
                >

                    {logo}

                </NavLink>

                <nav className="navbar__desktop">

                    {links.map((link) => (

                        <div
                            key={link.label}
                            className="navbar__item"
                            onMouseEnter={() =>
                                setOpenedDropdown(link.label)
                            }
                            onMouseLeave={() =>
                                setOpenedDropdown(null)
                            }
                        >

                            <NavLink
                                to={link.path || "#"}
                                className={({ isActive }) =>
                                    isActive
                                        ? "navbar__link navbar__link--active"
                                        : "navbar__link"
                                }
                            >

                                {link.label}

                                {link.children && (

                                    <ChevronDown size={16} />

                                )}

                            </NavLink>

                            {link.children &&
                                openedDropdown === link.label && (

                                    <div className="navbar__dropdown">

                                        {link.children.map((child) => (

                                            <NavLink
                                                key={child.label}
                                                to={child.path}
                                                className="navbar__dropdown-link"
                                            >

                                                {child.label}

                                            </NavLink>

                                        ))}

                                    </div>

                                )}

                        </div>

                    ))}

                </nav>

                {cta && (

                    <div className="navbar__cta">

                        <Button
                            onClick={cta.onClick}
                        >

                            {cta.label}

                        </Button>

                    </div>

                )}

                <button
                    className="navbar__toggle"
                    onClick={() =>
                        setMobileOpen(previous => !previous)
                    }
                >

                    {mobileOpen
                        ? <X size={26} />
                        : <Menu size={26} />}

                </button>

            </div>

            <div
                className={[
                    "navbar__mobile",
                    mobileOpen &&
                    "navbar__mobile--open"
                ]
                    .filter(Boolean)
                    .join(" ")}
            >

                {links.map((link) => (

                    <NavLink
                        key={link.label}
                        to={link.path || "#"}
                        className="navbar__mobile-link"
                        onClick={() =>
                            setMobileOpen(false)
                        }
                    >

                        {link.label}

                    </NavLink>

                ))}

                {cta && (

                    <Button
                        onClick={() => {

                            setMobileOpen(false);

                            cta.onClick();

                        }}
                    >

                        {cta.label}

                    </Button>

                )}

            </div>

        </header>

    );

}

export default Navbar;