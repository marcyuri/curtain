import {

    MoreVertical,

    Maximize2,

    Download,

    RefreshCw,

} from "lucide-react";

import "./ChartCard.css";

function ChartCard({

    title,

    subtitle,

    loading = false,

    children,

    onRefresh,

    onDownload,

    onExpand,

    actions = true,

}) {

    return (

        <section className="chart-card">

            <header className="chart-card__header">

                <div>

                    <h2>

                        {title}

                    </h2>

                    {

                        subtitle && (

                            <p>

                                {subtitle}

                            </p>

                        )

                    }

                </div>

                {

                    actions && (

                        <div className="chart-card__actions">

                            <button

                                onClick={onRefresh}

                            >

                                <RefreshCw size={18} />

                            </button>

                            <button

                                onClick={onDownload}

                            >

                                <Download size={18} />

                            </button>

                            <button

                                onClick={onExpand}

                            >

                                <Maximize2 size={18} />

                            </button>

                            <button>

                                <MoreVertical size={18} />

                            </button>

                        </div>

                    )

                }

            </header>

            <div className="chart-card__body">

                {

                    loading

                        ? (

                            <div

                                className="chart-card__loading"

                            />

                        )

                        : children

                }

            </div>

        </section>

    );

}

export default ChartCard;