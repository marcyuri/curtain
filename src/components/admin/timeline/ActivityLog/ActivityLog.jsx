import Timeline from "@components/ui/Timeline";
import EmptyState from "@components/ui/EmptyState";
import Skeleton from "@components/ui/Skeleton";

import "./ActivityLog.css";

function ActivityLog({

    activities = [],

    loading = false,

}) {

    if (loading) {
        return (
            <div className="activity-log activity-log--loading">

                {[1, 2, 3, 4].map((key) => (
                    <Skeleton
                        key={key}
                        height="48px"
                    />
                ))}

            </div>
        );
    }

    if (activities.length === 0) {
        return (
            <EmptyState
                title="Aucune activité"
                description="Aucune action n'a encore été enregistrée."
            />
        );
    }

    return (
        <div className="activity-log">

            <Timeline items={activities} />

        </div>
    );
}

export default ActivityLog;
