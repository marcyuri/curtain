import { CalendarDays } from "lucide-react";

function DeliveryEstimate({

    estimatedDate,

}) {

    if (!estimatedDate) {
        return null;
    }

    return (
        <div className="checkout-shipping__estimate">

            <CalendarDays size={18} />
            Livraison estimée :
            <strong>
                {estimatedDate}
            </strong>

        </div>
    );

}

export default DeliveryEstimate;
