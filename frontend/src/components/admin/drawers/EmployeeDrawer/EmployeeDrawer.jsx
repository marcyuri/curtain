import Drawer from "../Drawer";

import EmployeeForm from "../../employees/EmployeeForm";

import "./EmployeeDrawer.css";

function EmployeeDrawer({

    open = false,

    mode = "create",

    employee,

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

                    ? "Modifier l'employé"

                    : "Nouvel employé"

            }

            subtitle={

                mode === "edit"

                    ? "Modifiez les informations de l'employé."

                    : "Ajoutez un nouvel employé."

            }

            onClose={onClose}

            footer={

                <>

                    <button

                        type="button"

                        className="employee-drawer__cancel"

                        onClick={onClose}

                    >

                        Annuler

                    </button>

                    <button

                        type="button"

                        className="employee-drawer__save"

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

            <EmployeeForm

                employee={employee}

                onChange={onChange}

            />

        </Drawer>

    );

}

export default EmployeeDrawer;