import {

    Mail,

    Phone,

    MapPin,

    Calendar,

    ShoppingBag,

} from "lucide-react";

import Modal from "../Modal";

import Avatar from "../../common/Avatar";

import StatusBadge from "../../common/StatusBadge";

import "./CustomerPreview.css";

function CustomerPreview({

    open = false,

    customer,

    onClose,

}) {

    if (!customer) {

        return null;

    }

    return (

        <Modal

            open={open}

            width="950px"

            title="Aperçu du client"

            subtitle="Consultation rapide"

            onClose={onClose}

            footer={

                <button

                    type="button"

                    className="customer-preview__close"

                    onClick={onClose}

                >

                    Fermer

                </button>

            }

        >

            <section className="customer-preview">

                <aside className="customer-preview__sidebar">

                    <Avatar

                        src={customer.avatar}

                        name={customer.name}

                        size="xl"

                    />

                    <h2>

                        {customer.name}

                    </h2>

                    <StatusBadge

                        status={customer.status}

                    />

                </aside>

                <div className="customer-preview__content">

                    <div className="customer-preview__grid">

                        <div>

                            <Mail size={18} />

                            <span>

                                {customer.email}

                            </span>

                        </div>

                        <div>

                            <Phone size={18} />

                            <span>

                                {customer.phone}

                            </span>

                        </div>

                        <div>

                            <MapPin size={18} />

                            <span>

                                {customer.address}

                            </span>

                        </div>

                        <div>

                            <Calendar size={18} />

                            <span>

                                Client depuis {customer.createdAt}

                            </span>

                        </div>

                        <div>

                            <ShoppingBag size={18} />

                            <span>

                                {customer.orders} commande(s)

                            </span>

                        </div>

                    </div>

                    <section className="customer-preview__notes">

                        <h3>

                            Notes

                        </h3>

                        <p>

                            {

                                customer.notes ||

                                "Aucune note disponible."

                            }

                        </p>

                    </section>

                </div>

            </section>

        </Modal>

    );

}

export default CustomerPreview;