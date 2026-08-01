import { useMemo, useState } from "react";
import "./ProductsSection.css";

import Input from "../../form/Input";
import Select from "../../form/Select";
import Button from "../../form/Button";
import ProductCard from "../ProductCard";

const SORT_OPTIONS = [
    { label: "Popularité", value: "popular" },
    { label: "Prix croissant", value: "priceAsc" },
    { label: "Prix décroissant", value: "priceDesc" },
    { label: "Nouveautés", value: "newest" },
];

const ProductsSection = ({
    title = "Nos produits",
    subtitle,
    products = [],
    categories = [],
    searchable = true,
    filterable = true,
    sortable = true,
    carousel = false,
    limit,
    showMoreLabel = "Voir toute la boutique",
    onShowMore,
}) => {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("popular");

    const filteredProducts = useMemo(() => {
        let list = [...products];

        if (category !== "all") {
            list = list.filter(
                (product) => product.category === category
            );
        }

        if (search) {
            list = list.filter((product) =>
                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase())
            );
        }

        switch (sort) {
            case "priceAsc":
                list.sort((a, b) => a.price - b.price);
                break;

            case "priceDesc":
                list.sort((a, b) => b.price - a.price);
                break;

            case "newest":
                list.sort(
                    (a, b) =>
                        new Date(b.createdAt) -
                        new Date(a.createdAt)
                );
                break;

            default:
                list.sort(
                    (a, b) => b.popularity - a.popularity
                );
        }

        return list;
    }, [products, search, category, sort]);

    const displayedProducts = limit
        ? filteredProducts.slice(0, limit)
        : filteredProducts;

    return (
        <section className="products-section">
            <header className="products-section__header">
                <h2>{title}</h2>

                {subtitle && <p>{subtitle}</p>}
            </header>

            <div className="products-section__toolbar">
                {searchable && (
                    <Input
                        placeholder="Rechercher un produit..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                )}

                {filterable && (
                    <Select
                        value={category}
                        onChange={(e) =>
                            setCategory(e.target.value)
                        }
                        options={[
                            {
                                label: "Toutes les catégories",
                                value: "all",
                            },
                            ...categories.map((item) => ({
                                label: item,
                                value: item,
                            })),
                        ]}
                    />
                )}

                {sortable && (
                    <Select
                        value={sort}
                        onChange={(e) =>
                            setSort(e.target.value)
                        }
                        options={SORT_OPTIONS}
                    />
                )}
            </div>

            <div
                className={`products-section__content ${carousel
                        ? "products-section__content--carousel"
                        : ""
                    }`}
            >
                {displayedProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        {...product}
                    />
                ))}
            </div>

            {limit &&
                filteredProducts.length > limit &&
                onShowMore && (
                    <div className="products-section__footer">
                        <Button onClick={onShowMore}>
                            {showMoreLabel}
                        </Button>
                    </div>
                )}
        </section>
    );
};

export default ProductsSection;