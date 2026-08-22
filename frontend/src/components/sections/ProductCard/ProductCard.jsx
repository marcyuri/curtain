import {
    Heart,
    Eye,
    ShoppingCart,
    GitCompareArrows,
    Star,
    BadgePercent,
} from "lucide-react";

import Button from "../../ui/Button";
import ImageWithFallback from "../../common/ImageWithFallback";

import "./ProductCard.css";

function ProductCard({

    id,

    name,

    description,

    image,

    price,

    oldPrice,

    rating = 5,

    reviews = 0,

    stock = true,

    badge,

    onAddToCart,

    onWishlist,

    onCompare,

    onQuickView,

}) {

    return (

        <article className="product-card">

            {badge && (

                <span className="product-card__badge">

                    <BadgePercent size={14} />

                    {badge}

                </span>

            )}

            <div className="product-card__image">

                <ImageWithFallback

                    src={image}

                    alt={name}

                />

                <div className="product-card__overlay">

                    <button

                        onClick={() => onWishlist?.(id)}

                        title="Favoris"

                    >

                        <Heart size={18} />

                    </button>

                    <button

                        onClick={() => onCompare?.(id)}

                        title="Comparer"

                    >

                        <GitCompareArrows size={18} />

                    </button>

                    <button

                        onClick={() => onQuickView?.(id)}

                        title="Aperçu"

                    >

                        <Eye size={18} />

                    </button>

                </div>

            </div>

            <div className="product-card__content">

                <div className="product-card__rating">

                    <Star
                        size={16}
                        fill="currentColor"
                    />

                    <span>

                        {rating}

                    </span>

                    <small>

                        ({reviews})

                    </small>

                </div>

                <h3>

                    {name}

                </h3>

                <p>

                    {description}

                </p>

                <div className="product-card__price">

                    <strong>

                        {price}

                    </strong>

                    {oldPrice && (

                        <span>

                            {oldPrice}

                        </span>

                    )}

                </div>

                <div className="product-card__stock">

                    {stock

                        ? "En stock"

                        : "Rupture de stock"}

                </div>

            </div>

            <footer className="product-card__footer">

                <Button

                    disabled={!stock}

                    onClick={() =>

                        onAddToCart?.(id)

                    }

                >

                    <ShoppingCart size={18} />

                    Ajouter au panier

                </Button>

            </footer>

        </article>

    );

}

export default ProductCard;