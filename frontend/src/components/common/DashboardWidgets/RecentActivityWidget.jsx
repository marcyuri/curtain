import {

    Clock,

} from "lucide-react";

import "./RecentActivityWidget.css";

function RecentActivityWidget({

    activities = [],

}) {

    return (

        <section className="recent-activity-widget">

            <header className="recent-activity-widget__header">

                <h3>

                    Activités récentes

                </h3>

            </header>

            <div className="recent-activity-widget__list">

                {activities.length === 0 && (

                    <div className="recent-activity-widget__empty">

                        Aucune activité.

                    </div>

                )}

                {activities.map((activity) => (

                    <article

                        key={activity.id}

                        className="recent-activity-widget__item"

                    >

                        <div className="recent-activity-widget__icon">

                            <Clock size={18} />

                        </div>

                        <div className="recent-activity-widget__content">

                            <strong>

                                {activity.title}

                            </strong>

                            <p>

                                {activity.description}

                            </p>

                            <small>

                                {activity.date}

                            </small>

                        </div>

                    </article>

                ))}

            </div>

        </section>

    );

}

export default RecentActivityWidget;