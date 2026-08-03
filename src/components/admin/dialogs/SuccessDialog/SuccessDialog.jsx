import ConfirmDialog from "../ConfirmDialog";

function SuccessDialog({

    open = false,

    title = "Opération réussie",

    message = "L'action a été exécutée avec succès.",

    confirmLabel = "Fermer",

    loading = false,

    onConfirm,

}) {

    return (

        <ConfirmDialog

            open={open}

            loading={loading}

            variant="success"

            title={title}

            message={message}

            confirmLabel={confirmLabel}

            cancelLabel={null}

            onCancel={undefined}

            onConfirm={onConfirm}

        />

    );

}

export default SuccessDialog;