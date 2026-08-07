import { useState } from "react";
import { ChevronDown } from "lucide-react";
import "./Accordion.css";

function Accordion({
    items = [],
    multiple = false,
    defaultOpen = [],
    className = ""
}) {

    const [openItems, setOpenItems] = useState(defaultOpen);

    const toggleItem = (value) => {

        const isOpen = openItems.includes(value);

        if (multiple) {

            if (isOpen) {

                setOpenItems(openItems.filter(item => item !== value));

            } else {

                setOpenItems([...openItems, value]);

            }

        } else {

            setOpenItems(isOpen ? [] : [value]);

        }

    };

    return (

        <div className={`accordion ${className}`}>

            {items.map((item) => {

                const isOpen = openItems.includes(item.value);

                return (

                    <div
                        key={item.value}
                        className="accordion__item"
                    >

                        <button
                            type="button"
                            className={`accordion__header ${isOpen
                                    ? "accordion__header--open"
                                    : ""
                                }`}
                            onClick={() => toggleItem(item.value)}
                        >

                            <span>

                                {item.title}

                            </span>

                            <ChevronDown
                                size={18}
                                className={`accordion__icon ${isOpen
                                        ? "accordion__icon--open"
                                        : ""
                                    }`}
                            />

                        </button>

                        <div
                            className={`accordion__content ${isOpen
                                    ? "accordion__content--open"
                                    : ""
                                }`}
                        >

                            <div className="accordion__body">

                                {item.content}

                            </div>

                        </div>

                    </div>

                );

            })}

        </div>

    );

}

export default Accordion;