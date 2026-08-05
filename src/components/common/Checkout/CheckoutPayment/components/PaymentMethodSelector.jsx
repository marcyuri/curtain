function PaymentMethodSelector({

    methods,

    selectedMethod,

    onSelect,

}) {

    return (
        <div className="checkout-payment__methods">

            {methods.map((method) => {

                const Icon = method.icon;

                return (

                    <button
                        key={method.id}
                        className={
                            selectedMethod?.id === method.id
                                ? "checkout-payment__method checkout-payment__method--active"
                                : "checkout-payment__method"
                        }
                        onClick={() => onSelect(method)}
                    >

                        <Icon size={24} />

                        <span>
                            {method.name}
                        </span>

                    </button>

                );

            })}

        </div>
    );

}

export default PaymentMethodSelector;
