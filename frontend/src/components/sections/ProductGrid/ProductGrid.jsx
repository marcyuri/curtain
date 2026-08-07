import { useMemo, useState } from "react";

import {
    Search,
    SlidersHorizontal,
} from "lucide-react";

import ProductCard from "../ProductCard";

import "./ProductGrid.css";

function ProductGrid({

    title = "Notre Boutique",

    description = "Découvrez nos vêtements et produits.",

    products = [],

    onAddToCart,

    onWishlist,

    onCompare,

    onQuickView,

}) {

    const [search, setSearch] = useState("");

    const [category, setCategory] = useState("Toutes");

    const categories = useMemo(() => [

            "Toutes",

            ...new Set(

                products.map(

                    (product) => product.category

                )

            ),

        ], [products]);

    const filteredProducts = useMemo(() => products.filter((product) => {

            const matchesSearch =

                product.name
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchesCategory =

                category === "Toutes"

                ||

                product.category === category;

            return (

                matchesSearch &&

                matchesCategory

            );

        }), [

        products,

        search,

        category,

    ]);

    return (

        <section className="product-grid">

            <header className="product-grid__header">

                <h2>

                    {title}

                </h2>

                <p>

                    {description}

                </p>

            </header>

            <div className="product-grid__toolbar">

                <div className="product-grid__search">

                    <Search size={18} />

                    <input

                        type="search"

                        placeholder="Rechercher un produit..."

                        value={search}

                        onChange={(event) =>

                            setSearch(

                                event.target.value

                            )

                        }

                    />

                </div>

                <div className="product-grid__filter">

                    <SlidersHorizontal size={18} />

                    <select

                        value={category}

                        onChange={(event) =>

                            setCategory(

                                event.target.value

                            )

                        }

                    >

                        {categories.map(

                            (item) => (

                                <option

                                    key={item}

                                >

                                    {item}

                                </option>

                            )

                        )}

                    </select>

                </div>

            </div>

            <div className="product-grid__content">

                {filteredProducts.map(

                    (product) => (

                        <ProductCard

                            key={product.id}

                            {...product}

                            onAddToCart={

                                onAddToCart

                            }

                            onWishlist={

                                onWishlist

                            }

                            onCompare={

                                onCompare

                            }

                            onQuickView={

                                onQuickView

                            }

                        />

                    )

                )}

            </div>

            {

                filteredProducts.length === 0 && (

                    <div className="product-grid__empty">

                        Aucun produit trouvé.

                    </div>

                )

            }

        </section>

    );

}

export default ProductGrid;