import ConfirmDialog from "../ConfirmDialog";

function RestoreDialog({

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

            variant="success"

            title={`Restaurer ${itemType}`}

            message={

                itemName

                    ? `Voulez-vous restaurer "${itemName}" ? Il redeviendra disponible.`

                    : `Voulez-vous restaurer ce ${itemType} ? Il redeviendra disponible.`

            }

            confirmLabel="Restaurer"

            cancelLabel="Annuler"

            onCancel={onCancel}

            onConfirm={onConfirm}

        />

    );

}

export default RestoreDialog;