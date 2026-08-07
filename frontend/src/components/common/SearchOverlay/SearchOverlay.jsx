import { useEffect, useMemo, useRef, useState } from "react";

import {
    Search,
    X,
    Clock3,
    ArrowRight,
} from "lucide-react";

import "./SearchOverlay.css";

const STORAGE_KEY = "recent-searches";

function SearchOverlay({

    open = false,

    items = [],

    placeholder = "Rechercher...",

    onClose,

    onSearch,

    onSelect,

}) {

    const inputRef = useRef(null);

    const [query, setQuery] = useState("");

    const [history, setHistory] = useState([]);

    useEffect(() => {

        if (open) {

            inputRef.current?.focus();

        }

    }, [open]);

    useEffect(() => {

        const saved = localStorage.getItem(STORAGE_KEY);

        if (saved) {

            setHistory(JSON.parse(saved));

        }

    }, []);

    const results = useMemo(() => {

        if (!query.trim()) {

            return [];

        }

        return items.filter((item) =>

            item.label
                .toLowerCase()
                .includes(query.toLowerCase())

        );

    }, [items, query]);

    const saveHistory = (value) => {

        if (!value.trim()) {

            return;

        }

        const next = [

            value,

            ...history.filter(

                (item) => item !== value

            ),

        ].slice(0, 8);

        setHistory(next);

        localStorage.setItem(

            STORAGE_KEY,

            JSON.stringify(next)

        );

    };

    const handleSearch = (value) => {

        setQuery(value);

        onSearch?.(value);

    };

    const handleSelect = (item) => {

        saveHistory(item.label);

        onSelect?.(item);

        onClose?.();

    };

    if (!open) {

        return null;

    }

    return (

        <div className="search-overlay">

            <div className="search-overlay__backdrop" />

            <div className="search-overlay__panel">

                <header className="search-overlay__header">

                    <div className="search-overlay__input">

                        <Search size={20} />

                        <input

                            ref={inputRef}

                            value={query}

                            placeholder={placeholder}

                            onChange={(e) =>

                                handleSearch(

                                    e.target.value

                                )

                            }

                        />

                    </div>

                    <button

                        onClick={onClose}

                    >

                        <X size={22} />

                    </button>

                </header>

                {!query && history.length > 0 && (

                    <section className="search-overlay__history">

                        <h4>

                            Recherches récentes

                        </h4>

                        {history.map((item) => (

                            <button

                                key={item}

                                onClick={() =>

                                    setQuery(item)

                                }

                            >

                                <Clock3 size={16} />

                                {item}

                            </button>

                        ))}

                    </section>

                )}

                <div className="search-overlay__results">

                    {results.map((item) => (

                        <button

                            key={item.id}

                            className="search-overlay__result"

                            onClick={() =>

                                handleSelect(item)

                            }

                        >

                            <div>

                                <strong>

                                    {item.label}

                                </strong>

                                <small>

                                    {item.category}

                                </small>

                            </div>

                            <ArrowRight size={18} />

                        </button>

                    ))}

                    {query &&

                        results.length === 0 && (

                            <div className="search-overlay__empty">

                                Aucun résultat trouvé.

                            </div>

                        )}

                </div>

            </div>

        </div>

    );

}

export default SearchOverlay;