function PriceRangeInputs({

    minPrice,

    maxPrice,

    onMinChange,

    onMaxChange,

}) {

    return (
        <div className="category-filter__prices">

            <div>

                <label>
                    Prix min
                </label>

                <input
                    type="number"
                    value={minPrice}
                    onChange={(event) => onMinChange(event.target.value)}
                />

            </div>

            <div>

                <label>
                    Prix max
                </label>

                <input
                    type="number"
                    value={maxPrice}
                    onChange={(event) => onMaxChange(event.target.value)}
                />

            </div>

        </div>
    );

}

export default PriceRangeInputs;
