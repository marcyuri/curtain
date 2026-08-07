import {
    Activity,
    Clock,
    User,
} from "lucide-react";

import "./ActivityFeed.css";

function ActivityFeed({

    activities = [],

    title = "Activités récentes",

    emptyMessage = "Aucune activité disponible.",

    onItemClick,

}) {

    return (

        <section className="activity-feed">

            <header className="activity-feed__header">

                <Activity size={22} />

                <h2>

                    {title}

                </h2>

            </header>

            {activities.length === 0 && (

                <div className="activity-feed__empty">

                    <Activity size={48} />

                    <p>

                        {emptyMessage}

                    </p>

                </div>

            )}

            <div className="activity-feed__timeline">

                {activities.map((activity) => (

                    <button

                        key={activity.id}

                        type="button"

                        className="activity-feed__item"

                        onClick={() =>

                            onItemClick?.(activity)

                        }

                    >

                        <div className="activity-feed__avatar">

                            {activity.avatar ? (

                                <img

                                    src={activity.avatar}

                                    alt={activity.user}

                                />

                            ) : (

                                <User size={20} />

                            )}

                        </div>

                        <div className="activity-feed__content">

                            <div className="activity-feed__top">

                                <strong>

                                    {activity.user}

                                </strong>

                                <span>

                                    {activity.action}

                                </span>

                            </div>

                            <p>

                                {activity.description}

                            </p>

                            <small>

                                <Clock size={14} />

                                {activity.date}

                            </small>

                        </div>

                    </button>

                ))}

            </div>

        </section>

    );

}

export default ActivityFeed;