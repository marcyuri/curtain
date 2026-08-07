import { Outlet } from "react-router-dom";

import Sidebar from "@components/admin/Sidebar";
import Header from "@components/admin/Header";

import "./AdminLayout.css";

function AdminLayout() {

    return (

        <div className="admin-layout">

            <aside className="admin-layout__sidebar">

                <Sidebar />

            </aside>

            <div className="admin-layout__wrapper">

                <header className="admin-layout__header">

                    <Header />

                </header>

                <main className="admin-layout__content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;