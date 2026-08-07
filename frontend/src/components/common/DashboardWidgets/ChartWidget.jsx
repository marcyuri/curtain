import {
    Download,
    Maximize2,
    MoreVertical,
} from "lucide-react";

import "./ChartWidget.css";

function ChartWidget({

    title,

    subtitle,

    children,

    loading = false,

    onDownload,

    onExpand,

    onMore,

}) {

    return (

        <article className="chart-widget">

            <header className="chart-widget__header">

                <div>

                    <h3>

                        {title}

                    </h3>

                    {subtitle && (

                        <p>

                            {subtitle}

                        </p>

                    )}

                </div>

                <div className="chart-widget__actions">

                    <button

                        type="button"

                        onClick={onDownload}

                        title="Télécharger"

                    >

                        <Download size={18} />

                    </button>

                    <button

                        type="button"

                        onClick={onExpand}

                        title="Agrandir"

                    >

                        <Maximize2 size={18} />

                    </button>

                    <button

                        type="button"

                        onClick={onMore}

                        title="Plus"

                    >

                        <MoreVertical size={18} />

                    </button>

                </div>

            </header>

            <div className="chart-widget__body">

                {loading ? (

                    <div className="chart-widget__loading">

                        Chargement...

                    </div>

                ) : (

                    children

                )}

            </div>

        </article>

    );

}

export default ChartWidget;