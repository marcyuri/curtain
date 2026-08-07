import Drawer from "../Drawer";

import NotificationCenter from "@components/common/NotificationCenter";

import "./NotificationDrawer.css";

function NotificationDrawer({

    open = false,

    notifications = [],

    loading = false,

    onClose,

    onRead,

    onReadAll,

    onDelete,

}) {

    return (

        <Drawer

            open={open}

            width="500px"

            title="Notifications"

            subtitle="Consultez les dernières notifications."

            onClose={onClose}

            footer={

                <>

                    <button

                        type="button"

                        className="notification-drawer__secondary"

                        onClick={onReadAll}

                        disabled={loading}

                    >

                        Tout marquer comme lu

                    </button>

                    <button

                        type="button"

                        className="notification-drawer__primary"

                        onClick={onClose}

                    >

                        Fermer

                    </button>

                </>

            }

        >

            <NotificationCenter

                notifications={notifications}

                loading={loading}

                onRead={onRead}

                onDelete={onDelete}

            />

        </Drawer>

    );

}

export default NotificationDrawer;