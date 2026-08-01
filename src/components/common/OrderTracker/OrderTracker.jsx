import { useMemo } from "react";

import {
    Package,
    Clock,
    CheckCircle2,
    Truck,
    MapPin,
    Phone,
    Download,
    Home,
    RotateCcw,
    XCircle,
} from "lucide-react";

import Button from "../../form/Button";

import "./OrderTracker.css";

const STATUS = {
    pending: {
        label: "En attente",
        icon: Clock,
    },
    confirmed: {
        label: "Confirmée",
        icon: CheckCircle2,
    },
    preparing: {
        label: "Préparation",
        icon: Package,
    },
    shipped: {
        label: "Expédiée",
        icon: Truck,
    },
    delivering: {
        label: "En livraison",
        icon: Truck,
    },
    delivered: {
        label: "Livrée",
        icon: CheckCircle2,
    },
    cancelled: {
        label: "Annulée",
        icon: XCircle,
    },
    returned: {
        label: "Retournée",
        icon: RotateCcw,
    },
};

function OrderTracker({

    orderNumber,

    status = "pending",

    estimatedDelivery,

    address,

    courier,

    timeline = [],

    trackingUrl,

    onDownloadInvoice,

    onContactCourier,

    onGoHome,

}) {

    const currentIndex = useMemo(() => {

        return timeline.findIndex(

            item => item.status === status

        );

    }, [timeline, status]);

    return (

        <section className="order-tracker">

            <header className="order-tracker__header">

                <div>

                    <h2>

                        Suivi de commande

                    </h2>

                    <p>

                        Commande

                        {" "}

                        <strong>

                            #{orderNumber}

                        </strong>

                    </p>

                </div>

                <span className="order-tracker__badge">

                    {STATUS[status]?.label}

                </span>

            </header>

            <div className="order-tracker__progress">

                {timeline.map((step, index) => {

                    const Icon =

                        STATUS[step.status]?.icon ||

                        Clock;

                    return (

                        <div

                            key={step.status}

                            className={

                                index <= currentIndex

                                    ? "order-tracker__step order-tracker__step--active"

                                    : "order-tracker__step"

                            }

                        >

                            <div className="order-tracker__icon">

                                <Icon size={20} />

                            </div>

                            <div>

                                <strong>

                                    {step.title}

                                </strong>

                                <small>

                                    {step.date}

                                </small>

                            </div>

                        </div>

                    );

                })}

            </div>

            <div className="order-tracker__details">

                <div className="order-tracker__card">

                    <Clock size={20} />

                    <div>

                        <strong>

                            Livraison estimée

                        </strong>

                        <p>

                            {estimatedDelivery}

                        </p>

                    </div>

                </div>

                <div className="order-tracker__card">

                    <MapPin size={20} />

                    <div>

                        <strong>

                            Adresse

                        </strong>

                        <p>

                            {address}

                        </p>

                    </div>

                </div>

                {courier && (

                    <div className="order-tracker__card">

                        <Phone size={20} />

                        <div>

                            <strong>

                                Livreur

                            </strong>

                            <p>

                                {courier.name}

                            </p>

                            <small>

                                {courier.phone}

                            </small>

                        </div>

                        <Button

                            variant="ghost"

                            onClick={onContactCourier}

                        >

                            Appeler

                        </Button>

                    </div>

                )}

            </div>

            {trackingUrl && (

                <div className="order-tracker__map">

                    <iframe

                        title="Suivi"

                        src={trackingUrl}

                        loading="lazy"

                    />

                </div>

            )}

            <footer className="order-tracker__footer">

                <Button

                    variant="outline"

                    onClick={onDownloadInvoice}

                >

                    <Download size={18} />

                    Télécharger la facture

                </Button>

                <Button

                    onClick={onGoHome}

                >

                    <Home size={18} />

                    Retour à l'accueil

                </Button>

            </footer>

        </section>

    );

}

export default OrderTracker;