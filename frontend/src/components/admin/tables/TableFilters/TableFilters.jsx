import {

    Filter,

    RotateCcw,

    Search,

} from "lucide-react";

import "./TableFilters.css";

function TableFilters({

    filters = [],

    values = {},

    onChange,

    onReset,

    onApply,

}) {

    return (

        <aside className="table-filters">

            <header className="table-filters__header">

                <div>

                    <Filter size={20} />

                    <h3>

                        Filtres

                    </h3>

                </div>

                <button

                    type="button"

                    onClick={onReset}

                >

                    <RotateCcw size={18} />

                    Réinitialiser

                </button>

            </header>

            <div className="table-filters__body">

                {

                    filters.map((filter) => (

                        <div

                            key={filter.name}

                            className="table-filters__field"

                        >

                            <label>

                                {filter.label}

                            </label>

                            {

                                filter.type === "text" && (

                                    <div className="table-filters__input">

                                        <Search size={18} />

                                        <input

                                            value={

                                                values[filter.name] || ""

                                            }

                                            placeholder={

                                                filter.placeholder

                                            }

                                            onChange={(event) =>

                                                onChange?.(

                                                    filter.name,

                                                    event.target.value

                                                )

                                            }

                                        />

                                    </div>

                                )

                            }

                            {

                                filter.type === "select" && (

                                    <select

                                        value={

                                            values[filter.name] || ""

                                        }

                                        onChange={(event) =>

                                            onChange?.(

                                                filter.name,

                                                event.target.value

                                            )

                                        }

                                    >

                                        <option value="">

                                            Tous

                                        </option>

                                        {

                                            filter.options.map((option) => (

                                                <option

                                                    key={option.value}

                                                    value={option.value}

                                                >

                                                    {option.label}

                                                </option>

                                            ))

                                        }

                                    </select>

                                )

                            }

                            {

                                filter.type === "date" && (

                                    <input

                                        type="date"

                                        value={

                                            values[filter.name] || ""

                                        }

                                        onChange={(event) =>

                                            onChange?.(

                                                filter.name,

                                                event.target.value

                                            )

                                        }

                                    />

                                )

                            }

                            {

                                filter.type === "number" && (

                                    <input

                                        type="number"

                                        value={

                                            values[filter.name] || ""

                                        }

                                        onChange={(event) =>

                                            onChange?.(

                                                filter.name,

                                                event.target.value

                                            )

                                        }

                                    />

                                )

                            }

                        </div>

                    ))

                }

            </div>

            <footer className="table-filters__footer">

                <button

                    type="button"

                    className="table-filters__apply"

                    onClick={onApply}

                >

                    Appliquer

                </button>

            </footer>

        </aside>

    );

}

export default TableFilters;