import "./Snackbar.css";

function Snackbar({

    open = false,

    message = "",

    actionLabel,

    onAction,

    onClose,

}) {

    if (!open) {

        return null;

    }

    return (

        <div className="snackbar">

            <span className="snackbar__message">

                {message}

            </span>

            <div className="snackbar__actions">

                {

                    actionLabel && (

                        <button

                            type="button"

                            className="snackbar__action"

                            onClick={onAction}

                        >

                            {actionLabel}

                        </button>

                    )

                }

                <button

                    type="button"

                    className="snackbar__close"

                    onClick={onClose}

                >

                    Fermer

                </button>

            </div>

        </div>

    );

}

export default Snackbar;