import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import Textarea from "@components/ui/Textarea";

import "./ConsultationForm.css";

const STATUS_OPTIONS = [
    { value: "scheduled", label: "Planifiée" },
    { value: "confirmed", label: "Confirmée" },
    { value: "completed", label: "Terminée" },
    { value: "cancelled", label: "Annulée" },
];

function ConsultationForm({

    consultation = {},

    onChange,

}) {

    const handleField = (field) => (event) => {
        onChange?.({
            ...consultation,
            [field]: event.target.value,
        });
    };

    return (
        <div className="consultation-form">

            <div className="consultation-form__row">

                <Input
                    id="consultation-patient"
                    name="patientName"
                    label="Patient"
                    value={consultation.patientName ?? ""}
                    onChange={handleField("patientName")}
                    required
                />

                <Input
                    id="consultation-psychologist"
                    name="psychologistName"
                    label="Psychologue"
                    value={consultation.psychologistName ?? ""}
                    onChange={handleField("psychologistName")}
                    required
                />

            </div>

            <div className="consultation-form__row">

                <Input
                    id="consultation-date"
                    name="date"
                    type="datetime-local"
                    label="Date et heure"
                    value={consultation.date ?? ""}
                    onChange={handleField("date")}
                    required
                />

                <Select
                    id="consultation-status"
                    name="status"
                    label="Statut"
                    value={consultation.status ?? "scheduled"}
                    onChange={handleField("status")}
                    options={STATUS_OPTIONS}
                />

            </div>

            <Textarea
                id="consultation-notes"
                name="notes"
                label="Notes"
                value={consultation.notes ?? ""}
                onChange={handleField("notes")}
                rows={4}
            />

        </div>
    );
}

export default ConsultationForm;
