import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";
import "./DataGrid.css";

function DataGrid({
    columns = [],
    rows = [],
    keyField = "id",
    loading = false,
    striped = true,
    hover = true,
    sortable = true,
    className = ""
}) {

    const [sort, setSort] = useState({
        key: null,
        direction: "asc"
    });

    const sortedRows = useMemo(() => {

        if (!sort.key) {

            return rows;

        }

        return [...rows].sort((a, b) => {

            if (a[sort.key] < b[sort.key]) {

                return sort.direction === "asc"
                    ? -1
                    : 1;

            }

            if (a[sort.key] > b[sort.key]) {

                return sort.direction === "asc"
                    ? 1
                    : -1;

            }

            return 0;

        });

    }, [rows, sort]);

    const handleSort = (key) => {

        if (!sortable) return;

        setSort(previous => ({

            key,

            direction:
                previous.key === key &&
                    previous.direction === "asc"
                    ? "desc"
                    : "asc"

        }));

    };

    return (

        <div className={`data-grid ${className}`}>

            <table className="data-grid__table">

                <thead>

                    <tr>

                        {columns.map(column => (

                            <th
                                key={column.key}
                                onClick={() => handleSort(column.key)}
                            >

                                <div className="data-grid__header">

                                    {column.label}

                                    {sortable && (

                                        <ArrowUpDown size={16} />

                                    )}

                                </div>

                            </th>

                        ))}

                    </tr>

                </thead>

                <tbody>

                    {loading && (

                        <tr>

                            <td
                                colSpan={columns.length}
                                className="data-grid__message"
                            >

                                Chargement...

                            </td>

                        </tr>

                    )}

                    {!loading &&
                        sortedRows.map((row) => (

                            <tr
                                key={row[keyField]}
                                className={`
                                    ${striped ? "data-grid__row--striped" : ""}
                                    ${hover ? "data-grid__row--hover" : ""}
                                `}
                            >

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

export default DataGrid;