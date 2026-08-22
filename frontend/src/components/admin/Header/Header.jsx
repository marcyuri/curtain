import { useState } from "react";
import { Bell, Menu, Search, Moon, Sun, Settings, ChevronDown } from "lucide-react";

import ImageWithFallback from "@components/common/ImageWithFallback";

import "./Header.css";

function Header({
    user,
    darkMode = false,
    notifications = 0,
    onToggleSidebar,
    onToggleTheme,
    onProfile,
    onSettings,
    onNotifications,
    onLogout,
}) {
    const [openPanel, setOpenPanel] = useState(null);

    const togglePanel = (panel, callback) => {
        callback?.();
        setOpenPanel((current) => (current === panel ? null : panel));
    };

    return (
        <header className="admin-header">
            <div className="admin-header__left">
                <button className="admin-header__icon" type="button" onClick={onToggleSidebar} aria-label="Ouvrir le menu">
                    <Menu size={20} />
                </button>
                <div className="admin-header__search">
                    <Search size={18} />
                    <input type="search" placeholder="Rechercher..." />
                </div>
            </div>

            <div className="admin-header__right">
                <button className="admin-header__icon" type="button" onClick={onToggleTheme} aria-label="Changer le thème">
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button className="admin-header__icon" type="button" onClick={() => togglePanel("notifications", onNotifications)} aria-label="Notifications">
                    <Bell size={20} />
                    {notifications > 0 && <span>{notifications}</span>}
                </button>
                <button className="admin-header__icon" type="button" onClick={() => togglePanel("settings", onSettings)} aria-label="Paramètres">
                    <Settings size={20} />
                </button>
                <button className="admin-header__profile" type="button" onClick={() => togglePanel("profile", onProfile)} aria-label="Profil administrateur">
                    <ImageWithFallback
                        src={user?.avatar || null}
                        alt={user?.name || "Administrateur"}
                        className="admin-header__avatar"
                    />
                    <div>
                        <strong>{user?.name || "Administrateur"}</strong>
                        <small>{user?.role || "SUPER ADMIN"}</small>
                    </div>
                    <ChevronDown size={18} />
                </button>

                {openPanel && (
                    <div className="admin-header__popover" role="status">
                        {openPanel === "notifications" && <><strong>Notifications</strong><p>Aucune nouvelle notification.</p></>}
                        {openPanel === "settings" && <><strong>Paramètres</strong><p>Les paramètres du compte sont disponibles prochainement.</p></>}
                        {openPanel === "profile" && <>
                            <strong>{user?.name || "Administrateur"}</strong>
                            <p>{user?.role || "SUPER ADMIN"}</p>
                            <button type="button" onClick={onLogout}>Déconnexion</button>
                        </>}
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
