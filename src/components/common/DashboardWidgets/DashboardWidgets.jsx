import "./DashboardWidgets.css";

import StatsWidget from "./StatsWidget";
import ChartWidget from "./ChartWidget";
import SummaryWidget from "./SummaryWidget";
import ProgressWidget from "./ProgressWidget";
import RecentActivityWidget from "./RecentActivityWidget";

function DashboardWidgets({

    statistics = [],

    charts = [],

    summaries = [],

    progresses = [],

    activities = [],

}) {

    return (

        <section className="dashboard-widgets">

            <div className="dashboard-widgets__stats">

                {statistics.map((item) => (

                    <StatsWidget
                        key={item.id}
                        {...item}
                    />

                ))}

            </div>

            <div className="dashboard-widgets__content">

                <div className="dashboard-widgets__left">

                    {charts.map((chart) => (

                        <ChartWidget
                            key={chart.id}
                            {...chart}
                        />

                    ))}

                </div>

                <aside className="dashboard-widgets__right">

                    {summaries.map((summary) => (

                        <SummaryWidget
                            key={summary.id}
                            {...summary}
                        />

                    ))}

                    {progresses.map((progress) => (

                        <ProgressWidget
                            key={progress.id}
                            {...progress}
                        />

                    ))}

                </aside>

            </div>

            <RecentActivityWidget

                activities={activities}

            />

        </section>

    );

}

export default DashboardWidgets;