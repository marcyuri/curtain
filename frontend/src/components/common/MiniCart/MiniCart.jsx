import { useMemo } from "react";

import {
    ShoppingBag,
    X,
    Trash2,
    ArrowRight,
} from "lucide-react";

import Button from "../../ui/Button";
import Drawer from "../../ui/Drawer";

import "./MiniCart.css";

const MiniCart = ({
    open = false,

    items = [],

    onClose,

    onRemove,

    onCart,

    onCheckout,
}) => {

    const subtotal = useMemo(() => items.reduce(

            (sum, item) =>

                sum +
                item.price *
                item.quantity,

            0

        ), [items]);

    return (

        <Drawer
            open={open}
            side="right"
            onClose={onClose}
        >

            <section className="mini-cart">

                <header className="mini-cart__header">

                    <div>

                        <ShoppingBag size={22} />

                        <h2>

                            Mon panier

                        </h2>

                    </div>

                    <button
                        onClick={onClose}
                    >
                        <X />
                    </button>

                </header>

                <div className="mini-cart__content">

                    {items.length === 0 && (

                        <div className="mini-cart__empty">

                            <ShoppingBag size={60} />

                            <h3>

                                Votre panier est vide

                            </h3>

                            <p>

                                Ajoutez des produits pour commencer vos achats.

                            </p>

                        </div>

                    )}

                    {items.map(item => (

                        <article
                            key={item.id}
                            className="mini-cart__item"
                        >

                            <img
                                src={item.image}
                                alt={item.name}
                            />

                            <div>

                                <h4>

                                    {item.name}

                                </h4>

                                <span>

                                    {item.quantity}
                                    ×
                                    {item.price.toLocaleString()}
                                    FCFA

                                </span>

                            </div>

                            <button
                                onClick={() =>

                                    onRemove?.(item)

                                }
                            >

                                <Trash2 size={18} />

                            </button>

                        </article>

                    ))}

                </div>

                <footer className="mini-cart__footer">

                    <div className="mini-cart__subtotal">

                        <span>

                            Sous-total

                        </span>

                        <strong>

                            {subtotal.toLocaleString()}
                            FCFA

                        </strong>

                    </div>

                    <Button
                        variant="outline"
                        fullWidth
                        onClick={onCart}
                    >

                        Voir le panier

                    </Button>

                    <Button
                        fullWidth
                        onClick={onCheckout}
                    >

                        Commander

                        <ArrowRight size={18} />

                    </Button>

                </footer>

            </section>

        </Drawer>

    );

};

export default MiniCart;