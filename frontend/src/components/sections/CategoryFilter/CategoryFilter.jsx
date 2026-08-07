import { useEffect, useState } from "react";

import {
    Filter,
    RotateCcw,
} from "lucide-react";

import Button from "@components/ui/Button";

import { DEFAULT_FILTERS } from "./constants/defaultFilters";
import FilterSelect from "./components/FilterSelect";
import PriceRangeInputs from "./components/PriceRangeInputs";

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
        ...DEFAULT_FILTERS,
        ...filters,
    });

    useEffect(() => {

        setState({
            ...DEFAULT_FILTERS,
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

        setState(DEFAULT_FILTERS);

        onChange?.(DEFAULT_FILTERS);

    };

    return (

        <aside className="category-filter">

            <header className="category-filter__header">

                <Filter size={22} />

                <h3>
                    Filtres
                </h3>

            </header>

            <FilterSelect
                label="Catégorie"
                value={state.category}
                options={categories}
                onChange={(value) => update("category", value)}
            />

            <FilterSelect
                label="Marque"
                value={state.brand}
                options={brands}
                onChange={(value) => update("brand", value)}
            />

            <FilterSelect
                label="Couleur"
                value={state.color}
                options={colors}
                onChange={(value) => update("color", value)}
            />

            <FilterSelect
                label="Taille"
                value={state.size}
                options={sizes}
                onChange={(value) => update("size", value)}
            />

            <PriceRangeInputs
                minPrice={state.minPrice}
                maxPrice={state.maxPrice}
                onMinChange={(value) => update("minPrice", value)}
                onMaxChange={(value) => update("maxPrice", value)}
            />

            <FilterSelect
                label="Disponibilité"
                value={state.stock}
                options={[
                    { value: "stock", label: "En stock" },
                    { value: "out", label: "Rupture" },
                ]}
                onChange={(value) => update("stock", value)}
            />

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
