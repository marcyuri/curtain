import Input from "@components/ui/Input";

function MobileMoneyField({

    value,

    onChange,

}) {

    return (
        <div className="checkout__field">

            <label>
                Numéro Mobile Money
            </label>

            <Input
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

        </div>
    );

}

export default MobileMoneyField;
