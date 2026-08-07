import "./CheckoutStep.css";

function CheckoutStep({

    title,

    subtitle,

    children,

    actions,

    className = "",

}) {

    return (

        <section
            className={`checkout-step ${className}`}
        >

            {(title || subtitle) && (

                <header className="checkout-step__header">

                    {title && (

                        <h2>

                            {title}

                        </h2>

                    )}

                    {subtitle && (

                        <p>

                            {subtitle}

                        </p>

                    )}

                </header>

            )}

            <div className="checkout-step__content">

                {children}

            </div>

            {actions && (

                <footer className="checkout-step__footer">

                    {actions}

                </footer>

            )}

        </section>

    );

}

export default CheckoutStep;