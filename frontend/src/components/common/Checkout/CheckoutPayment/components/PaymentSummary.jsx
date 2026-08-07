import { ShieldCheck, TicketPercent } from "lucide-react";

function PaymentSummary({

    subtotal,

}) {

    return (
        <>

            <div className="checkout-payment__security">

                <ShieldCheck size={22} />

                <span>
                    Paiement sécurisé SSL 256 bits
                </span>

            </div>

            <div className="checkout-payment__coupon">

                <TicketPercent size={20} />

                <span>
                    Sous-total :
                    {" "}
                    <strong>
                        {subtotal.toLocaleString()}
                        FCFA
                    </strong>
                </span>

            </div>

        </>
    );

}

export default PaymentSummary;
