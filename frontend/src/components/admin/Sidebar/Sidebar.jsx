import {

    NavLink,

} from "react-router-dom";

import {

    LogOut,

} from "lucide-react";

import { ROLES } from "@constants/roles";

import sidebarItems from "./sidebarData";

import "./Sidebar.css";

function Sidebar({

    role = ROLES.SUPER_ADMIN,

    user,

    onLogout,

}) {

    const items = sidebarItems.filter(

        (item) =>

            item.roles.includes(role)

    );

    return (

        <aside className="sidebar">

            <div className="sidebar__logo">

                <img

                    src="/logo.png"

                    alt="LOVE CAN BUILD"

                />

                <div>

                    <h2>

                        LOVE CAN BUILD

                    </h2>

                    <span>

                        Back Office

                    </span>

                </div>

            </div>

            <div className="sidebar__user">

                <img

                    src={

                        user?.avatar ||

                        "/avatar.png"

                    }

                    alt={user?.name}

                />

                <div>

                    <strong>

                        {user?.name ||

                            "Administrateur"}

                    </strong>

                    <span>

                        {role}

                    </span>

                </div>

            </div>

            <nav className="sidebar__nav">

                {

                    items.map((item) => {

                        const Icon = item.icon;

                        return (

                            <NavLink

                                key={item.id}

                                to={item.path}

                                className={({ isActive }) =>

                                    isActive

                                        ? "sidebar__link sidebar__link--active"

                                        : "sidebar__link"

                                }

                            >

                                <Icon size={20} />

                                {item.label}

                            </NavLink>

                        );

                    })

                }

            </nav>

            <button

                className="sidebar__logout"

                onClick={onLogout}

            >

                <LogOut size={20} />

                Déconnexion

            </button>

        </aside>

    );

}

export default Sidebar;