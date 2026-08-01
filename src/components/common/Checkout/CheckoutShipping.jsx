import { useMemo, useState } from "react";

import {
    Truck,
    CalendarDays,
    Clock,
    MapPin,
} from "lucide-react";

import Button from "../../form/Button";
import Select from "../../form/Select";
import Textarea from "../../form/Textarea";

import "./CheckoutShipping.css";

const DEFAULT_TIME_SLOTS = [
    {
        label: "08:00 - 10:00",
        value: "08-10",
    },
    {
        label: "10:00 - 12:00",
        value: "10-12",
    },
    {
        label: "13:00 - 15:00",
        value: "13-15",
    },
    {
        label: "15:00 - 18:00",
        value: "15-18",
    },
];

function CheckoutShipping({

    methods = [],

    value,

    onChange,

    onNext,

    onBack,

}) {

    const [shipping, setShipping] = useState({

        shippingMethod:
            value.shippingMethod,

        deliveryDate:
            value.deliveryDate || "",

        deliveryTime:
            value.deliveryTime || "",

        instructions:
            value.instructions || "",

    });

    const [error, setError] = useState("");

    const estimatedDate = useMemo(() => {

        if (!shipping.shippingMethod) {

            return "";

        }

        return shipping.shippingMethod.estimatedDelivery;

    }, [shipping.shippingMethod]);

    const update = (field, fieldValue) => {

        const next = {

            ...shipping,

            [field]: fieldValue,

        };

        setShipping(next);

        onChange?.(next);

    };

    const validate = () => {

        if (!shipping.shippingMethod) {

            setError(
                "Veuillez sélectionner un mode de livraison."
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

                        Livraison

                    </h2>

                    <p className="checkout__section-subtitle">

                        Choisissez votre mode de livraison.

                    </p>

                </div>

            </div>

            <div className="checkout-shipping__methods">

                {methods.map(method => (

                    <button

                        key={method.id}

                        className={

                            shipping.shippingMethod?.id === method.id

                                ? "checkout-shipping__method checkout-shipping__method--active"

                                : "checkout-shipping__method"

                        }

                        onClick={() =>

                            update(

                                "shippingMethod",

                                method

                            )

                        }

                    >

                        <Truck size={22} />

                        <div>

                            <strong>

                                {method.name}

                            </strong>

                            <p>

                                {method.description}

                            </p>

                            <small>

                                {method.price.toLocaleString()}

                                FCFA

                            </small>

                        </div>

                    </button>

                ))}

            </div>

            {estimatedDate && (

                <div className="checkout-shipping__estimate">

                    <CalendarDays size={18} />

                    Livraison estimée :

                    <strong>

                        {estimatedDate}

                    </strong>

                </div>

            )}

            <div className="checkout__divider" />

            <div className="checkout__grid">

                <div className="checkout__field">

                    <label>

                        Date souhaitée

                    </label>

                    <input

                        type="date"

                        value={shipping.deliveryDate}

                        onChange={(e) =>

                            update(

                                "deliveryDate",

                                e.target.value

                            )

                        }

                    />

                </div>

                <div className="checkout__field">

                    <label>

                        Créneau horaire

                    </label>

                    <Select

                        value={shipping.deliveryTime}

                        onChange={(e) =>

                            update(

                                "deliveryTime",

                                e.target.value

                            )

                        }

                        options={DEFAULT_TIME_SLOTS}

                    />

                </div>

            </div>

            <div className="checkout__divider" />

            <div className="checkout__field">

                <label>

                    Instructions pour le livreur

                </label>

                <Textarea

                    rows={5}

                    value={shipping.instructions}

                    onChange={(e) =>

                        update(

                            "instructions",

                            e.target.value

                        )

                    }

                    placeholder="Ex : sonner au portail, appeler avant d'arriver..."

                />

            </div>

            {shipping.shippingMethod && (

                <div className="checkout-shipping__summary">

                    <MapPin size={18} />

                    <div>

                        <strong>

                            {shipping.shippingMethod.name}

                        </strong>

                        <p>

                            Coût :

                            {" "}

                            {shipping.shippingMethod.price.toLocaleString()}

                            FCFA

                        </p>

                    </div>

                </div>

            )}

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

export default CheckoutShipping;