import {
    Download,
    Printer,
    Mail,
    FileText,
    Calendar,
    CreditCard,
    User,
    Building2,
} from "lucide-react";

import Button from "../../form/Button";

import "./InvoiceViewer.css";

function InvoiceViewer({

    invoice,

    onDownload,

    onPrint,

    onSend,

}) {

    if (!invoice) {

        return (

            <section className="invoice-viewer invoice-viewer--empty">

                <FileText size={64} />

                <h3>

                    Aucune facture disponible

                </h3>

            </section>

        );

    }

    return (

        <section className="invoice-viewer">

            <header className="invoice-viewer__header">

                <div>

                    <h2>

                        Facture

                    </h2>

                    <span>

                        {invoice.number}

                    </span>

                </div>

                <div className="invoice-viewer__actions">

                    <Button
                        variant="outline"
                        onClick={() => onPrint?.(invoice)}
                    >

                        <Printer size={18} />

                        Imprimer

                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => onSend?.(invoice)}
                    >

                        <Mail size={18} />

                        Envoyer

                    </Button>

                    <Button
                        onClick={() => onDownload?.(invoice)}
                    >

                        <Download size={18} />

                        Télécharger

                    </Button>

                </div>

            </header>

            <div className="invoice-viewer__grid">

                <div className="invoice-viewer__card">

                    <Building2 size={18} />

                    <div>

                        <strong>

                            Entreprise

                        </strong>

                        <p>

                            {invoice.company}

                        </p>

                    </div>

                </div>

                <div className="invoice-viewer__card">

                    <User size={18} />

                    <div>

                        <strong>

                            Client

                        </strong>

                        <p>

                            {invoice.customer}

                        </p>

                    </div>

                </div>

                <div className="invoice-viewer__card">

                    <Calendar size={18} />

                    <div>

                        <strong>

                            Date

                        </strong>

                        <p>

                            {invoice.date}

                        </p>

                    </div>

                </div>

                <div className="invoice-viewer__card">

                    <CreditCard size={18} />

                    <div>

                        <strong>

                            Paiement

                        </strong>

                        <p>

                            {invoice.paymentMethod}

                        </p>

                    </div>

                </div>

            </div>

            <table className="invoice-viewer__table">

                <thead>

                    <tr>

                        <th>Article</th>

                        <th>Qté</th>

                        <th>Prix</th>

                        <th>Total</th>

                    </tr>

                </thead>

                <tbody>

                    {invoice.items.map((item) => (

                        <tr key={item.id}>

                            <td>

                                {item.name}

                            </td>

                            <td>

                                {item.quantity}

                            </td>

                            <td>

                                {item.price.toLocaleString()} FCFA

                            </td>

                            <td>

                                {(item.quantity * item.price).toLocaleString()} FCFA

                            </td>

                        </tr>

                    ))}

                </tbody>

            </table>

            <div className="invoice-viewer__summary">

                <div>

                    <span>

                        Sous-total

                    </span>

                    <strong>

                        {invoice.subtotal.toLocaleString()} FCFA

                    </strong>

                </div>

                <div>

                    <span>

                        TVA

                    </span>

                    <strong>

                        {invoice.tax.toLocaleString()} FCFA

                    </strong>

                </div>

                <div className="invoice-viewer__total">

                    <span>

                        Total

                    </span>

                    <strong>

                        {invoice.total.toLocaleString()} FCFA

                    </strong>

                </div>

            </div>

        </section>

    );

}

export default InvoiceViewer;