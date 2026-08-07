import {

    AlertTriangle,

    X,

} from "lucide-react";

import "./ConfirmDialog.css";

function ConfirmDialog({

    open = false,

    title = "Confirmation",

    message = "",

    confirmLabel = "Confirmer",

    cancelLabel = "Annuler",

    variant = "danger",

    loading = false,

    onCancel,

    onConfirm,

}) {

    if (!open) {

        return null;

    }

    return (

        <div className="confirm-dialog__overlay">

            <div className="confirm-dialog">

                <header className="confirm-dialog__header">

                    <div>

                        <AlertTriangle size={24} />

                    </div>

                    <button

                        onClick={onCancel}

                    >

                        <X size={18} />

                    </button>

                </header>

                <section className="confirm-dialog__body">

                    <h2>

                        {title}

                    </h2>

                    <p>

                        {message}

                    </p>

                </section>

                <footer className="confirm-dialog__footer">

                    {

                        cancelLabel && (

                            <button

                                type="button"

                                onClick={onCancel}

                            >

                                {cancelLabel}

                            </button>

                        )

                    }

                    <button

                        type="button"

                        disabled={loading}

                        className={`confirm-dialog__confirm confirm-dialog__confirm--${variant}`}

                        onClick={onConfirm}

                    >

                        {

                            loading

                                ? "Chargement..."

                                : confirmLabel

                        }

                    </button>

                </footer>

            </div>

        </div>

    );

}

export default ConfirmDialog;