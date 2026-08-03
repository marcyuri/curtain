import { Link } from "react-router-dom";

import quickActions from "./quickActionsData";

import "./QuickActions.css";

function QuickActions() {

    return (

        <section className="quick-actions">

            <header className="quick-actions__header">

                <h2>

                    Actions rapides

                </h2>

                <p>

                    Accédez rapidement aux principales fonctionnalités.

                </p>

            </header>

            <div className="quick-actions__grid">

                {

                    quickActions.map((action) => {

                        const Icon = action.icon;

                        return (

                            <Link

                                key={action.id}

                                to={action.path}

                                className={`quick-action quick-action--${action.color}`}

                            >

                                <div className="quick-action__icon">

                                    <Icon size={26} />

                                </div>

                                <h3>

                                    {action.title}

                                </h3>

                                <span>

                                    {action.description}

                                </span>

                            </Link>

                        );

                    })

                }

            </div>

        </section>

    );

}

export default QuickActions;