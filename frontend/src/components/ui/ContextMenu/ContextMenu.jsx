import { useEffect, useRef, useState } from "react";
import "./ContextMenu.css";

function ContextMenu({
    children,
    items = [],
    className = ""
}) {

    const [open, setOpen] = useState(false);

    const [position, setPosition] = useState({
        x: 0,
        y: 0
    });

    const menuRef = useRef(null);

    useEffect(() => {

        const closeMenu = () => setOpen(false);

        window.addEventListener("click", closeMenu);
        window.addEventListener("scroll", closeMenu);
        window.addEventListener("resize", closeMenu);

        return () => {

            window.removeEventListener("click", closeMenu);
            window.removeEventListener("scroll", closeMenu);
            window.removeEventListener("resize", closeMenu);

        };

    }, []);

    const handleContextMenu = (event) => {

        event.preventDefault();

        setPosition({
            x: event.clientX,
            y: event.clientY
        });

        setOpen(true);

    };

    return (

        <div
            className={`context-menu ${className}`}
            onContextMenu={handleContextMenu}
        >

            {children}

            {open && (

                <div
                    ref={menuRef}
                    className="context-menu__menu"
                    style={{
                        top: position.y,
                        left: position.x
                    }}
                >

                    {items.map((item, index) => {

                        if (item.divider) {

                            return (

                                <hr
                                    key={index}
                                    className="context-menu__divider"
                                />

                            );

                        }

                        return (

                            <button
                                key={item.label}
                                type="button"
                                className="context-menu__item"
                                disabled={item.disabled}
                                onClick={() => {

                                    item.onClick?.();

                                    setOpen(false);

                                }}
                            >

                                {item.icon && (

                                    <item.icon
                                        size={18}
                                        className="context-menu__icon"
                                    />

                                )}

                                <span>

                                    {item.label}

                                </span>

                            </button>

                        );

                    })}

                </div>

            )}

        </div>

    );

}

export default ContextMenu;