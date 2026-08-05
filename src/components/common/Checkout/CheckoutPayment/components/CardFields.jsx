import Input from "@components/ui/Input";

function CardFields({

    payment,

    onFieldChange,

}) {

    return (
        <div className="checkout__grid">

            <div className="checkout__field">

                <label>
                    Nom du titulaire
                </label>

                <Input
                    value={payment.cardName}
                    onChange={(e) => onFieldChange("cardName", e.target.value)}
                />

            </div>

            <div className="checkout__field">

                <label>
                    Numéro de carte
                </label>

                <Input
                    value={payment.cardNumber}
                    onChange={(e) => onFieldChange("cardNumber", e.target.value)}
                />

            </div>

            <div className="checkout__field">

                <label>
                    Expiration
                </label>

                <Input
                    placeholder="MM/AA"
                    value={payment.expiry}
                    onChange={(e) => onFieldChange("expiry", e.target.value)}
                />

            </div>

            <div className="checkout__field">

                <label>
                    CVV
                </label>

                <Input
                    value={payment.cvv}
                    onChange={(e) => onFieldChange("cvv", e.target.value)}
                />

            </div>

        </div>
    );

}

export default CardFields;
