import { Heart, ShoppingBag, Star } from "lucide-react";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import "./ProductCard.css";

function ProductCard({

    product,

    onOrder,

    onFavorite,

    className = ""

}) {

    const {

        image,

        badge,

        category,

        name,

        description,

        price,

        oldPrice,

        stock,

        rating = 0

    } = product;

    return (

        <article
            className={`product-card ${className}`}
        >

            <div className="product-card__image-wrapper">

                {badge && (

                    <Badge
                        className="product-card__badge"
                    >

                        {badge}

                    </Badge>

                )}

                <button
                    className="product-card__favorite"
                    onClick={() => onFavorite?.(product)}
                    aria-label="Ajouter aux favoris"
                >

                    <Heart size={18} />

                </button>

                <img
                    src={image}
                    alt={name}
                    className="product-card__image"
                />

            </div>

            <div className="product-card__body">

                <span className="product-card__category">

                    {category}

                </span>

                <h3>

                    {name}

                </h3>

                <p>

                    {description}

                </p>

                <div className="product-card__rating">

                    <Star
                        size={16}
                        fill="currentColor"
                    />

                    <span>

                        {rating.toFixed(1)}

                    </span>

                </div>

                <div className="product-card__prices">

                    <span className="product-card__price">

                        {price}

                    </span>

                    {oldPrice && (

                        <span className="product-card__old-price">

                            {oldPrice}

                        </span>

                    )}

                </div>

                <span
                    className={`product-card__stock ${stock
                            ? "product-card__stock--available"
                            : "product-card__stock--unavailable"
                        }`}
                >

                    {stock
                        ? "Disponible"
                        : "Rupture de stock"}

                </span>

                <Button
                    fullWidth
                    disabled={!stock}
                    onClick={() => onOrder?.(product)}
                >

                    <ShoppingBag size={18} />

                    Commander

                </Button>

            </div>

        </article>

    );

}

export default ProductCard;