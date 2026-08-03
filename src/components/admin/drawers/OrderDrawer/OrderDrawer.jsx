import Drawer from "../Drawer";

import OrderForm from "../../orders/OrderForm";

import "./OrderDrawer.css";

function OrderDrawer({

    open = false,

    mode = "create",

    order,

    loading = false,

    onClose,

    onChange,

    onSave,

}) {

    return (

        <Drawer

            open={open}

            width="1000px"

            title={

                mode === "edit"

                    ? "Modifier la commande"

                    : "Nouvelle commande"

            }

            subtitle={

                mode === "edit"

                    ? "Modifiez les informations de la commande."

                    : "Créez une nouvelle commande."

            }

            onClose={onClose}

            footer={

                <>

                    <button

                        type="button"

                        className="order-drawer__cancel"

                        onClick={onClose}

                    >

                        Annuler

                    </button>

                    <button

                        type="button"

                        className="order-drawer__save"

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

            <OrderForm

                order={order}

                onChange={onChange}

            />

        </Drawer>

    );

}

export default OrderDrawer;