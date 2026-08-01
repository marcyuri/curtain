import {
    CheckCircle2,
    Download,
    Home,
    Package,
    Receipt,
} from "lucide-react";

import Button from "../../form/Button";

import "./CheckoutSuccess.css";

function CheckoutSuccess({

    checkout,

    cartItems = [],

    total,

    currency = "FCFA",

    onBack,

    onSubmit,

    onDownloadInvoice,

    onOrders,

    onHome,

}) {

    return (

        <div className="checkout-success checkout__step">

            <div className="checkout-success__icon">

                <CheckCircle2 size={70} />

            </div>

            <h2>

                Votre commande est prête

            </h2>

            <p>

                Vérifiez une dernière fois les informations
                puis confirmez votre commande.

            </p>

            <div className="checkout-success__card">

                <div className="checkout-success__row">

                    <span>

                        Articles

                    </span>

                    <strong>

                        {cartItems.length}

                    </strong>

                </div>

                <div className="checkout-success__row">

                    <span>

                        Livraison

                    </span>

                    <strong>

                        {checkout.shippingMethod?.name || "-"}

                    </strong>

                </div>

                <div className="checkout-success__row">

                    <span>

                        Paiement

                    </span>

                    <strong>

                        {checkout.paymentMethod?.name || "-"}

                    </strong>

                </div>

                <div className="checkout-success__row checkout-success__row--total">

                    <span>

                        Total

                    </span>

                    <strong>

                        {total.toLocaleString()} {currency}

                    </strong>

                </div>

            </div>

            <div className="checkout-success__actions">

                <Button
                    variant="outline"
                    onClick={onBack}
                >
                    Modifier
                </Button>

                <Button
                    onClick={onSubmit}
                >
                    Confirmer la commande
                </Button>

            </div>

            <div className="checkout-success__links">

                <Button
                    variant="ghost"
                    onClick={onDownloadInvoice}
                >
                    <Download size={18} />
                    Télécharger la facture
                </Button>

                <Button
                    variant="ghost"
                    onClick={onOrders}
                >
                    <Package size={18} />
                    Mes commandes
                </Button>

                <Button
                    variant="ghost"
                    onClick={onHome}
                >
                    <Home size={18} />
                    Accueil
                </Button>

            </div>

            <div className="checkout-success__footer">

                <Receipt size={18} />

                Une facture sera également envoyée par email.

            </div>

        </div>

    );

}

export default CheckoutSuccess;