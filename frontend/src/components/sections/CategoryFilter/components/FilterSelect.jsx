function FilterSelect({

    label,

    value,

    options,

    onChange,

    allLabel = "Toutes",

}) {

    return (
        <div className="category-filter__group">

            <label>
                {label}
            </label>

            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
            >

                <option value="">
                    {allLabel}
                </option>

                {options.map((item) => {

                    const optionValue = typeof item === "object" ? item.value : item;
                    const optionLabel = typeof item === "object" ? item.label : item;

                    return (

                        <option
                            key={optionValue}
                            value={optionValue}
                        >
                            {optionLabel}
                        </option>

                    );

                })}

            </select>

        </div>
    );

}

export default FilterSelect;
