import { useEffect, useState } from "react";

import {
    Search,
    Filter,
    RotateCcw,
} from "lucide-react";

import Button from "../../form/Button";

import "./DataFilters.css";

function DataFilters({

    filters = [],

    values = {},

    searchPlaceholder = "Rechercher...",

    onChange,

    onReset,

}) {

    const [state, setState] = useState(values);

    useEffect(() => {

        setState(values);

    }, [values]);

    const updateValue = (key, value) => {

        const next = {

            ...state,

            [key]: value,

        };

        setState(next);

        onChange?.(next);

    };

    const reset = () => {

        const next = {};

        filters.forEach((filter) => {

            next[filter.name] = "";

        });

        setState(next);

        onReset?.();

        onChange?.(next);

    };

    return (

        <section className="data-filters">

            <div className="data-filters__search">

                <Search size={18} />

                <input

                    type="search"

                    placeholder={searchPlaceholder}

                    value={state.search || ""}

                    onChange={(event) =>

                        updateValue(

                            "search",

                            event.target.value

                        )

                    }

                />

            </div>

            <div className="data-filters__filters">

                {filters.map((filter) => (

                    <div

                        key={filter.name}

                        className="data-filters__field"

                    >

                        <label>

                            {filter.label}

                        </label>

                        <select

                            value={state[filter.name] || ""}

                            onChange={(event) =>

                                updateValue(

                                    filter.name,

                                    event.target.value

                                )

                            }

                        >

                            <option value="">

                                Tous

                            </option>

                            {filter.options.map((option) => (

                                <option

                                    key={option.value}

                                    value={option.value}

                                >

                                    {option.label}

                                </option>

                            ))}

                        </select>

                    </div>

                ))}

            </div>

            <div className="data-filters__actions">

                <Button

                    variant="outline"

                    onClick={reset}

                >

                    <RotateCcw size={18} />

                    Réinitialiser

                </Button>

                <Button>

                    <Filter size={18} />

                    Filtrer

                </Button>

            </div>

        </section>

    );

}

export default DataFilters;