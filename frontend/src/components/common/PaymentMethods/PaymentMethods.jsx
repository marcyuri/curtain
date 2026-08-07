import { useState } from "react";

import {
    CreditCard,
    Landmark,
    Wallet,
    Smartphone,
    CheckCircle2,
} from "lucide-react";

import "./PaymentMethods.css";

const DEFAULT_METHODS = [
    {
        id: "card",
        name: "Carte bancaire",
        description: "Visa • Mastercard • American Express",
        icon: CreditCard,
    },
    {
        id: "paypal",
        name: "PayPal",
        description: "Paiement sécurisé via PayPal",
        icon: Wallet,
    },
    {
        id: "orange-money",
        name: "Orange Money",
        description: "Paiement Mobile Money",
        icon: Smartphone,
    },
    {
        id: "mtn-momo",
        name: "MTN Mobile Money",
        description: "Paiement Mobile Money",
        icon: Smartphone,
    },
    {
        id: "bank",
        name: "Virement bancaire",
        description: "Paiement par transfert bancaire",
        icon: Landmark,
    },
];

function PaymentMethods({

    methods = DEFAULT_METHODS,

    value,

    onChange,

}) {

    const [selected, setSelected] = useState(

        value || methods[0]?.id

    );

    const selectMethod = (method) => {

        setSelected(method.id);

        onChange?.(method);

    };

    return (

        <section className="payment-methods">

            {methods.map((method) => {

                const Icon = method.icon;

                const active = selected === method.id;

                return (

                    <button

                        key={method.id}

                        type="button"

                        className={

                            active

                                ? "payment-method payment-method--active"

                                : "payment-method"

                        }

                        onClick={() =>

                            selectMethod(method)

                        }

                    >

                        <div className="payment-method__icon">

                            <Icon size={28} />

                        </div>

                        <div className="payment-method__content">

                            <strong>

                                {method.name}

                            </strong>

                            <small>

                                {method.description}

                            </small>

                        </div>

                        {active && (

                            <CheckCircle2

                                size={22}

                                className="payment-method__check"

                            />

                        )}

                    </button>

                );

            })}

        </section>

    );

}

export default PaymentMethods;