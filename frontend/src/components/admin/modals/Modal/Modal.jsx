import {

    X,

} from "lucide-react";

import "./Modal.css";

function Modal({

    open = false,

    title = "",

    subtitle = "",

    width = "700px",

    children,

    footer,

    onClose,

}) {

    if (!open) {

        return null;

    }

    return (

        <div

            className="modal-overlay"

            onClick={onClose}

        >

            <div

                className="modal"

                style={{

                    width,

                }}

                onClick={(event) =>

                    event.stopPropagation()

                }

            >

                <header className="modal-header">

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

                <div className="modal-content">

                    {children}

                </div>

                {

                    footer && (

                        <footer className="modal-footer">

                            {footer}

                        </footer>

                    )

                }

            </div>

        </div>

    );

}

export default Modal;