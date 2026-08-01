import { useEffect, useRef, useState } from "react";
import "./Dropdown.css";

function Dropdown({
    trigger,
    items = [],
    align = "right",
    className = ""
}) {

    const [open, setOpen] = useState(false);

    const dropdownRef = useRef(null);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {

                setOpen(false);

            }

        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);

    return (

        <div
            ref={dropdownRef}
            className={`dropdown ${className}`}
        >

            <div
                className="dropdown__trigger"
                onClick={() => setOpen(previous => !previous)}
            >

                {trigger}

            </div>

            {open && (

                <div
                    className={`dropdown__menu dropdown__menu--${align}`}
                >

                    {items.map((item, index) => {

                        if (item.divider) {

                            return (

                                <hr
                                    key={index}
                                    className="dropdown__divider"
                                />

                            );

                        }

                        return (

                            <button
                                key={item.label}
                                type="button"
                                className="dropdown__item"
                                disabled={item.disabled}
                                onClick={() => {

                                    item.onClick?.();

                                    setOpen(false);

                                }}
                            >

                                {item.icon && (

                                    <item.icon
                                        size={18}
                                        className="dropdown__icon"
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

export default Dropdown;