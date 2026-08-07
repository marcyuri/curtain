import recentActivity from "./recentActivityData";

import "./RecentActivity.css";

function RecentActivity() {

    return (

        <section className="recent-activity">

            <header className="recent-activity__header">

                <h2>

                    Activité récente

                </h2>

                <p>

                    Dernières actions effectuées.

                </p>

            </header>

            <div className="recent-activity__timeline">

                {

                    recentActivity.map((item) => {

                        const Icon = item.icon;

                        return (

                            <article

                                key={item.id}

                                className="activity"

                            >

                                <div

                                    className={`activity__icon activity__icon--${item.color}`}

                                >

                                    <Icon size={18} />

                                </div>

                                <div

                                    className="activity__content"

                                >

                                    <div

                                        className="activity__top"

                                    >

                                        <strong>

                                            {item.title}

                                        </strong>

                                        <small>

                                            {item.time}

                                        </small>

                                    </div>

                                    <p>

                                        {item.description}

                                    </p>

                                    <span>

                                        {item.user}

                                    </span>

                                </div>

                            </article>

                        );

                    })

                }

            </div>

        </section>

    );

}

export default RecentActivity;