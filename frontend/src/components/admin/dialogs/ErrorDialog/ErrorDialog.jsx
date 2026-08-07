import ConfirmDialog from "../ConfirmDialog";

function ErrorDialog({

    open = false,

    title = "Une erreur est survenue",

    message = "L'opération n'a pas pu être réalisée.",

    confirmLabel = "Fermer",

    loading = false,

    onConfirm,

}) {

    return (

        <ConfirmDialog

            open={open}

            loading={loading}

            variant="danger"

            title={title}

            message={message}

            confirmLabel={confirmLabel}

            cancelLabel={null}

            onCancel={undefined}

            onConfirm={onConfirm}

        />

    );

}

export default ErrorDialog;