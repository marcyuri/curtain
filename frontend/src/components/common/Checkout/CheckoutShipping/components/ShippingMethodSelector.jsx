import { Truck } from "lucide-react";

function ShippingMethodSelector({

    methods,

    selectedMethod,

    onSelect,

}) {

    return (
        <div className="checkout-shipping__methods">

            {methods.map((method) => (

                <button
                    key={method.id}
                    className={
                        selectedMethod?.id === method.id
                            ? "checkout-shipping__method checkout-shipping__method--active"
                            : "checkout-shipping__method"
                    }
                    onClick={() => onSelect(method)}
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
    );

}

export default ShippingMethodSelector;
