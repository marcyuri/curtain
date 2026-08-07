import { MapPin } from "lucide-react";

function ShippingMethodSummary({

    shippingMethod,

}) {

    if (!shippingMethod) {
        return null;
    }

    return (
        <div className="checkout-shipping__summary">

            <MapPin size={18} />

            <div>

                <strong>
                    {shippingMethod.name}
                </strong>

                <p>
                    Coût :
                    {" "}
                    {shippingMethod.price.toLocaleString()}
                    FCFA
                </p>

            </div>

        </div>
    );

}

export default ShippingMethodSummary;
