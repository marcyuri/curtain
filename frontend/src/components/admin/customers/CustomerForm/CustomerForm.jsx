import Input from "@components/ui/Input";
import Select from "@components/ui/Select";

import "./CustomerForm.css";

const STATUS_OPTIONS = [
    { value: "active", label: "Actif" },
    { value: "inactive", label: "Inactif" },
];

function CustomerForm({

    customer = {},

    onChange,

}) {

    const handleField = (field) => (event) => {
        onChange?.({
            ...customer,
            [field]: event.target.value,
        });
    };

    return (
        <div className="customer-form">

            <div className="customer-form__row">

                <Input
                    id="customer-firstname"
                    name="firstname"
                    label="Prénom"
                    value={customer.firstname ?? ""}
                    onChange={handleField("firstname")}
                    required
                />

                <Input
                    id="customer-lastname"
                    name="lastname"
                    label="Nom"
                    value={customer.lastname ?? ""}
                    onChange={handleField("lastname")}
                    required
                />

            </div>

            <Input
                id="customer-email"
                name="email"
                type="email"
                label="Email"
                value={customer.email ?? ""}
                onChange={handleField("email")}
                required
            />

            <div className="customer-form__row">

                <Input
                    id="customer-phone"
                    name="phone"
                    type="tel"
                    label="Téléphone"
                    value={customer.phone ?? ""}
                    onChange={handleField("phone")}
                />

                <Select
                    id="customer-status"
                    name="status"
                    label="Statut"
                    value={customer.status ?? "active"}
                    onChange={handleField("status")}
                    options={STATUS_OPTIONS}
                />

            </div>

        </div>
    );
}

export default CustomerForm;
