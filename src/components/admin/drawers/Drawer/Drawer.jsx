import {

    X,

} from "lucide-react";

import "./Drawer.css";

function Drawer({

    open = false,

    title = "",

    subtitle = "",

    width = "600px",

    children,

    footer,

    onClose,

}) {

    if (!open) {

        return null;

    }

    return (

        <div

            className="drawer-overlay"

            onClick={onClose}

        >

            <aside

                className="drawer"

                style={{

                    width,

                }}

                onClick={(event) =>

                    event.stopPropagation()

                }

            >

                <header className="drawer-header">

                    <div>

                        <h2>

                            {title}

                        </h2>

                        {

                            subtitle && (

                                <p>

                                    {subtitle}

                                </p>

                            )

                        }

                    </div>

                    <button

                        type="button"

                        onClick={onClose}

                    >

                        <X size={20} />

                    </button>

                </header>

                <div className="drawer-content">

                    {children}

                </div>

                {

                    footer && (

                        <footer className="drawer-footer">

                            {footer}

                        </footer>

                    )

                }

            </aside>

        </div>

    );

}

export default Drawer;