import {

    RotateCcw,

} from "lucide-react";

import {

    statusOptions,

    categoryOptions,

    stockOptions,

} from "./filterOptions";

import "./ProductFilters.css";

function ProductFilters({

    filters,

    onChange,

    onReset,

}) {

    const update = ({ target }) => {

        onChange?.({

            ...filters,

            [target.name]: target.value,

        });

    };

    return (

        <section className="product-filters">

            <div className="product-filters__grid">

                <label>

                    <span>

                        Statut

                    </span>

                    <select

                        name="status"

                        value={filters.status}

                        onChange={update}

                    >

                        {

                            statusOptions.map((option) => (

                                <option

                                    key={option.value}

                                    value={option.value}

                                >

                                    {option.label}

                                </option>

                            ))

                        }

                    </select>

                </label>

                <label>

                    <span>

                        Catégorie

                    </span>

                    <select

                        name="category"

                        value={filters.category}

                        onChange={update}

                    >

                        {

                            categoryOptions.map((option) => (

                                <option

                                    key={option.value}

                                    value={option.value}

                                >

                                    {option.label}

                                </option>

                            ))

                        }

                    </select>

                </label>

                <label>

                    <span>

                        Stock

                    </span>

                    <select

                        name="stock"

                        value={filters.stock}

                        onChange={update}

                    >

                        {

                            stockOptions.map((option) => (

                                <option

                                    key={option.value}

                                    value={option.value}

                                >

                                    {option.label}

                                </option>

                            ))

                        }

                    </select>

                </label>

            </div>

            <button

                onClick={onReset}

            >

                <RotateCcw size={18} />

                Réinitialiser

            </button>

        </section>

    );

}

export default ProductFilters;