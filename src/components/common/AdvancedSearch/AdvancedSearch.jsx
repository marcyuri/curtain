import { useEffect, useMemo, useState } from "react";
import {
    Search,
    X,
    Mic,
    Filter,
    Clock,
    Command,
} from "lucide-react";

import Input from "../../ui/Input";
import Button from "../../ui/Button";

import "./AdvancedSearch.css";

const DEFAULT_CATEGORIES = [
    "Tous",
    "Produits",
    "Consultations",
    "Événements",
    "Articles",
    "Psychologues",
];

const AdvancedSearch = ({
    data = [],
    categories = DEFAULT_CATEGORIES,
    placeholder = "Rechercher...",
    history = [],
    onSearch,
    onVoiceSearch,
    onSelect,
}) => {

    const [query, setQuery] = useState("");

    const [category, setCategory] = useState("Tous");

    const results = useMemo(() => {

        let list = [...data];

        if (category !== "Tous") {

            list = list.filter(
                item => item.category === category
            );

        }

        if (!query) {return list;}

        return list.filter(item =>

            item.title
                .toLowerCase()
                .includes(query.toLowerCase()) ||

            item.description
                ?.toLowerCase()
                .includes(query.toLowerCase())

        );

    }, [data, category, query]);

    useEffect(() => {

        const shortcut = event => {

            if (
                event.ctrlKey &&
                event.key.toLowerCase() === "k"
            ) {

                event.preventDefault();

                document
                    .querySelector(".advanced-search input")
                    ?.focus();

            }

        };

        window.addEventListener(
            "keydown",
            shortcut
        );

        return () =>
            window.removeEventListener(
                "keydown",
                shortcut
            );

    }, []);

    useEffect(() => {

        onSearch?.(query);

    }, [query]);

    return (

        <div className="advanced-search">

            <div className="advanced-search__top">

                <div className="advanced-search__input">

                    <Search size={18} />

                    <Input
                        value={query}
                        placeholder={placeholder}
                        onChange={e =>
                            setQuery(e.target.value)
                        }
                    />

                    {query && (

                        <button
                            onClick={() =>
                                setQuery("")
                            }
                        >
                            <X size={18} />
                        </button>

                    )}

                </div>

                <Button
                    variant="outline"
                    onClick={onVoiceSearch}
                >
                    <Mic size={18} />
                </Button>

            </div>

            <div className="advanced-search__filters">

                <Filter size={16} />

                {categories.map(item => (

                    <button

                        key={item}

                        className={
                            category === item
                                ? "active"
                                : ""
                        }

                        onClick={() =>
                            setCategory(item)
                        }

                    >

                        {item}

                    </button>

                ))}

            </div>

            {!query && history.length > 0 && (

                <div className="advanced-search__history">

                    <Clock size={16} />

                    {history.map(item => (

                        <button
                            key={item}
                            onClick={() =>
                                setQuery(item)
                            }
                        >

                            {item}

                        </button>

                    ))}

                </div>

            )}

            <div className="advanced-search__results">

                {results.map(item => (

                    <button

                        key={item.id}

                        className="advanced-search__result"

                        onClick={() =>
                            onSelect?.(item)
                        }

                    >

                        <span>

                            {item.category}

                        </span>

                        <strong>

                            {item.title}

                        </strong>

                        <p>

                            {item.description}

                        </p>

                    </button>

                ))}

            </div>

            <div className="advanced-search__footer">

                <Command size={16} />

                Ctrl + K

            </div>

        </div>

    );

};

export default AdvancedSearch;