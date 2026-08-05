import Select from "@components/ui/Select";

import { DEFAULT_TIME_SLOTS } from "../constants/timeSlots";

function DeliveryScheduleFields({

    deliveryDate,

    deliveryTime,

    onDateChange,

    onTimeChange,

}) {

    return (
        <div className="checkout__grid">

            <div className="checkout__field">

                <label>
                    Date souhaitée
                </label>

                <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => onDateChange(e.target.value)}
                />

            </div>

            <div className="checkout__field">

                <label>
                    Créneau horaire
                </label>

                <Select
                    value={deliveryTime}
                    onChange={(e) => onTimeChange(e.target.value)}
                    options={DEFAULT_TIME_SLOTS}
                />

            </div>

        </div>
    );

}

export default DeliveryScheduleFields;
