import { useMemo, useState } from "react";

import Checkbox from "@components/ui/Checkbox";
import Button from "@components/ui/Button";

import { DEFAULT_METHODS } from "./constants/paymentMethods";
import { validatePayment } from "./utils/validatePayment";

import PaymentMethodSelector from "./components/PaymentMethodSelector";
import CardFields from "./components/CardFields";
import MobileMoneyField from "./components/MobileMoneyField";
import CouponCurrencyFields from "./components/CouponCurrencyFields";
import PaymentSummary from "./components/PaymentSummary";

import "./CheckoutPayment.css";

function CheckoutPayment({

    methods = DEFAULT_METHODS,

    value,

    cart = [],

    onBack,

    onNext,

    onChange,

}) {

    const [payment, setPayment] = useState({
        paymentMethod: value.paymentMethod || null,
        cardName: value.cardName || "",
        cardNumber: value.cardNumber || "",
        expiry: value.expiry || "",
        cvv: value.cvv || "",
        mobileNumber: value.mobileNumber || "",
        coupon: value.coupon || "",
        acceptTerms: value.acceptTerms || false,
    });

    const [error, setError] = useState("");

    const subtotal = useMemo(

        () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),

        [cart]

    );

    const update = (field, fieldValue) => {

        const next = {
            ...payment,
            [field]: fieldValue,
        };

        setPayment(next);

        onChange?.(next);

    };

    const handleNext = () => {

        const validationError = validatePayment(payment);

        if (validationError) {
            setError(validationError);
            return;
        }

        setError("");

        onNext?.();

    };

    const isCardMethod =
        payment.paymentMethod?.id === "card" ||
        payment.paymentMethod?.id === "stripe";

    const isMobileMoneyMethod =
        payment.paymentMethod?.id === "orange-money" ||
        payment.paymentMethod?.id === "mtn-momo";

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

            <PaymentMethodSelector
                methods={methods}
                selectedMethod={payment.paymentMethod}
                onSelect={(method) => update("paymentMethod", method)}
            />

            {isCardMethod && (

                <CardFields
                    payment={payment}
                    onFieldChange={update}
                />

            )}

            {isMobileMoneyMethod && (

                <MobileMoneyField
                    value={payment.mobileNumber}
                    onChange={(mobileNumber) => update("mobileNumber", mobileNumber)}
                />

            )}

            <div className="checkout__divider" />

            <CouponCurrencyFields
                coupon={payment.coupon}
                onCouponChange={(coupon) => update("coupon", coupon)}
            />

            <PaymentSummary subtotal={subtotal} />

            <Checkbox
                checked={payment.acceptTerms}
                onChange={(e) => update("acceptTerms", e.target.checked)}
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

                <Button onClick={handleNext}>
                    Continuer
                </Button>

            </div>

        </div>

    );

}

export default CheckoutPayment;
