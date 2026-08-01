import { useMemo, useState } from "react";

import {
    CreditCard,
    Landmark,
    Wallet,
    ShieldCheck,
    TicketPercent,
} from "lucide-react";

import Input from "../../form/Input";
import Checkbox from "../../form/Checkbox";
import Button from "../../form/Button";
import Select from "../../form/Select";

import "./CheckoutPayment.css";

const DEFAULT_METHODS = [
    {
        id: "card",
        name: "Carte bancaire",
        icon: CreditCard,
    },
    {
        id: "paypal",
        name: "PayPal",
        icon: Wallet,
    },
    {
        id: "stripe",
        name: "Stripe",
        icon: CreditCard,
    },
    {
        id: "cinetpay",
        name: "CinetPay",
        icon: Wallet,
    },
    {
        id: "flutterwave",
        name: "Flutterwave",
        icon: Wallet,
    },
    {
        id: "orange-money",
        name: "Orange Money",
        icon: Wallet,
    },
    {
        id: "mtn-momo",
        name: "MTN Mobile Money",
        icon: Wallet,
    },
    {
        id: "bank-transfer",
        name: "Virement bancaire",
        icon: Landmark,
    },
    {
        id: "cash",
        name: "Paiement à la livraison",
        icon: Wallet,
    },
];

function CheckoutPayment({

    methods = DEFAULT_METHODS,

    value,

    cart = [],

    onBack,

    onNext,

    onChange,

}) {

    const [payment, setPayment] = useState({

        paymentMethod:
            value.paymentMethod || null,

        cardName:
            value.cardName || "",

        cardNumber:
            value.cardNumber || "",

        expiry:
            value.expiry || "",

        cvv:
            value.cvv || "",

        mobileNumber:
            value.mobileNumber || "",

        coupon:
            value.coupon || "",

        acceptTerms:
            value.acceptTerms || false,

    });

    const [error, setError] = useState("");

    const subtotal = useMemo(() => {

        return cart.reduce(

            (sum, item) =>

                sum +
                item.price * item.quantity,

            0

        );

    }, [cart]);

    const update = (field, fieldValue) => {

        const next = {

            ...payment,

            [field]: fieldValue,

        };

        setPayment(next);

        onChange?.(next);

    };

    const validate = () => {

        if (!payment.paymentMethod) {

            setError(

                "Veuillez choisir un moyen de paiement."

            );

            return false;

        }

        if (

            payment.paymentMethod.id === "card" ||

            payment.paymentMethod.id === "stripe"

        ) {

            if (

                !payment.cardName ||

                !payment.cardNumber ||

                !payment.expiry ||

                !payment.cvv

            ) {

                setError(

                    "Veuillez compléter les informations de votre carte."

                );

                return false;

            }

        }

        if (

            payment.paymentMethod.id === "orange-money" ||

            payment.paymentMethod.id === "mtn-momo"

        ) {

            if (!payment.mobileNumber) {

                setError(

                    "Veuillez renseigner votre numéro mobile."

                );

                return false;

            }

        }

        if (!payment.acceptTerms) {

            setError(

                "Vous devez accepter les conditions générales."

            );

            return false;

        }

        setError("");

        return true;

    };

    const handleNext = () => {

        if (!validate()) {

            return;

        }

        onNext?.();

    };

    return (

        <div className="checkout__section checkout__step">

            <div className="checkout__section-header">

                <div>

                    <h2>

                        Paiement

                    </h2>

                    <p className="checkout__section-subtitle">

                        Choisissez votre moyen de paiement sécurisé.

                    </p>

                </div>

            </div>

            <div className="checkout-payment__methods">

                {methods.map(method => {

                    const Icon = method.icon;

                    return (

                        <button

                            key={method.id}

                            className={

                                payment.paymentMethod?.id === method.id

                                    ? "checkout-payment__method checkout-payment__method--active"

                                    : "checkout-payment__method"

                            }

                            onClick={() =>

                                update(

                                    "paymentMethod",

                                    method

                                )

                            }

                        >

                            <Icon size={24} />

                            <span>

                                {method.name}

                            </span>

                        </button>

                    );

                })}

            </div>

            {(payment.paymentMethod?.id === "card" ||

                payment.paymentMethod?.id === "stripe") && (

                    <div className="checkout__grid">

                        <div className="checkout__field">

                            <label>

                                Nom du titulaire

                            </label>

                            <Input

                                value={payment.cardName}

                                onChange={(e) =>

                                    update(

                                        "cardName",

                                        e.target.value

                                    )

                                }

                            />

                        </div>

                        <div className="checkout__field">

                            <label>

                                Numéro de carte

                            </label>

                            <Input

                                value={payment.cardNumber}

                                onChange={(e) =>

                                    update(

                                        "cardNumber",

                                        e.target.value

                                    )

                                }

                            />

                        </div>

                        <div className="checkout__field">

                            <label>

                                Expiration

                            </label>

                            <Input

                                placeholder="MM/AA"

                                value={payment.expiry}

                                onChange={(e) =>

                                    update(

                                        "expiry",

                                        e.target.value

                                    )

                                }

                            />

                        </div>

                        <div className="checkout__field">

                            <label>

                                CVV

                            </label>

                            <Input

                                value={payment.cvv}

                                onChange={(e) =>

                                    update(

                                        "cvv",

                                        e.target.value

                                    )

                                }

                            />

                        </div>

                    </div>

                )}

            {(payment.paymentMethod?.id === "orange-money" ||

                payment.paymentMethod?.id === "mtn-momo") && (

                    <div className="checkout__field">

                        <label>

                            Numéro Mobile Money

                        </label>

                        <Input

                            value={payment.mobileNumber}

                            onChange={(e) =>

                                update(

                                    "mobileNumber",

                                    e.target.value

                                )

                            }

                        />

                    </div>

                )}

            <div className="checkout__divider" />

            <div className="checkout__grid">

                <div className="checkout__field">

                    <label>

                        Code promo

                    </label>

                    <Input

                        value={payment.coupon}

                        onChange={(e) =>

                            update(

                                "coupon",

                                e.target.value

                            )

                        }

                        placeholder="LOVE2026"

                    />

                </div>

                <div className="checkout__field">

                    <label>

                        Devise

                    </label>

                    <Select

                        value="FCFA"

                        options={[

                            {

                                label: "FCFA",

                                value: "FCFA",

                            },

                            {

                                label: "EUR",

                                value: "EUR",

                            },

                            {

                                label: "USD",

                                value: "USD",

                            },

                        ]}

                    />

                </div>

            </div>

            <div className="checkout-payment__security">

                <ShieldCheck size={22} />

                <span>

                    Paiement sécurisé SSL 256 bits

                </span>

            </div>

            <div className="checkout-payment__coupon">

                <TicketPercent size={20} />

                <span>

                    Sous-total :

                    {" "}

                    <strong>

                        {subtotal.toLocaleString()}

                        FCFA

                    </strong>

                </span>

            </div>

            <Checkbox

                checked={payment.acceptTerms}

                onChange={(e) =>

                    update(

                        "acceptTerms",

                        e.target.checked

                    )

                }

                label="J'accepte les Conditions Générales de Vente"

            />

            {error && (

                <div className="checkout__error">

                    {error}

                </div>

            )}

            <div className="checkout__actions">

                <Button

                    variant="outline"

                    onClick={onBack}

                >

                    Retour

                </Button>

                <Button

                    onClick={handleNext}

                >

                    Continuer

                </Button>

            </div>

        </div>

    );

}

export default CheckoutPayment;