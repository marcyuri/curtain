import "./DataTable.css";

function DataTable({
    columns = [],
    data = [],
    keyField = "id",
    loading = false,
    emptyMessage = "Aucune donnée disponible.",
    selectable = false,
    selectedRows = [],
    onRowSelect,
    onRowClick,
    className = ""
}) {

    const handleSelectAll = (checked) => {

        if (!onRowSelect) return;

        if (checked) {

            onRowSelect(data.map(item => item[keyField]));

        } else {

            onRowSelect([]);

        }

    };

    const toggleRow = (id) => {

        if (!onRowSelect) return;

        const exists = selectedRows.includes(id);

        if (exists) {

            onRowSelect(
                selectedRows.filter(value => value !== id)
            );

        } else {

            onRowSelect([
                ...selectedRows,
                id
            ]);

        }

    };

    return (

        <div className={`datatable ${className}`}>

            <table className="datatable__table">

                <thead>

                    <tr>

                        {selectable && (

                            <th>

                                <input
                                    type="checkbox"
                                    checked={
                                        data.length > 0 &&
                                        selectedRows.length === data.length
                                    }
                                    onChange={(event) =>
                                        handleSelectAll(event.target.checked)
                                    }
                                />

                            </th>

                        )}

                        {columns.map(column => (

                            <th key={column.key}>

                                {column.label}

                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {loading && (

                        <tr>

                            <td
                                colSpan={
                                    columns.length +
                                    (selectable ? 1 : 0)
                                }
                                className="datatable__message"
                            >

                                Chargement...

                            </td>

                        </tr>

                    )}

                    {!loading && data.length === 0 && (

                        <tr>

                            <td
                                colSpan={
                                    columns.length +
                                    (selectable ? 1 : 0)
                                }
                                className="datatable__message"
                            >

                                {emptyMessage}

                            </td>

                        </tr>

                    )}

                    {!loading &&
                        data.map((row) => (

                            <tr
                                key={row[keyField]}
                                onClick={() => onRowClick?.(row)}
                            >

                                {selectable && (

                                    <td>

                                        <input
                                            type="checkbox"
                                            checked={
                                                selectedRows.includes(
                                                    row[keyField]
                                                )
                                            }
                                            onChange={() =>
                                                toggleRow(row[keyField])
                                            }
                                            onClick={(event) =>
                                                event.stopPropagation()
                                            }
                                        />

                                    </td>

                                )}

                                {columns.map(column => (

                                    <td key={column.key}>

                                        {column.render
                                            ? column.render(row)
                                            : row[column.key]}

                                    </td>

                                ))}

                            </tr>

                        ))}

                </tbody>

            </table>

        </div>

    );

}

export default DataTable;