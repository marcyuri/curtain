import Drawer from "../Drawer";

import EventForm from "../../events/EventForm";

import "./EventDrawer.css";

function EventDrawer({

    open = false,

    mode = "create",

    event,

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

                    ? "Modifier l'évènement"

                    : "Nouvel évènement"

            }

            subtitle={

                mode === "edit"

                    ? "Modifiez les informations de l'évènement."

                    : "Créez un nouvel évènement."

            }

            onClose={onClose}

            footer={

                <>

                    <button

                        type="button"

                        className="event-drawer__cancel"

                        onClick={onClose}

                    >

                        Annuler

                    </button>

                    <button

                        type="button"

                        className="event-drawer__save"

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

            <EventForm

                event={event}

                onChange={onChange}

            />

        </Drawer>

    );

}

export default EventDrawer;