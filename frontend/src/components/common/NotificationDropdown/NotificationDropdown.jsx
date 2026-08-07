import { useEffect, useMemo, useRef, useState } from "react";

import {
    Bell,
    CheckCheck,
    Trash2,
    ExternalLink,
} from "lucide-react";

import "./NotificationDropdown.css";

function NotificationDropdown({

    notifications = [],

    onOpen,

    onRead,

    onReadAll,

    onRemove,

    onOpenNotification,

}) {

    const dropdownRef = useRef(null);

    const [open, setOpen] = useState(false);

    const unreadCount = useMemo(() => notifications.filter(

            notification => !notification.read

        ).length, [notifications]);

    useEffect(() => {

        const handleClickOutside = (event) => {

            if (

                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)

            ) {

                setOpen(false);

            }

        };

        document.addEventListener(

            "mousedown",

            handleClickOutside

        );

        return () =>

            document.removeEventListener(

                "mousedown",

                handleClickOutside

            );

    }, []);

    const toggleDropdown = () => {

        const nextState = !open;

        setOpen(nextState);

        if (nextState) {

            onOpen?.();

        }

    };

    return (

        <div

            className="notification-dropdown"

            ref={dropdownRef}

        >

            <button

                className="notification-dropdown__trigger"

                onClick={toggleDropdown}

            >

                <Bell size={20} />

                {unreadCount > 0 && (

                    <span className="notification-dropdown__badge">

                        {unreadCount}

                    </span>

                )}

            </button>

            {open && (

                <div className="notification-dropdown__menu">

                    <header className="notification-dropdown__header">

                        <h3>

                            Notifications

                        </h3>

                        {notifications.length > 0 && (

                            <button

                                onClick={onReadAll}

                            >

                                <CheckCheck size={16} />

                                Tout lire

                            </button>

                        )}

                    </header>

                    <div className="notification-dropdown__list">

                        {notifications.length === 0 && (

                            <div className="notification-dropdown__empty">

                                Aucune notification.

                            </div>

                        )}

                        {notifications.map((notification) => (

                            <article

                                key={notification.id}

                                className={

                                    notification.read

                                        ? "notification-dropdown__item"

                                        : "notification-dropdown__item notification-dropdown__item--unread"

                                }

                            >

                                <div

                                    className="notification-dropdown__content"

                                    onClick={() =>

                                        onRead?.(notification)

                                    }

                                >

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

                                <div className="notification-dropdown__actions">

                                    <button

                                        onClick={() =>

                                            onOpenNotification?.(

                                                notification

                                            )

                                        }

                                    >

                                        <ExternalLink size={16} />

                                    </button>

                                    <button

                                        onClick={() =>

                                            onRemove?.(

                                                notification

                                            )

                                        }

                                    >

                                        <Trash2 size={16} />

                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>

                </div>

            )}

        </div>

    );

}

export default NotificationDropdown;