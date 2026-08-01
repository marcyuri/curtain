import { X } from "lucide-react";
import "./Modal.css";

function Modal({
    open = false,
    title,
    children,
    size = "default",
    closable = true,
    onClose
}) {

    if (!open) return null;

    return (

        <div
            className="modal"
            role="dialog"
            aria-modal="true"
        >

            <div
                className="modal__overlay"
                onClick={closable ? onClose : undefined}
            />

            <div
                className={`modal__content modal__content--${size}`}
            >

                <header className="modal__header">

                    {title && (

                        <h2 className="modal__title">

                            {title}

                        </h2>

                    )}

                    {closable && (

                        <button
                            type="button"
                            className="modal__close"
                            onClick={onClose}
                            aria-label="Fermer"
                        >

                            <X size={20} />

                        </button>

                    )}

                </header>

                <div className="modal__body">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default Modal;