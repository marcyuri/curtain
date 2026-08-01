import { useMemo, useState } from "react";

import {
    Bell,
    Check,
    CheckCheck,
    Trash2,
    Filter,
} from "lucide-react";

import Button from "../../form/Button";

import "./NotificationCenter.css";

const FILTERS = [
    "Toutes",
    "Non lues",
    "Commandes",
    "Consultations",
    "Paiements",
    "Événements",
    "Système",
];

const NotificationCenter = ({
    notifications = [],
    onRead,
    onReadAll,
    onDelete,
    onClear,
}) => {

    const [filter, setFilter] = useState("Toutes");

    const items = useMemo(() => {

        if (filter === "Toutes") return notifications;

        if (filter === "Non lues") {
            return notifications.filter(
                item => !item.read
            );
        }

        return notifications.filter(
            item => item.category === filter
        );

    }, [notifications, filter]);

    return (

        <section className="notification-center">

            <header className="notification-center__header">

                <div>

                    <Bell />

                    <h2>Notifications</h2>

                </div>

                <div>

                    <Button
                        variant="ghost"
                        onClick={onReadAll}
                    >
                        <CheckCheck size={18} />
                        Tout lire
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={onClear}
                    >
                        <Trash2 size={18} />
                        Tout supprimer
                    </Button>

                </div>

            </header>

            <div className="notification-center__filters">

                <Filter size={16} />

                {FILTERS.map(item => (

                    <button

                        key={item}

                        onClick={() => setFilter(item)}

                        className={
                            filter === item
                                ? "active"
                                : ""
                        }

                    >

                        {item}

                    </button>

                ))}

            </div>

            <div className="notification-center__list">

                {items.map(notification => (

                    <article

                        key={notification.id}

                        className={
                            notification.read
                                ? "notification"
                                : "notification notification--unread"
                        }

                    >

                        <div className="notification__content">

                            <strong>

                                {notification.title}

                            </strong>

                            <p>

                                {notification.message}

                            </p>

                            <small>

                                {notification.date}

                            </small>

                        </div>

                        <div className="notification__actions">

                            {!notification.read && (

                                <Button

                                    variant="ghost"

                                    onClick={() =>
                                        onRead?.(
                                            notification
                                        )
                                    }

                                >

                                    <Check size={18} />

                                </Button>

                            )}

                            <Button

                                variant="ghost"

                                onClick={() =>
                                    onDelete?.(
                                        notification
                                    )
                                }

                            >

                                <Trash2 size={18} />

                            </Button>

                        </div>

                    </article>

                ))}

            </div>

        </section>

    );

};

export default NotificationCenter;