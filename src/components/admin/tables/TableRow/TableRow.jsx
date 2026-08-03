import "./TableRow.css";

function TableRow({

    row,

    columns = [],

    selected = false,

    disabled = false,

    clickable = false,

    selectable = true,

    renderActions,

    onSelect,

    onClick,

    onDoubleClick,

    onContextMenu,

}) {

    return (

        <tr

            className={`
                table-row
                ${selected ? "table-row--selected" : ""}
                ${disabled ? "table-row--disabled" : ""}
                ${clickable ? "table-row--clickable" : ""}
            `}

            onClick={() =>

                clickable &&

                onClick?.(row)

            }

            onDoubleClick={() =>

                onDoubleClick?.(row)

            }

            onContextMenu={(event) => {

                event.preventDefault();

                onContextMenu?.(

                    event,

                    row

                );

            }}

        >

            {

                selectable && (

                    <td>

                        <input

                            type="checkbox"

                            checked={selected}

                            disabled={disabled}

                            onChange={() =>

                                onSelect?.(row)

                            }

                        />

                    </td>

                )

            }

            {

                columns.map((column) => (

                    <td

                        key={column.key}

                    >

                        {

                            column.render

                                ? column.render(row)

                                : row[column.key]

                        }

                    </td>

                ))

            }

            {

                renderActions && (

                    <td>

                        {

                            renderActions(

                                row

                            )

                        }

                    </td>

                )

            }

        </tr>

    );

}

export default TableRow;