import { useCallback, useEffect, useState } from "react";

import Button from "../../ui/Button/Button";
import Checkbox from "../../ui/Checkbox/Checkbox";
import Input from "../../ui/Input/Input";
import Textarea from "../../ui/Textarea/Textarea";

const DEFAULT_CUSTOMER = { firstName: "", lastName: "", email: "", phone: "", company: "", shippingAddress: "", shippingCity: "", shippingState: "", shippingPostalCode: "", shippingCountry: "", billingSameAsShipping: true, billingAddress: "", billingCity: "", billingState: "", billingPostalCode: "", billingCountry: "", notes: "" };
const PERSONAL_FIELDS = [{ key: "firstName", label: "Prénom", required: true }, { key: "lastName", label: "Nom", required: true }, { key: "email", label: "Email", type: "email", required: true }, { key: "phone", label: "Téléphone", required: true }, { key: "company", label: "Société" }];
const ADDRESS_FIELDS = [{ key: "Address", label: "Adresse" }, { key: "City", label: "Ville" }, { key: "State", label: "Région" }, { key: "PostalCode", label: "Code postal" }, { key: "Country", label: "Pays" }];

function renderCustomerField(field, value, error, onChange) {
    return <div key={field.key} className="checkout__field"><label>{field.label}</label><Input type={field.type} value={value} onChange={event => onChange(field.key, event.target.value)} />{error && <small className="checkout__error">{error}</small>}</div>;
}

function renderAddressFields(prefix, customer, onChange) {
    return <div className="checkout__grid">{ADDRESS_FIELDS.map(field => renderCustomerField({ ...field, key: `${prefix}${field.key}` }, customer[`${prefix}${field.key}`], undefined, onChange))}</div>;
}

function CheckoutCustomer({ value, onChange, onNext }) {
    const [customer, setCustomer] = useState({ ...DEFAULT_CUSTOMER, ...(value.customer || {}) });
    const [errors, setErrors] = useState({});

    useEffect(() => { onChange?.({ customer }); }, [customer, onChange]);
    const update = useCallback((field, fieldValue) => setCustomer(previous => ({ ...previous, [field]: fieldValue })), []);
    const validate = useCallback(() => {
        const nextErrors = {};
        const requiredFields = [["firstName", "Le prénom est obligatoire."], ["lastName", "Le nom est obligatoire."], ["email", "L'adresse email est obligatoire."], ["phone", "Le numéro de téléphone est obligatoire."], ["shippingAddress", "L'adresse est obligatoire."], ["shippingCity", "La ville est obligatoire."], ["shippingCountry", "Le pays est obligatoire."]];
        requiredFields.forEach(([field, message]) => { if (!customer[field].trim()) { nextErrors[field] = message; } });
        if (!customer.billingSameAsShipping) { [["billingAddress", "Adresse de facturation obligatoire."], ["billingCity", "Ville obligatoire."], ["billingCountry", "Pays obligatoire."]].forEach(([field, message]) => { if (!customer[field].trim()) { nextErrors[field] = message; } }); }
        setErrors(nextErrors);
        return Object.keys(nextErrors).length === 0;
    }, [customer]);
    const handleNext = useCallback(() => { if (validate()) { onNext?.(); } }, [onNext, validate]);

    return <div className="checkout__section checkout__step">
        <div className="checkout__section-header"><div><h2>Informations client</h2><p className="checkout__section-subtitle">Renseignez vos informations personnelles.</p></div></div>
        <div className="checkout__grid">{PERSONAL_FIELDS.map(field => renderCustomerField(field, customer[field.key], errors[field.key], update))}</div>
        <div className="checkout__divider" /><h3>Adresse de livraison</h3>{renderAddressFields("shipping", customer, update)}
        <div className="checkout__divider" /><Checkbox checked={customer.billingSameAsShipping} onChange={event => update("billingSameAsShipping", event.target.checked)} label="Utiliser la même adresse pour la facturation" />
        {!customer.billingSameAsShipping && <><h3>Adresse de facturation</h3>{renderAddressFields("billing", customer, update)}</>}
        <div className="checkout__divider" /><div className="checkout__field"><label>Notes de commande</label><Textarea rows={5} value={customer.notes} onChange={event => update("notes", event.target.value)} /></div>
        <div className="checkout__actions checkout__actions--end"><Button onClick={handleNext}>Continuer</Button></div>
    </div>;
}

export default CheckoutCustomer;
