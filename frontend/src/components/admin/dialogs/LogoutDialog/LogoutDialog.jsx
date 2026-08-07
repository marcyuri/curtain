import ConfirmDialog from "../ConfirmDialog";

function LogoutDialog({

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

            title="Déconnexion"

            message="Voulez-vous vraiment vous déconnecter ? Vous devrez vous reconnecter pour accéder au Back Office."

            confirmLabel="Se déconnecter"

            cancelLabel="Annuler"

            onCancel={onCancel}

            onConfirm={onConfirm}

        />

    );

}

export default LogoutDialog;