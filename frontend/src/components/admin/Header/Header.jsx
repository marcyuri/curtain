import {

    Bell,

    Menu,

    Search,

    Moon,

    Sun,

    Settings,

    ChevronDown,

} from "lucide-react";

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

}) {

    return (

        <header className="admin-header">

            <div className="admin-header__left">

                <button

                    className="admin-header__icon"

                    onClick={onToggleSidebar}

                >

                    <Menu size={20} />

                </button>

                <div className="admin-header__search">

                    <Search size={18} />

                    <input

                        type="search"

                        placeholder="Rechercher..."

                    />

                </div>

            </div>

            <div className="admin-header__right">

                <button

                    className="admin-header__icon"

                    onClick={onToggleTheme}

                >

                    {

                        darkMode

                            ? <Sun size={20} />

                            : <Moon size={20} />

                    }

                </button>

                <button

                    className="admin-header__icon"

                    onClick={onNotifications}

                >

                    <Bell size={20} />

                    {

                        notifications > 0 && (

                            <span>

                                {notifications}

                            </span>

                        )

                    }

                </button>

                <button

                    className="admin-header__icon"

                    onClick={onSettings}

                >

                    <Settings size={20} />

                </button>

                <button

                    className="admin-header__profile"

                    onClick={onProfile}

                >

                    <img

                        src={

                            user?.avatar ||

                            "/avatar.png"

                        }

                        alt={user?.name}

                    />

                    <div>

                        <strong>

                            {

                                user?.name ||

                                "Administrateur"

                            }

                        </strong>

                        <small>

                            {

                                user?.role ||

                                "SUPER ADMIN"

                            }

                        </small>

                    </div>

                    <ChevronDown size={18} />

                </button>

            </div>

        </header>

    );

}

export default Header;