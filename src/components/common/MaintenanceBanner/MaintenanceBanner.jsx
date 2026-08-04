import {
    AlertTriangle,
    Clock,
    RefreshCw,
    X,
} from "lucide-react";

import { useState } from "react";

import Button from "../../ui/Button";

import "./MaintenanceBanner.css";

function MaintenanceBanner({

    title = "Maintenance programmée",

    message = "Notre plateforme sera temporairement indisponible pendant la maintenance.",

    startDate,

    endDate,

    closable = true,

    type = "warning",

    onRefresh,

}) {

    const [visible, setVisible] = useState(true);

    if (!visible) {

        return null;

    }

    return (

        <section

            className={`maintenance-banner maintenance-banner--${type}`}

        >

            <div className="maintenance-banner__icon">

                <AlertTriangle size={28} />

            </div>

            <div className="maintenance-banner__content">

                <h3>

                    {title}

                </h3>

                <p>

                    {message}

                </p>

                {(startDate || endDate) && (

                    <div className="maintenance-banner__dates">

                        <Clock size={16} />

                        <span>

                            {startDate}

                            {startDate && endDate && " - "}

                            {endDate}

                        </span>

                    </div>

                )}

            </div>

            <div className="maintenance-banner__actions">

                <Button

                    variant="outline"

                    onClick={onRefresh}

                >

                    <RefreshCw size={18} />

                    Actualiser

                </Button>

                {closable && (

                    <button

                        type="button"

                        className="maintenance-banner__close"

                        onClick={() => setVisible(false)}

                        aria-label="Fermer"

                    >

                        <X size={20} />

                    </button>

                )}

            </div>

        </section>

    );

}

export default MaintenanceBanner;