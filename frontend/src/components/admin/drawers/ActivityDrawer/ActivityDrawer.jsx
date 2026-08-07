import Drawer from "../Drawer";

import ActivityLog from "../../timeline/ActivityLog";

import "./ActivityDrawer.css";

function ActivityDrawer({

    open = false,

    activities = [],

    loading = false,

    onClose,

    onRefresh,

}) {

    return (

        <Drawer

            open={open}

            width="600px"

            title="Journal d'activité"

            subtitle="Historique des actions effectuées dans le Back Office."

            onClose={onClose}

            footer={

                <>

                    <button

                        type="button"

                        className="activity-drawer__secondary"

                        onClick={onRefresh}

                        disabled={loading}

                    >

                        Actualiser

                    </button>

                    <button

                        type="button"

                        className="activity-drawer__primary"

                        onClick={onClose}

                    >

                        Fermer

                    </button>

                </>

            }

        >

            <ActivityLog

                activities={activities}

                loading={loading}

            />

        </Drawer>

    );

}

export default ActivityDrawer;