import { useMemo, useState } from "react";

import Button from "@components/ui/Button";
import Textarea from "@components/ui/Textarea";

import { validateShipping } from "./utils/validateShipping";

import ShippingMethodSelector from "./components/ShippingMethodSelector";
import DeliveryScheduleFields from "./components/DeliveryScheduleFields";
import DeliveryEstimate from "./components/DeliveryEstimate";
import ShippingMethodSummary from "./components/ShippingMethodSummary";

import "./CheckoutShipping.css";

function CheckoutShipping({

    methods = [],

    value,

    onChange,

    onNext,

    onBack,

}) {

    const [shipping, setShipping] = useState({
        shippingMethod: value.shippingMethod,
        deliveryDate: value.deliveryDate || "",
        deliveryTime: value.deliveryTime || "",
        instructions: value.instructions || "",
    });

    const [error, setError] = useState("");

    const estimatedDate = useMemo(

        () => shipping.shippingMethod?.estimatedDelivery ?? "",

        [shipping.shippingMethod]

    );

    const update = (field, fieldValue) => {

        const next = {
            ...shipping,
            [field]: fieldValue,
        };

        setShipping(next);

        onChange?.(next);

    };

    const handleNext = () => {

        const validationError = validateShipping(shipping);

        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");

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

            <ShippingMethodSelector
                methods={methods}
                selectedMethod={shipping.shippingMethod}
                onSelect={(method) => update("shippingMethod", method)}
            />

            <DeliveryEstimate estimatedDate={estimatedDate} />

            <div className="checkout__divider" />

            <DeliveryScheduleFields
                deliveryDate={shipping.deliveryDate}
                deliveryTime={shipping.deliveryTime}
                onDateChange={(v) => update("deliveryDate", v)}
                onTimeChange={(v) => update("deliveryTime", v)}
            />

            <div className="checkout__divider" />

            <div className="checkout__field">

                <label>
                    Instructions pour le livreur
                </label>

                <Textarea
                    rows={5}
                    value={shipping.instructions}
                    onChange={(e) => update("instructions", e.target.value)}
                    placeholder="Ex : sonner au portail, appeler avant d'arriver..."
                />

            </div>

            <ShippingMethodSummary shippingMethod={shipping.shippingMethod} />

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

                <Button onClick={handleNext}>
                    Continuer
                </Button>

            </div>

        </div>

    );

}

export default CheckoutShipping;
