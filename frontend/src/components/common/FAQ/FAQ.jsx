import { useMemo, useState } from "react";
import {
    Search,
    ChevronDown,
    ChevronUp
} from "lucide-react";

import Input from "../../ui/Input";
import Badge from "../../ui/Badge";
import EmptyState from "../../ui/EmptyState";

import "./FAQ.css";

function FAQ({

    items = [],

    categories = [],

    multiple = false,

    defaultCategory = "Toutes",

    className = ""

}) {

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState(defaultCategory);

    const [opened, setOpened] = useState([]);

    const filtered = useMemo(() => items.filter(item => {

            const categoryMatch =
                category === "Toutes" ||
                item.category === category;

            const query = search.toLowerCase();

            const searchMatch =
                item.question.toLowerCase().includes(query) ||
                item.answer.toLowerCase().includes(query);

            return categoryMatch && searchMatch;

        }), [items, category, search]);

    const toggle = id => {

        if (multiple) {

            setOpened(previous =>

                previous.includes(id)

                    ? previous.filter(item => item !== id)

                    : [...previous, id]

            );

            return;

        }

        setOpened(previous =>

            previous.includes(id)

                ? []

                : [id]

        );

    };

    return (

        <section className={`faq ${className}`}>

            <div className="faq__toolbar">

                <Input

                    placeholder="Rechercher une question..."

                    value={search}

                    onChange={event =>

                        setSearch(event.target.value)

                    }

                    leftIcon={<Search size={18} />}

                />

                <div className="faq__categories">

                    {["Toutes", ...categories].map(item => (

                        <button

                            key={item}

                            className={

                                item === category

                                    ? "faq__category faq__category--active"

                                    : "faq__category"

                            }

                            onClick={() =>

                                setCategory(item)

                            }

                        >

                            {item}

                        </button>

                    ))}

                </div>

            </div>

            {filtered.length === 0 && (

                <EmptyState

                    title="Aucun résultat"

                    description="Aucune question ne correspond à votre recherche."

                />

            )}

            <div className="faq__list">

                {filtered.map(item => {

                    const isOpen = opened.includes(item.id);

                    return (

                        <article

                            key={item.id}

                            className="faq__item"

                        >

                            <button

                                className="faq__question"

                                onClick={() =>

                                    toggle(item.id)

                                }

                            >

                                <div>

                                    <h3>

                                        {item.question}

                                    </h3>

                                    <Badge>

                                        {item.category}

                                    </Badge>

                                </div>

                                {

                                    isOpen

                                        ? <ChevronUp size={20} />

                                        : <ChevronDown size={20} />

                                }

                            </button>

                            {isOpen && (

                                <div className="faq__answer">

                                    <p>

                                        {item.answer}

                                    </p>

                                    {item.link && (

                                        <a

                                            href={item.link}

                                        >

                                            En savoir plus

                                        </a>

                                    )}

                                </div>

                            )}

                        </article>

                    );

                })}

            </div>

        </section>

    );

}

export default FAQ;