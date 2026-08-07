import Drawer from "../Drawer";

import ProductForm from "../../products/ProductForm";

import "./ProductDrawer.css";

function ProductDrawer({

    open = false,

    mode = "create",

    product,

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

                    ? "Modifier le produit"

                    : "Nouveau produit"

            }

            subtitle={

                mode === "edit"

                    ? "Modifiez les informations du produit."

                    : "Ajoutez un nouveau produit au catalogue."

            }

            onClose={onClose}

            footer={

                <>

                    <button

                        type="button"

                        className="product-drawer__cancel"

                        onClick={onClose}

                    >

                        Annuler

                    </button>

                    <button

                        type="button"

                        className="product-drawer__save"

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

            <ProductForm

                product={product}

                onChange={onChange}

            />

        </Drawer>

    );

}

export default ProductDrawer;