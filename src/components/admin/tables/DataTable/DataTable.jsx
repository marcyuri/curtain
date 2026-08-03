import {

    ArrowUp,

    ArrowDown,

    Search,

    RefreshCw,

} from "lucide-react";

import "./DataTable.css";

function DataTable({

    columns = [],

    rows = [],

    loading = false,

    searchable = true,

    selectable = true,

    search = "",

    onSearch,

    sortKey,

    sortDirection = "asc",

    onSort,

    onRefresh,

    renderActions,

}) {

    return (

        <section className="data-table">

            <header className="data-table__header">

                {

                    searchable && (

                        <div className="data-table__search">

                            <Search size={18} />

                            <input

                                type="search"

                                value={search}

                                placeholder="Rechercher..."

                                onChange={(event) =>

                                    onSearch?.(

                                        event.target.value

                                    )

                                }

                            />

                        </div>

                    )

                }

                <button

                    type="button"

                    className="data-table__refresh"

                    onClick={onRefresh}

                >

                    <RefreshCw size={18} />

                </button>

            </header>

            <div className="data-table__wrapper">

                <table>

                    <thead>

                        <tr>

                            {

                                selectable && (

                                    <th>

                                        <input

                                            type="checkbox"

                                        />

                                    </th>

                                )

                            }

                            {

                                columns.map((column) => (

                                    <th

                                        key={column.key}

                                        onClick={() =>

                                            onSort?.(

                                                column.key

                                            )

                                        }

                                    >

                                        <span>

                                            {column.label}

                                        </span>

                                        {

                                            sortKey === column.key && (

                                                sortDirection === "asc"

                                                    ? <ArrowUp size={15} />

                                                    : <ArrowDown size={15} />

                                            )

                                        }

                                    </th>

                                ))

                            }

                            {

                                renderActions && (

                                    <th>

                                        Actions

                                    </th>

                                )

                            }

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loading ? (

                                <tr>

                                    <td

                                        colSpan={

                                            columns.length + 2

                                        }

                                    >

                                        Chargement...

                                    </td>

                                </tr>

                            ) : (

                                rows.map((row) => (

                                    <tr

                                        key={row.id}

                                    >

                                        {

                                            selectable && (

                                                <td>

                                                    <input

                                                        type="checkbox"

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

                                                        renderActions(row)

                                                    }

                                                </td>

                                            )

                                        }

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

        </section>

    );

}

export default DataTable;