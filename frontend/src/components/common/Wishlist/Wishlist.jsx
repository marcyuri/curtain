import { useMemo } from "react";
import {
    Heart,
    ShoppingCart,
    Trash2,
    Share2,
    Bell,
    TrendingDown,
    PackageCheck,
} from "lucide-react";

import Button from "../../ui/Button";

import "./Wishlist.css";

function Wishlist({

    items = [],

    onRemove,

    onAddToCart,

    onShare,

    onNotify,

}) {

    const totalItems = useMemo(
        () => items.length,
        [items]
    );

    return (

        <section className="wishlist">

            <header className="wishlist__header">

                <div>

                    <Heart size={22} />

                    <h2>

                        Ma liste de souhaits

                    </h2>

                </div>

                <span>

                    {totalItems}

                    {" "}articles

                </span>

            </header>

            {items.length === 0 && (

                <div className="wishlist__empty">

                    <Heart size={60} />

                    <h3>

                        Votre liste est vide

                    </h3>

                    <p>

                        Ajoutez des produits à vos favoris.

                    </p>

                </div>

            )}

            <div className="wishlist__grid">

                {items.map(item => (

                    <article

                        key={item.id}

                        className="wishlist__card"

                    >

                        <img

                            src={item.image}

                            alt={item.name}

                        />

                        <div className="wishlist__body">

                            <h3>

                                {item.name}

                            </h3>

                            <p>

                                {item.description}

                            </p>

                            <div className="wishlist__price">

                                <strong>

                                    {item.price.toLocaleString()} FCFA

                                </strong>

                                {item.oldPrice && (

                                    <span>

                                        {item.oldPrice.toLocaleString()} FCFA

                                    </span>

                                )}

                            </div>

                            <div className="wishlist__status">

                                {item.inStock ? (

                                    <span className="wishlist__stock">

                                        <PackageCheck size={16} />

                                        En stock

                                    </span>

                                ) : (

                                    <Button

                                        variant="ghost"

                                        onClick={() =>

                                            onNotify?.(item)

                                        }

                                    >

                                        <Bell size={16} />

                                        M&apos;avertir

                                    </Button>

                                )}

                                {item.priceDropped && (

                                    <span className="wishlist__drop">

                                        <TrendingDown size={16} />

                                        Prix en baisse

                                    </span>

                                )}

                            </div>

                        </div>

                        <div className="wishlist__actions">

                            <Button

                                onClick={() =>

                                    onAddToCart?.(item)

                                }

                            >

                                <ShoppingCart size={18} />

                                Ajouter

                            </Button>

                            <Button

                                variant="outline"

                                onClick={() =>

                                    onShare?.(item)

                                }

                            >

                                <Share2 size={18} />

                            </Button>

                            <Button

                                variant="ghost"

                                onClick={() =>

                                    onRemove?.(item)

                                }

                            >

                                <Trash2 size={18} />

                            </Button>

                        </div>

                    </article>

                ))}

            </div>

        </section>

    );

}

export default Wishlist;