import { useEffect, useRef, useState } from "react";

import {
    ChevronDown,
    ArrowRight,
} from "lucide-react";

import "./MegaMenu.css";

function MegaMenu({

    items = [],

    openOnHover = true,

}) {

    const [opened, setOpened] = useState(null);

    const menuRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (

                menuRef.current &&
                !menuRef.current.contains(event.target)

            ) {

                setOpened(null);

            }

        };

        document.addEventListener(

            "mousedown",

            handleClickOutside

        );

        return () => {

            document.removeEventListener(

                "mousedown",

                handleClickOutside

            );

        };

    }, []);

    const openMenu = (id) => {

        if (openOnHover) {

            setOpened(id);

        }

    };

    const toggleMenu = (id) => {

        if (!openOnHover) {

            setOpened(

                opened === id

                    ? null

                    : id

            );

        }

    };

    return (

        <nav

            className="mega-menu"

            ref={menuRef}

        >

            <ul className="mega-menu__list">

                {items.map((menu) => (

                    <li

                        key={menu.id}

                        className="mega-menu__item"

                        onMouseEnter={() =>

                            openMenu(menu.id)

                        }

                        onMouseLeave={() =>

                            openOnHover &&

                            setOpened(null)

                        }

                    >

                        <button

                            className="mega-menu__button"

                            onClick={() =>

                                toggleMenu(menu.id)

                            }

                        >

                            {menu.label}

                            <ChevronDown size={16} />

                        </button>

                        {opened === menu.id && (

                            <div className="mega-menu__dropdown">

                                {menu.columns.map(

                                    (column, index) => (

                                        <div

                                            key={index}

                                            className="mega-menu__column"

                                        >

                                            <h4>

                                                {column.title}

                                            </h4>

                                            <ul>

                                                {column.links.map(

                                                    (link) => (

                                                        <li

                                                            key={link.label}

                                                        >

                                                            <a

                                                                href={link.href}

                                                            >

                                                                {link.icon && (

                                                                    <link.icon

                                                                        size={18}

                                                                    />

                                                                )}

                                                                <span>

                                                                    {

                                                                        link.label

                                                                    }

                                                                </span>

                                                                <ArrowRight

                                                                    size={14}

                                                                />

                                                            </a>

                                                        </li>

                                                    )

                                                )}

                                            </ul>

                                        </div>

                                    )

                                )}

                                {menu.banner && (

                                    <aside

                                        className="mega-menu__banner"

                                    >

                                        <img

                                            src={menu.banner.image}

                                            alt={menu.banner.title}

                                        />

                                        <div>

                                            <h3>

                                                {menu.banner.title}

                                            </h3>

                                            <p>

                                                {

                                                    menu.banner.description

                                                }

                                            </p>

                                        </div>

                                    </aside>

                                )}

                            </div>

                        )}

                    </li>

                ))}

            </ul>

        </nav>

    );

}

export default MegaMenu;