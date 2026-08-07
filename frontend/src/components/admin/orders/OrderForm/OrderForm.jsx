import Input from "@components/ui/Input";
import Select from "@components/ui/Select";
import Textarea from "@components/ui/Textarea";

import "./OrderForm.css";

const STATUS_OPTIONS = [
    { value: "draft", label: "Brouillon" },
    { value: "pending", label: "En attente" },
    { value: "confirmed", label: "Confirmée" },
    { value: "processing", label: "En traitement" },
    { value: "shipped", label: "Expédiée" },
    { value: "delivered", label: "Livrée" },
    { value: "cancelled", label: "Annulée" },
    { value: "refunded", label: "Remboursée" },
];

function OrderForm({

    order = {},

    onChange,

}) {

    const handleField = (field) => (event) => {
        onChange?.({
            ...order,
            [field]: event.target.value,
        });
    };

    return (
        <div className="order-form">

            <div className="order-form__row">

                <Input
                    id="order-customer"
                    name="customerName"
                    label="Client"
                    value={order.customerName ?? ""}
                    onChange={handleField("customerName")}
                    required
                />

                <Select
                    id="order-status"
                    name="status"
                    label="Statut"
                    value={order.status ?? "pending"}
                    onChange={handleField("status")}
                    options={STATUS_OPTIONS}
                />

            </div>

            <Input
                id="order-total"
                name="total"
                type="number"
                label="Montant total"
                value={order.total ?? ""}
                onChange={handleField("total")}
            />

            <Textarea
                id="order-notes"
                name="notes"
                label="Notes"
                value={order.notes ?? ""}
                onChange={handleField("notes")}
                rows={4}
            />

        </div>
    );
}

export default OrderForm;
