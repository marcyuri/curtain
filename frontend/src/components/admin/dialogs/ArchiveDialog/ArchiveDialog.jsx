import ConfirmDialog from "../ConfirmDialog";

function ArchiveDialog({

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

            title={`Archiver ${itemType}`}

            message={

                itemName

                    ? `Voulez-vous archiver "${itemName}" ? Vous pourrez le restaurer ultérieurement.`

                    : `Voulez-vous archiver ce ${itemType} ? Vous pourrez le restaurer ultérieurement.`

            }

            confirmLabel="Archiver"

            cancelLabel="Annuler"

            onCancel={onCancel}

            onConfirm={onConfirm}

        />

    );

}

export default ArchiveDialog;