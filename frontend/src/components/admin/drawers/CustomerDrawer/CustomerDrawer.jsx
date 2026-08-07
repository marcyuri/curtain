import Drawer from "../Drawer";

import CustomerForm from "../../customers/CustomerForm";

import "./CustomerDrawer.css";

function CustomerDrawer({

    open = false,

    mode = "create",

    customer,

    loading = false,

    onClose,

    onChange,

    onSave,

}) {

    return (

        <Drawer

            open={open}

            width="900px"

            title={

                mode === "edit"

                    ? "Modifier le client"

                    : "Nouveau client"

            }

            subtitle={

                mode === "edit"

                    ? "Modifiez les informations du client."

                    : "Ajoutez un nouveau client."

            }

            onClose={onClose}

            footer={

                <>

                    <button

                        type="button"

                        className="customer-drawer__cancel"

                        onClick={onClose}

                    >

                        Annuler

                    </button>

                    <button

                        type="button"

                        className="customer-drawer__save"

                        disabled={loading}

                        onClick={onSave}

                    >

                        {

                            loading

                                ? "Enregistrement..."

                                : (

                                    mode === "edit"

                                        ? "Enregistrer"

                                        : "Créer"

                                )

                        }

                    </button>

                </>

            }

        >

            <CustomerForm

                customer={customer}

                onChange={onChange}

            />

        </Drawer>

    );

}

export default CustomerDrawer;