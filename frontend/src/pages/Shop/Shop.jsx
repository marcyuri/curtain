import Hero from "../../components/sections/Hero";
import CategoryFilter from "../../components/sections/CategoryFilter";
import ProductGrid from "../../components/sections/ProductGrid";
import CTASection from "../../components/sections/CTASection";

import {

    products,

    categories,

    brands,

    colors,

    sizes,

} from "./data";

import "./Shop.css";

function Shop() {

    return (

        <main className="shop-page">

            <Hero

                subtitle="Boutique"

                title="Découvrez notre boutique"

                description="Retrouvez une sélection de vêtements et d'articles soigneusement choisis par LOVE CAN BUILD."

                primaryLabel="Voir les nouveautés"

                secondaryLabel="Nous contacter"

            />

            <section className="shop-page__content">

                <aside className="shop-page__sidebar">

                    <CategoryFilter

                        categories={categories}

                        brands={brands}

                        colors={colors}

                        sizes={sizes}

                    />

                </aside>

                <section className="shop-page__products">

                    <ProductGrid

                        title="Tous nos produits"

                        description="Des produits de qualité pour vous accompagner au quotidien."

                        products={products}

                    />

                </section>

            </section>

            <CTASection />

        </main>

    );

}

export default Shop;