import Drawer from "../Drawer";

import ConsultationForm from "../../consultations/ConsultationForm";

import "./ConsultationDrawer.css";

function ConsultationDrawer({

    open = false,

    mode = "create",

    consultation,

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

                    ? "Modifier la consultation"

                    : "Nouvelle consultation"

            }

            subtitle={

                mode === "edit"

                    ? "Modifiez les informations de la consultation."

                    : "Planifiez une nouvelle consultation."

            }

            onClose={onClose}

            footer={

                <>

                    <button

                        type="button"

                        className="consultation-drawer__cancel"

                        onClick={onClose}

                    >

                        Annuler

                    </button>

                    <button

                        type="button"

                        className="consultation-drawer__save"

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

            <ConsultationForm

                consultation={consultation}

                onChange={onChange}

            />

        </Drawer>

    );

}

export default ConsultationDrawer;