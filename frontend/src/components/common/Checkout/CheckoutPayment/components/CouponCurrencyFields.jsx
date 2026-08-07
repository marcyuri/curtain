import Input from "@components/ui/Input";
import Select from "@components/ui/Select";

const CURRENCY_OPTIONS = [
    { label: "FCFA", value: "FCFA" },
    { label: "EUR", value: "EUR" },
    { label: "USD", value: "USD" },
];

function CouponCurrencyFields({

    coupon,

    onCouponChange,

}) {

    return (
        <div className="checkout__grid">

            <div className="checkout__field">

                <label>
                    Code promo
                </label>

                <Input
                    value={coupon}
                    onChange={(e) => onCouponChange(e.target.value)}
                    placeholder="LOVE2026"
                />

            </div>

            <div className="checkout__field">

                <label>
                    Devise
                </label>

                <Select
                    value="FCFA"
                    options={CURRENCY_OPTIONS}
                />

            </div>

        </div>
    );

}

export default CouponCurrencyFields;
