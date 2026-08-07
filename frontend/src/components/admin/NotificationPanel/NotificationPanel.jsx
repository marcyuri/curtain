import {

    Bell,

    Check,

    Pin,

} from "lucide-react";

import notifications from "./notificationData";

import "./NotificationPanel.css";

function NotificationPanel() {

    return (

        <section className="notification-panel">

            <header className="notification-panel__header">

                <div>

                    <h2>

                        Notifications

                    </h2>

                    <p>

                        Centre de notifications.

                    </p>

                </div>

                <button>

                    <Check size={18} />

                    Tout lire

                </button>

            </header>

            <div className="notification-panel__list">

                {

                    notifications.map((item) => {

                        const Icon = item.icon;

                        return (

                            <article

                                key={item.id}

                                className={

                                    item.read

                                        ?

                                        "notification"

                                        :

                                        "notification notification--unread"

                                }

                            >

                                <div

                                    className={`notification__icon notification__icon--${item.type}`}

                                >

                                    <Icon size={18} />

                                </div>

                                <div

                                    className="notification__content"

                                >

                                    <div>

                                        <strong>

                                            {item.title}

                                        </strong>

                                        <small>

                                            {item.time}

                                        </small>

                                    </div>

                                    <p>

                                        {item.message}

                                    </p>

                                </div>

                                <button>

                                    <Pin size={16} />

                                </button>

                            </article>

                        );

                    })

                }

            </div>

            <footer className="notification-panel__footer">

                <button>

                    <Bell size={18} />

                    Voir toutes les notifications

                </button>

            </footer>

        </section>

    );

}

export default NotificationPanel;