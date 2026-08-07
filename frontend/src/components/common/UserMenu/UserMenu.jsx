import { useEffect, useRef, useState } from "react";

import {
    User,
    Settings,
    Bell,
    Shield,
    LogOut,
    ChevronDown,
} from "lucide-react";

import "./UserMenu.css";

function UserMenu({

    user = {},

    onProfile,

    onSettings,

    onNotifications,

    onSecurity,

    onLogout,

}) {

    const [open, setOpen] = useState(false);

    const menuRef = useRef(null);

    useEffect(() => {

        const handleClick = (event) => {

            if (

                menuRef.current &&
                !menuRef.current.contains(event.target)

            ) {

                setOpen(false);

            }

        };

        document.addEventListener("click", handleClick);

        return () => {

            document.removeEventListener(
                "click",
                handleClick
            );

        };

    }, []);

    return (

        <div
            className="user-menu"
            ref={menuRef}
        >

            <button
                className="user-menu__trigger"
                onClick={() => setOpen(!open)}
            >

                <img
                    src={
                        user.avatar ||

                        "https://ui-avatars.com/api/?name=User"
                    }
                    alt={user.name}
                />

                <div>

                    <strong>

                        {user.name || "Utilisateur"}

                    </strong>

                    <small>

                        {user.role || "Membre"}

                    </small>

                </div>

                <ChevronDown
                    size={18}
                />

            </button>

            {open && (

                <div className="user-menu__dropdown">

                    <button
                        onClick={onProfile}
                    >

                        <User size={18} />

                        Profil

                    </button>

                    <button
                        onClick={onNotifications}
                    >

                        <Bell size={18} />

                        Notifications

                    </button>

                    <button
                        onClick={onSettings}
                    >

                        <Settings size={18} />

                        Paramètres

                    </button>

                    <button
                        onClick={onSecurity}
                    >

                        <Shield size={18} />

                        Sécurité

                    </button>

                    <div className="user-menu__divider" />

                    <button
                        className="user-menu__logout"
                        onClick={onLogout}
                    >

                        <LogOut size={18} />

                        Déconnexion

                    </button>

                </div>

            )}

        </div>

    );

}

export default UserMenu;