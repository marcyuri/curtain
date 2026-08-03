import ConfirmDialog from "../ConfirmDialog";

function WarningDialog({

    open = false,

    title = "Attention",

    message = "Êtes-vous sûr de vouloir continuer ?",

    confirmLabel = "Continuer",

    cancelLabel = "Annuler",

    loading = false,

    onCancel,

    onConfirm,

}) {

    return (

        <ConfirmDialog

            open={open}

            loading={loading}

            variant="warning"

            title={title}

            message={message}

            confirmLabel={confirmLabel}

            cancelLabel={cancelLabel}

            onCancel={onCancel}

            onConfirm={onConfirm}

        />

    );

}

export default WarningDialog;