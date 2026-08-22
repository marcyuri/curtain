import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import Sidebar from "@components/admin/Sidebar";
import Header from "@components/admin/Header";
import useAuth from "@hooks/useAuth";

import "./AdminLayout.css";

function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate("/admin/login");
    };

    return (

        <div className={`admin-layout ${darkMode ? "admin-layout--dark" : "admin-layout--light"}`}>

            <aside className={`admin-layout__sidebar ${isSidebarOpen ? "admin-layout__sidebar--open" : ""}`}>

                <Sidebar
                    user={user}
                    onLogout={handleLogout}
                    onClose={() => setIsSidebarOpen(false)}
                />

            </aside>

            {isSidebarOpen && (
                <button
                    className="admin-layout__backdrop"
                    type="button"
                    aria-label="Fermer le menu"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <div className="admin-layout__wrapper">

                <header className="admin-layout__header">

                    <Header
                        user={user}
                        darkMode={darkMode}
                        onToggleSidebar={() => setIsSidebarOpen((open) => !open)}
                        onToggleTheme={() => setDarkMode((enabled) => !enabled)}
                        onLogout={handleLogout}
                    />

                </header>

                <main className="admin-layout__content">

                    <Outlet />

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;