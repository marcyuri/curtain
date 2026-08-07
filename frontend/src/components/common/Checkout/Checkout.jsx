import { useMemo, useState } from "react";

import Stepper from "../../ui/Stepper";

import CheckoutCustomer from "./CheckoutCustomer";
import CheckoutShipping from "./CheckoutShipping";
import CheckoutPayment from "./CheckoutPayment";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutSuccess from "./CheckoutSuccess";

import "./Checkout.css";

const STEPS = [
    {
        id: 1,
        title: "Informations"
    },
    {
        id: 2,
        title: "Livraison"
    },
    {
        id: 3,
        title: "Paiement"
    },
    {
        id: 4,
        title: "Confirmation"
    }
];

function Checkout({

    cartItems = [],

    customer = {},

    shippingMethods = [],

    paymentMethods = [],

    taxes = 0,

    discount = 0,

    currency = "FCFA",

    onSubmit,

}) {

    const [step, setStep] = useState(0);

    const [checkout, setCheckout] = useState({

        customer,

        shippingMethod: null,

        paymentMethod: null,

        billingAddress: null,

        shippingAddress: null,

        coupon: null,

        notes: "",

        acceptTerms: false,

    });

    const subtotal = useMemo(() => cartItems.reduce(

            (sum, item) =>

                sum + item.price * item.quantity,

            0

        ), [cartItems]);

    const shippingPrice = useMemo(() => {

        if (!checkout.shippingMethod) {

            return 0;

        }

        return checkout.shippingMethod.price;

    }, [checkout.shippingMethod]);

    const total = useMemo(() => (

            subtotal +

            shippingPrice +

            taxes -

            discount

        ), [

        subtotal,

        shippingPrice,

        taxes,

        discount

    ]);

    const next = () => {

        if (step < STEPS.length - 1) {

            setStep(step + 1);

        }

    };

    const previous = () => {

        if (step > 0) {

            setStep(step - 1);

        }

    };

    const updateCheckout = values => {

        setCheckout(previous => ({

            ...previous,

            ...values

        }));

    };

    const submitOrder = () => {

        onSubmit?.({

            ...checkout,

            cartItems,

            subtotal,

            taxes,

            discount,

            shipping: shippingPrice,

            total,

            currency

        });

    };

    return (

        <section className="checkout">

            <Stepper

                steps={STEPS}

                activeStep={step}

            />

            <div className="checkout__content">

                {step === 0 && (

                    <CheckoutCustomer

                        value={checkout}

                        onChange={updateCheckout}

                        onNext={next}

                    />

                )}

                {step === 1 && (

                    <CheckoutShipping

                        methods={shippingMethods}

                        value={checkout}

                        onBack={previous}

                        onNext={next}

                        onChange={updateCheckout}

                    />

                )}

                {step === 2 && (

                    <CheckoutPayment

                        methods={paymentMethods}

                        value={checkout}

                        onBack={previous}

                        onNext={next}

                        onChange={updateCheckout}

                    />

                )}

                {step === 3 && (

                    <CheckoutSuccess

                        checkout={checkout}

                        cartItems={cartItems}

                        total={total}

                        currency={currency}

                        onBack={previous}

                        onSubmit={submitOrder}

                    />

                )}

            </div>

            <aside className="checkout__sidebar">

                <CheckoutSummary

                    items={cartItems}

                    subtotal={subtotal}

                    shipping={shippingPrice}

                    taxes={taxes}

                    discount={discount}

                    total={total}

                    currency={currency}

                />

            </aside>

        </section>

    );

}

export default Checkout;