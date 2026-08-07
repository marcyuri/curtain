import { useState } from "react";

import {
    Heart,
    ShoppingCart,
    Minus,
    Plus,
    Star,
    Truck,
    ShieldCheck,
    RotateCcw,
} from "lucide-react";

import ProductGrid from "../../components/sections/ProductGrid";
import CTASection from "../../components/sections/CTASection";

import {

    product,

    relatedProducts,

} from "./data";

import "./ProductDetails.css";

function ProductDetails() {

    const [quantity, setQuantity] = useState(1);

    const [selectedImage, setSelectedImage] = useState(

        product.images[0]

    );

    return (

        <main className="product-details">

            <section className="product-details__hero">

                <div className="product-details__gallery">

                    <img

                        className="product-details__main-image"

                        src={selectedImage}

                        alt={product.name}

                    />

                    <div className="product-details__thumbnails">

                        {

                            product.images.map((image) => (

                                <button

                                    key={image}

                                    onClick={() =>

                                        setSelectedImage(image)

                                    }

                                >

                                    <img

                                        src={image}

                                        alt="Produit"

                                    />

                                </button>

                            ))

                        }

                    </div>

                </div>

                <div className="product-details__content">

                    <span className="product-details__category">

                        {product.category}

                    </span>

                    <h1>

                        {product.name}

                    </h1>

                    <div className="product-details__rating">

                        <Star

                            size={18}

                            fill="currentColor"

                        />

                        {product.rating}

                        <small>

                            ({product.reviews} avis)

                        </small>

                    </div>

                    <div className="product-details__price">

                        <strong>

                            {product.price}

                        </strong>

                        <span>

                            {product.oldPrice}

                        </span>

                    </div>

                    <p>

                        {product.description}

                    </p>

                    <div className="product-details__sizes">

                        <h3>

                            Taille

                        </h3>

                        {

                            product.sizes.map((size) => (

                                <button

                                    key={size}

                                >

                                    {size}

                                </button>

                            ))

                        }

                    </div>

                    <div className="product-details__colors">

                        <h3>

                            Couleur

                        </h3>

                        {

                            product.colors.map((color) => (

                                <button

                                    key={color}

                                >

                                    {color}

                                </button>

                            ))

                        }

                    </div>

                    <div className="product-details__quantity">

                        <button

                            onClick={() =>

                                setQuantity(

                                    Math.max(

                                        1,

                                        quantity - 1

                                    )

                                )

                            }

                        >

                            <Minus size={16} />

                        </button>

                        <span>

                            {quantity}

                        </span>

                        <button

                            onClick={() =>

                                setQuantity(

                                    quantity + 1

                                )

                            }

                        >

                            <Plus size={16} />

                        </button>

                    </div>

                    <div className="product-details__actions">

                        <button>

                            <ShoppingCart size={18} />

                            Ajouter au panier

                        </button>

                        <button>

                            <Heart size={18} />

                        </button>

                    </div>

                    <div className="product-details__infos">

                        <div>

                            <Truck size={18} />

                            Livraison disponible

                        </div>

                        <div>

                            <ShieldCheck size={18} />

                            Paiement sécurisé

                        </div>

                        <div>

                            <RotateCcw size={18} />

                            Retour sous 14 jours

                        </div>

                    </div>

                </div>

            </section>

            <section className="product-details__related">

                <ProductGrid

                    title="Produits similaires"

                    description="Vous pourriez également aimer"

                    products={relatedProducts}

                />

            </section>

            <CTASection />

        </main>

    );

}

export default ProductDetails;