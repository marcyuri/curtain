import { useEffect, useState } from "react";

import {
    Filter,
    RotateCcw,
} from "lucide-react";

import Button from "../../ui/Button";

import "./CategoryFilter.css";

function CategoryFilter({

    categories = [],

    brands = [],

    colors = [],

    sizes = [],

    filters = {},

    onChange,

}) {

    const [state, setState] = useState({

        category: "",

        brand: "",

        color: "",

        size: "",

        stock: "",

        minPrice: "",

        maxPrice: "",

        ...filters,

    });

    useEffect(() => {

        setState({

            category: "",

            brand: "",

            color: "",

            size: "",

            stock: "",

            minPrice: "",

            maxPrice: "",

            ...filters,

        });

    }, [filters]);

    const update = (key, value) => {

        const next = {

            ...state,

            [key]: value,

        };

        setState(next);

        onChange?.(next);

    };

    const reset = () => {

        const next = {

            category: "",

            brand: "",

            color: "",

            size: "",

            stock: "",

            minPrice: "",

            maxPrice: "",

        };

        setState(next);

        onChange?.(next);

    };

    return (

        <aside className="category-filter">

            <header className="category-filter__header">

                <Filter size={22} />

                <h3>

                    Filtres

                </h3>

            </header>

            <div className="category-filter__group">

                <label>

                    Catégorie

                </label>

                <select

                    value={state.category}

                    onChange={(event) =>

                        update(

                            "category",

                            event.target.value

                        )

                    }

                >

                    <option value="">

                        Toutes

                    </option>

                    {categories.map((item) => (

                        <option

                            key={item}

                            value={item}

                        >

                            {item}

                        </option>

                    ))}

                </select>

            </div>

            <div className="category-filter__group">

                <label>

                    Marque

                </label>

                <select

                    value={state.brand}

                    onChange={(event) =>

                        update(

                            "brand",

                            event.target.value

                        )

                    }

                >

                    <option value="">

                        Toutes

                    </option>

                    {brands.map((item) => (

                        <option

                            key={item}

                            value={item}

                        >

                            {item}

                        </option>

                    ))}

                </select>

            </div>

            <div className="category-filter__group">

                <label>

                    Couleur

                </label>

                <select

                    value={state.color}

                    onChange={(event) =>

                        update(

                            "color",

                            event.target.value

                        )

                    }

                >

                    <option value="">

                        Toutes

                    </option>

                    {colors.map((item) => (

                        <option

                            key={item}

                            value={item}

                        >

                            {item}

                        </option>

                    ))}

                </select>

            </div>

            <div className="category-filter__group">

                <label>

                    Taille

                </label>

                <select

                    value={state.size}

                    onChange={(event) =>

                        update(

                            "size",

                            event.target.value

                        )

                    }

                >

                    <option value="">

                        Toutes

                    </option>

                    {sizes.map((item) => (

                        <option

                            key={item}

                            value={item}

                        >

                            {item}

                        </option>

                    ))}

                </select>

            </div>

            <div className="category-filter__prices">

                <div>

                    <label>

                        Prix min

                    </label>

                    <input

                        type="number"

                        value={state.minPrice}

                        onChange={(event) =>

                            update(

                                "minPrice",

                                event.target.value

                            )

                        }

                    />

                </div>

                <div>

                    <label>

                        Prix max

                    </label>

                    <input

                        type="number"

                        value={state.maxPrice}

                        onChange={(event) =>

                            update(

                                "maxPrice",

                                event.target.value

                            )

                        }

                    />

                </div>

            </div>

            <div className="category-filter__group">

                <label>

                    Disponibilité

                </label>

                <select

                    value={state.stock}

                    onChange={(event) =>

                        update(

                            "stock",

                            event.target.value

                        )

                    }

                >

                    <option value="">

                        Toutes

                    </option>

                    <option value="stock">

                        En stock

                    </option>

                    <option value="out">

                        Rupture

                    </option>

                </select>

            </div>

            <Button

                variant="outline"

                onClick={reset}

            >

                <RotateCcw size={18} />

                Réinitialiser

            </Button>

        </aside>

    );

}

export default CategoryFilter;