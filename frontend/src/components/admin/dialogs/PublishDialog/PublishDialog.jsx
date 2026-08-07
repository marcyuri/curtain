import ConfirmDialog from "../ConfirmDialog";

function PublishDialog({

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

            title={`Publier ${itemType}`}

            message={

                itemName

                    ? `Voulez-vous publier "${itemName}" ? Il sera immédiatement visible sur le site.`

                    : `Voulez-vous publier ce ${itemType} ? Il sera immédiatement visible.`

            }

            confirmLabel="Publier"

            cancelLabel="Annuler"

            onCancel={onCancel}

            onConfirm={onConfirm}

        />

    );

}

export default PublishDialog;