import {
    LayoutDashboard,
    Plus,
    RefreshCw,
} from "lucide-react";

import Button from "../../form/Button";

import "./EmptyDashboard.css";

function EmptyDashboard({

    title = "Aucune donnée disponible",

    description = "Les informations apparaîtront ici dès que des données seront disponibles.",

    actionLabel = "Actualiser",

    secondaryActionLabel = "Créer",

    onRefresh,

    onCreate,

    illustration,

}) {

    return (

        <section className="empty-dashboard">

            <div className="empty-dashboard__content">

                {illustration ? (

                    <img
                        src={illustration}
                        alt={title}
                        className="empty-dashboard__image"
                    />

                ) : (

                    <div className="empty-dashboard__icon">

                        <LayoutDashboard size={70} />

                    </div>

                )}

                <h2>

                    {title}

                </h2>

                <p>

                    {description}

                </p>

                <div className="empty-dashboard__actions">

                    <Button
                        onClick={onRefresh}
                    >

                        <RefreshCw size={18} />

                        {actionLabel}

                    </Button>

                    {onCreate && (

                        <Button
                            variant="outline"
                            onClick={onCreate}
                        >

                            <Plus size={18} />

                            {secondaryActionLabel}

                        </Button>

                    )}

                </div>

            </div>

        </section>

    );

}

export default EmptyDashboard;