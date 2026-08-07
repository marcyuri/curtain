import ConfirmDialog from "../ConfirmDialog";

function UnpublishDialog({

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

            variant="warning"

            title={`Dépublier ${itemType}`}

            message={

                itemName

                    ? `Voulez-vous dépublier "${itemName}" ? Il ne sera plus visible sur le site mais restera disponible dans le Back Office.`

                    : `Voulez-vous dépublier ce ${itemType} ? Il ne sera plus visible sur le site.`

            }

            confirmLabel="Dépublier"

            cancelLabel="Annuler"

            onCancel={onCancel}

            onConfirm={onConfirm}

        />

    );

}

export default UnpublishDialog;