import { NavLink } from "react-router-dom";
import { LogOut, UserRound } from "lucide-react";

import { ROLES } from "@constants/roles";

import sidebarItems from "./sidebarData";
import "./Sidebar.css";

function Sidebar({ role = ROLES.SUPER_ADMIN, user, onLogout, onClose }) {
    const items = sidebarItems.filter((item) => item.roles.includes(role));

    return (
        <aside className="sidebar">
            <div className="sidebar__logo">
                <img src="/images/logo.svg" alt="LOVE CAN BUILD" />
                <div>
                    <h2>LOVE CAN BUILD</h2>
                    <span>Back Office</span>
                </div>
            </div>

            <div className="sidebar__user">
                {user?.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name || "Administrateur"}
                        className="sidebar__avatar"
                    />
                ) : (
                    <div className="sidebar__avatar sidebar__avatar--fallback" aria-hidden="true">
                        <UserRound size={24} />
                    </div>
                )}
                <div>
                    <strong>{user?.name || "Administrateur"}</strong>
                    <span>{role}</span>
                </div>
            </div>

            <nav className="sidebar__nav">
                {items.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.id}
                            to={item.path}
                            end={item.path === "/admin"}
                            onClick={onClose}
                            className={({ isActive }) =>
                                isActive
                                    ? "sidebar__link sidebar__link--active"
                                    : "sidebar__link"
                            }
                        >
                            <Icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <button className="sidebar__logout" type="button" onClick={onLogout}>
                <LogOut size={20} />
                Déconnexion
            </button>
        </aside>
    );
}

export default Sidebar;
