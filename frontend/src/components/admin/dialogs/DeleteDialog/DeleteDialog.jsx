import ConfirmDialog from "../ConfirmDialog";

function DeleteDialog({

    open = false,

    itemName = "",

    itemType = "élément",

    loading = false,

    onCancel,

    onConfirm,

}) {

    return (

        <ConfirmDialog

            open={open}

            loading={loading}

            variant="danger"

            title={`Supprimer ${itemType}`}

            message={

                itemName

                    ? `Voulez-vous vraiment supprimer "${itemName}" ? Cette action est irréversible.`

                    : `Voulez-vous vraiment supprimer ce ${itemType} ? Cette action est irréversible.`

            }

            confirmLabel="Supprimer"

            cancelLabel="Annuler"

            onCancel={onCancel}

            onConfirm={onConfirm}

        />

    );

}

export default DeleteDialog;