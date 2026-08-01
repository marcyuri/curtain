import { useMemo, useState } from "react";

import {
    ChevronDown,
    Search,
} from "lucide-react";

import "./FAQAccordion.css";

function FAQAccordion({

    title = "Questions fréquentes",

    subtitle = "FAQ",

    searchable = true,

    allowMultiple = false,

    items = [],

}) {

    const [openedItems, setOpenedItems] = useState([]);

    const [search, setSearch] = useState("");

    const filteredItems = useMemo(() => {

        if (!search.trim()) {

            return items;

        }

        return items.filter((item) => {

            return (

                item.question
                    .toLowerCase()
                    .includes(search.toLowerCase())

                ||

                item.answer
                    .toLowerCase()
                    .includes(search.toLowerCase())

            );

        });

    }, [

        items,

        search,

    ]);

    const toggle = (index) => {

        if (allowMultiple) {

            setOpenedItems((previous) =>

                previous.includes(index)

                    ? previous.filter(

                        (item) => item !== index

                    )

                    : [

                        ...previous,

                        index,

                    ]

            );

            return;

        }

        setOpenedItems((previous) =>

            previous[0] === index

                ? []

                : [index]

        );

    };

    return (

        <section className="faq">

            <header className="faq__header">

                <span>

                    {subtitle}

                </span>

                <h2>

                    {title}

                </h2>

            </header>

            {

                searchable && (

                    <div className="faq__search">

                        <Search size={18} />

                        <input

                            type="search"

                            placeholder="Rechercher une question..."

                            value={search}

                            onChange={(event) =>

                                setSearch(

                                    event.target.value

                                )

                            }

                        />

                    </div>

                )

            }

            <div className="faq__list">

                {

                    filteredItems.map(

                        (item, index) => {

                            const opened =

                                openedItems.includes(index);

                            return (

                                <article

                                    key={item.question}

                                    className="faq__item"

                                >

                                    <button

                                        type="button"

                                        className="faq__question"

                                        onClick={() =>

                                            toggle(index)

                                        }

                                    >

                                        <span>

                                            {item.question}

                                        </span>

                                        <ChevronDown

                                            size={20}

                                            className={

                                                opened

                                                    ? "faq__icon faq__icon--opened"

                                                    : "faq__icon"

                                            }

                                        />

                                    </button>

                                    {

                                        opened && (

                                            <div className="faq__answer">

                                                <p>

                                                    {item.answer}

                                                </p>

                                            </div>

                                        )

                                    }

                                </article>

                            );

                        }

                    )

                }

            </div>

        </section>

    );

}

export default FAQAccordion;