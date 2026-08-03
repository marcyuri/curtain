import ConfirmDialog from "../ConfirmDialog";

function UnsavedChangesDialog({

    open = false,

    loading = false,

    onCancel,

    onConfirm,

}) {

    return (

        <ConfirmDialog

            open={open}

            loading={loading}

            variant="warning"

            title="Modifications non enregistrées"

            message="Vous avez des modifications non enregistrées. Si vous quittez cette page, elles seront perdues."

            confirmLabel="Quitter sans enregistrer"

            cancelLabel="Continuer l'édition"

            onCancel={onCancel}

            onConfirm={onConfirm}

        />

    );

}

export default UnsavedChangesDialog;