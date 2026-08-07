import StatsCard from "@components/admin/StatsCard";
import ChartCard from "@components/admin/ChartCard";
import QuickActions from "@components/admin/QuickActions";
import RecentActivity from "@components/admin/RecentActivity";
import NotificationPanel from "@components/admin/NotificationPanel";
import CalendarWidget from "@components/admin/CalendarWidget";
import DataTable from "@components/admin/DataTable";

import useDashboardStats from "./hooks/useDashboardStats";

import { orders, columns } from "./data";

import "./Dashboard.css";

function Dashboard() {

    const { stats } = useDashboardStats();

    return (

        <section className="dashboard">

            <header className="dashboard__header">

                <div>

                    <h1>
                        Bonjour 👋
                    </h1>

                    <p>
                        Bienvenue dans le Back Office LOVE CAN BUILD.
                    </p>

                </div>

            </header>

            <section className="dashboard__stats">

                {stats.map((stat) => (

                    <StatsCard
                        key={stat.id}
                        title={stat.title}
                        value={stat.value}
                        trend={stat.trend}
                        subtitle={stat.subtitle}
                        icon={stat.icon}
                        color={stat.color}
                    />

                ))}

            </section>

            <section className="dashboard__grid">

                <ChartCard
                    title="Evolution des ventes"
                    subtitle="30 derniers jours"
                >

                    <div className="dashboard__chart-placeholder">
                        Graphique ici
                    </div>

                </ChartCard>

                <QuickActions />

            </section>

            <section className="dashboard__grid">

                <RecentActivity />

                <CalendarWidget />

            </section>

            <section className="dashboard__grid">

                <NotificationPanel />

                <ChartCard
                    title="Objectifs"
                    subtitle="Progression mensuelle"
                >

                    <div className="dashboard__chart-placeholder">
                        Progression
                    </div>

                </ChartCard>

            </section>

            <DataTable
                title="Dernières commandes"
                subtitle="Les dernières commandes enregistrées"
                columns={columns}
                rows={orders}
            />

        </section>

    );

}

export default Dashboard;
