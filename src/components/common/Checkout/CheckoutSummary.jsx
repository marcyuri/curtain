import "./CheckoutSummary.css";

import {
    ShoppingBag,
    TicketPercent,
    Truck,
    Receipt,
} from "lucide-react";

function CheckoutSummary({

    items = [],

    subtotal = 0,

    shipping = 0,

    taxes = 0,

    discount = 0,

    total = 0,

    currency = "FCFA",

}) {

    const totalItems = items.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    return (

        <aside className="checkout-summary">

            <header className="checkout-summary__header">

                <ShoppingBag size={22} />

                <h2>

                    Récapitulatif

                </h2>

            </header>

            <div className="checkout-summary__products">

                {items.map(item => (

                    <article

                        key={item.id}

                        className="checkout-summary__product"

                    >

                        <img
                            src={item.image}
                            alt={item.name}
                        />

                        <div>

                            <h4>

                                {item.name}

                            </h4>

                            <small>

                                {item.quantity} × {item.price.toLocaleString()} {currency}

                            </small>

                        </div>

                        <strong>

                            {(item.price * item.quantity).toLocaleString()} {currency}

                        </strong>

                    </article>

                ))}

            </div>

            <div className="checkout-summary__divider" />

            <div className="checkout-summary__totals">

                <div>

                    <span>

                        Articles

                    </span>

                    <strong>

                        {totalItems}

                    </strong>

                </div>

                <div>

                    <span>

                        Sous-total

                    </span>

                    <strong>

                        {subtotal.toLocaleString()} {currency}

                    </strong>

                </div>

                <div>

                    <span>

                        <Truck size={16} />

                        Livraison

                    </span>

                    <strong>

                        {shipping.toLocaleString()} {currency}

                    </strong>

                </div>

                <div>

                    <span>

                        <Receipt size={16} />

                        Taxes

                    </span>

                    <strong>

                        {taxes.toLocaleString()} {currency}

                    </strong>

                </div>

                {discount > 0 && (

                    <div className="checkout-summary__discount">

                        <span>

                            <TicketPercent size={16} />

                            Remise

                        </span>

                        <strong>

                            -{discount.toLocaleString()} {currency}

                        </strong>

                    </div>

                )}

            </div>

            <div className="checkout-summary__divider" />

            <div className="checkout-summary__total">

                <span>

                    Total

                </span>

                <strong>

                    {total.toLocaleString()} {currency}

                </strong>

            </div>

        </aside>

    );

}

export default CheckoutSummary;