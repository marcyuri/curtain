import {

    Inbox,

} from "lucide-react";

import "./EmptyState.css";

function EmptyState({

    icon: Icon = Inbox,

    title = "Aucune donnée",

    description = "Aucun élément disponible.",

    action,

}) {

    return (

        <section className="empty-state">

            <div className="empty-state__icon">

                <Icon

                    size={52}

                />

            </div>

            <h2>

                {title}

            </h2>

            <p>

                {description}

            </p>

            {

                action && (

                    <div className="empty-state__action">

                        {action}

                    </div>

                )

            }

        </section>

    );

}

export default EmptyState;