import { useEffect, useState } from "react";

import Input from "../../form/Input";
import Textarea from "../../form/Textarea";
import Checkbox from "../../form/Checkbox";
import Button from "../../form/Button";

const DEFAULT_CUSTOMER = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    company: "",

    shippingAddress: "",
    shippingCity: "",
    shippingState: "",
    shippingPostalCode: "",
    shippingCountry: "",

    billingSameAsShipping: true,

    billingAddress: "",
    billingCity: "",
    billingState: "",
    billingPostalCode: "",
    billingCountry: "",

    notes: "",
};

function CheckoutCustomer({

    value,

    onChange,

    onNext,

}) {

    const [customer, setCustomer] = useState({

        ...DEFAULT_CUSTOMER,

        ...(value.customer || {}),

    });

    const [errors, setErrors] = useState({});

    useEffect(() => {

        onChange?.({

            customer,

        });

    }, [customer]);

    const update = (field, fieldValue) => {

        setCustomer(previous => ({

            ...previous,

            [field]: fieldValue,

        }));

    };

    const validate = () => {

        const nextErrors = {};

        if (!customer.firstName.trim()) {
            nextErrors.firstName =
                "Le prénom est obligatoire.";
        }

        if (!customer.lastName.trim()) {
            nextErrors.lastName =
                "Le nom est obligatoire.";
        }

        if (!customer.email.trim()) {
            nextErrors.email =
                "L'adresse email est obligatoire.";
        }

        if (!customer.phone.trim()) {
            nextErrors.phone =
                "Le numéro de téléphone est obligatoire.";
        }

        if (!customer.shippingAddress.trim()) {
            nextErrors.shippingAddress =
                "L'adresse est obligatoire.";
        }

        if (!customer.shippingCity.trim()) {
            nextErrors.shippingCity =
                "La ville est obligatoire.";
        }

        if (!customer.shippingCountry.trim()) {
            nextErrors.shippingCountry =
                "Le pays est obligatoire.";
        }

        if (!customer.billingSameAsShipping) {

            if (!customer.billingAddress.trim()) {
                nextErrors.billingAddress =
                    "Adresse de facturation obligatoire.";
            }

            if (!customer.billingCity.trim()) {
                nextErrors.billingCity =
                    "Ville obligatoire.";
            }

            if (!customer.billingCountry.trim()) {
                nextErrors.billingCountry =
                    "Pays obligatoire.";
            }

        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;

    };

    const handleNext = () => {

        if (!validate()) {

            return;

        }

        onNext?.();

    };

    return (

        <div className="checkout__section checkout__step">

            <div className="checkout__section-header">

                <div>

                    <h2>

                        Informations client

                    </h2>

                    <p className="checkout__section-subtitle">

                        Renseignez vos informations personnelles.

                    </p>

                </div>

            </div>

            <div className="checkout__grid">

                <div className="checkout__field">

                    <label>Prénom</label>

                    <Input
                        value={customer.firstName}
                        onChange={(e) =>
                            update(
                                "firstName",
                                e.target.value
                            )
                        }
                    />

                    {errors.firstName && (
                        <small className="checkout__error">
                            {errors.firstName}
                        </small>
                    )}

                </div>

                <div className="checkout__field">

                    <label>Nom</label>

                    <Input
                        value={customer.lastName}
                        onChange={(e) =>
                            update(
                                "lastName",
                                e.target.value
                            )
                        }
                    />

                    {errors.lastName && (
                        <small className="checkout__error">
                            {errors.lastName}
                        </small>
                    )}

                </div>

                <div className="checkout__field">

                    <label>Email</label>

                    <Input
                        type="email"
                        value={customer.email}
                        onChange={(e) =>
                            update(
                                "email",
                                e.target.value
                            )
                        }
                    />

                    {errors.email && (
                        <small className="checkout__error">
                            {errors.email}
                        </small>
                    )}

                </div>

                <div className="checkout__field">

                    <label>Téléphone</label>

                    <Input
                        value={customer.phone}
                        onChange={(e) =>
                            update(
                                "phone",
                                e.target.value
                            )
                        }
                    />

                    {errors.phone && (
                        <small className="checkout__error">
                            {errors.phone}
                        </small>
                    )}

                </div>

                <div className="checkout__field">

                    <label>Société</label>

                    <Input
                        value={customer.company}
                        onChange={(e) =>
                            update(
                                "company",
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>

            <div className="checkout__divider" />

            <h3>

                Adresse de livraison

            </h3>

            <div className="checkout__grid">

                <div className="checkout__field">

                    <label>Adresse</label>

                    <Input
                        value={customer.shippingAddress}
                        onChange={(e) =>
                            update(
                                "shippingAddress",
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="checkout__field">

                    <label>Ville</label>

                    <Input
                        value={customer.shippingCity}
                        onChange={(e) =>
                            update(
                                "shippingCity",
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="checkout__field">

                    <label>Région</label>

                    <Input
                        value={customer.shippingState}
                        onChange={(e) =>
                            update(
                                "shippingState",
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="checkout__field">

                    <label>Code postal</label>

                    <Input
                        value={customer.shippingPostalCode}
                        onChange={(e) =>
                            update(
                                "shippingPostalCode",
                                e.target.value
                            )
                        }
                    />

                </div>

                <div className="checkout__field">

                    <label>Pays</label>

                    <Input
                        value={customer.shippingCountry}
                        onChange={(e) =>
                            update(
                                "shippingCountry",
                                e.target.value
                            )
                        }
                    />

                </div>

            </div>

            <div className="checkout__divider" />

            <Checkbox
                checked={customer.billingSameAsShipping}
                onChange={(e) =>

                    update(

                        "billingSameAsShipping",

                        e.target.checked

                    )

                }
                label="Utiliser la même adresse pour la facturation"
            />

            {!customer.billingSameAsShipping && (

                <>

                    <h3>

                        Adresse de facturation

                    </h3>

                    <div className="checkout__grid">

                        <div className="checkout__field">

                            <label>Adresse</label>

                            <Input
                                value={customer.billingAddress}
                                onChange={(e) =>
                                    update(
                                        "billingAddress",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="checkout__field">

                            <label>Ville</label>

                            <Input
                                value={customer.billingCity}
                                onChange={(e) =>
                                    update(
                                        "billingCity",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="checkout__field">

                            <label>Région</label>

                            <Input
                                value={customer.billingState}
                                onChange={(e) =>
                                    update(
                                        "billingState",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="checkout__field">

                            <label>Code postal</label>

                            <Input
                                value={customer.billingPostalCode}
                                onChange={(e) =>
                                    update(
                                        "billingPostalCode",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                        <div className="checkout__field">

                            <label>Pays</label>

                            <Input
                                value={customer.billingCountry}
                                onChange={(e) =>
                                    update(
                                        "billingCountry",
                                        e.target.value
                                    )
                                }
                            />

                        </div>

                    </div>

                </>

            )}

            <div className="checkout__divider" />

            <div className="checkout__field">

                <label>

                    Notes de commande

                </label>

                <Textarea
                    rows={5}
                    value={customer.notes}
                    onChange={(e) =>
                        update(
                            "notes",
                            e.target.value
                        )
                    }
                />

            </div>

            <div className="checkout__actions checkout__actions--end">

                <Button
                    onClick={handleNext}
                >
                    Continuer
                </Button>

            </div>

        </div>

    );

}

export default CheckoutCustomer;