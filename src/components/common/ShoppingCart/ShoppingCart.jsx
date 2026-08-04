import { useMemo, useState } from "react";

import {
    ShoppingCart as ShoppingCartIcon,
    Trash2,
    Minus,
    Plus,
    Tag,
    Truck,
} from "lucide-react";

import Button from "../../ui/Button";
import Input from "../../ui/Input";

import "./ShoppingCart.css";

const SHIPPING = [
    {
        id: "standard",
        label: "Livraison Standard",
        price: 2500,
    },
    {
        id: "express",
        label: "Livraison Express",
        price: 5000,
    },
];

const ShoppingCart = ({
    items = [],

    taxRate = 0.1925,

    onQuantityChange,
    onRemove,
    onCheckout,
    onApplyCoupon,
}) => {

    const [coupon, setCoupon] = useState("");

    const [shipping, setShipping] = useState(
        SHIPPING[0]
    );

    const subtotal = useMemo(() => items.reduce(

            (sum, item) =>

                sum +
                item.price *
                item.quantity,

            0

        ), [items]);

    const taxes = subtotal * taxRate;

    const total =
        subtotal +
        taxes +
        shipping.price;

    return (

        <section className="shopping-cart">

            <header>

                <ShoppingCartIcon />

                <h2>

                    Mon panier

                </h2>

            </header>

            <div className="shopping-cart__items">

                {items.map(item => (

                    <article
                        key={item.id}
                        className="shopping-cart__item"
                    >

                        <img
                            src={item.image}
                            alt={item.name}
                        />

                        <div
                            className="shopping-cart__info"
                        >

                            <h3>

                                {item.name}

                            </h3>

                            <p>

                                {item.price.toLocaleString()}
                                FCFA

                            </p>

                        </div>

                        <div
                            className="shopping-cart__quantity"
                        >

                            <button

                                onClick={() =>

                                    onQuantityChange?.(

                                        item,

                                        item.quantity - 1

                                    )

                                }

                            >

                                <Minus size={16} />

                            </button>

                            <span>

                                {item.quantity}

                            </span>

                            <button

                                onClick={() =>

                                    onQuantityChange?.(

                                        item,

                                        item.quantity + 1

                                    )

                                }

                            >

                                <Plus size={16} />

                            </button>

                        </div>

                        <Button

                            variant="ghost"

                            onClick={() =>

                                onRemove?.(item)

                            }

                        >

                            <Trash2 />

                        </Button>

                    </article>

                ))}

            </div>

            <div className="shopping-cart__coupon">

                <Input

                    value={coupon}

                    placeholder="Code promo"

                    onChange={(e) =>

                        setCoupon(e.target.value)

                    }

                />

                <Button

                    onClick={() =>

                        onApplyCoupon?.(coupon)

                    }

                >

                    <Tag size={18} />

                    Appliquer

                </Button>

            </div>

            <div className="shopping-cart__shipping">

                <Truck size={18} />

                {SHIPPING.map(option => (

                    <label key={option.id}>

                        <input

                            type="radio"

                            checked={
                                shipping.id === option.id
                            }

                            onChange={() =>

                                setShipping(option)

                            }

                        />

                        {option.label}

                        (
                        {option.price.toLocaleString()}
                        FCFA
                        )

                    </label>

                ))}

            </div>

            <div className="shopping-cart__summary">

                <div>

                    <span>Sous-total</span>

                    <strong>

                        {subtotal.toLocaleString()}
                        FCFA

                    </strong>

                </div>

                <div>

                    <span>Taxes</span>

                    <strong>

                        {taxes.toLocaleString()}
                        FCFA

                    </strong>

                </div>

                <div>

                    <span>Livraison</span>

                    <strong>

                        {shipping.price.toLocaleString()}
                        FCFA

                    </strong>

                </div>

                <div className="shopping-cart__total">

                    <span>Total</span>

                    <strong>

                        {total.toLocaleString()}
                        FCFA

                    </strong>

                </div>

            </div>

            <Button
                fullWidth
                onClick={() =>

                    onCheckout?.({

                        subtotal,

                        taxes,

                        shipping,

                        total,

                    })

                }
            >

                Passer à la caisse

            </Button>

        </section>

    );

};

export default ShoppingCart;