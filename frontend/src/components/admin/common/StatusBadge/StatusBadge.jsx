import {

    CheckCircle2,

    Clock3,

    AlertTriangle,

    Archive,

    XCircle,

} from "lucide-react";

import "./StatusBadge.css";

const statusConfig = {

    published: {

        label: "Publié",

        icon: CheckCircle2,

        className: "success",

    },

    draft: {

        label: "Brouillon",

        icon: Clock3,

        className: "warning",

    },

    archived: {

        label: "Archivé",

        icon: Archive,

        className: "secondary",

    },

    out_of_stock: {

        label: "Rupture",

        icon: AlertTriangle,

        className: "danger",

    },

    inactive: {

        label: "Inactif",

        icon: XCircle,

        className: "secondary",

    },

};

function StatusBadge({

    status,

    label,

}) {

    const config =

        statusConfig[status] ||

        {

            label: label || status,

            icon: Clock3,

            className: "default",

        };

    const Icon = config.icon;

    return (

        <span

            className={`status-badge status-badge--${config.className}`}

        >

            <Icon

                size={15}

            />

            {label || config.label}

        </span>

    );

}

export default StatusBadge;