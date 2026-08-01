import { X } from "lucide-react";
import { useEffect } from "react";
import "./Drawer.css";

function Drawer({
    open = false,
    title,
    children,
    onClose,
    position = "right",
    width = "400px",
    closeOnOverlay = true,
    className = ""
}) {

    useEffect(() => {

        if (!open) return;

        const handleKeyDown = (event) => {

            if (event.key === "Escape") {
                onClose?.();
            }

        };

        document.addEventListener("keydown", handleKeyDown);

        document.body.style.overflow = "hidden";

        return () => {

            document.removeEventListener("keydown", handleKeyDown);

            document.body.style.overflow = "";

        };

    }, [open, onClose]);

    if (!open) return null;

    return (

        <div className="drawer">

            <div
                className="drawer__overlay"
                onClick={() => {

                    if (closeOnOverlay) {
                        onClose?.();
                    }

                }}
            />

            <aside
                className={`drawer__panel drawer__panel--${position} ${className}`}
                style={{ width }}
            >

                <header className="drawer__header">

                    <h2 className="drawer__title">

                        {title}

                    </h2>

                    <button
                        type="button"
                        className="drawer__close"
                        onClick={onClose}
                        aria-label="Fermer"
                    >

                        <X size={20} />

                    </button>

                </header>

                <div className="drawer__content">

                    {children}

                </div>

            </aside>

        </div>

    );

}

export default Drawer;