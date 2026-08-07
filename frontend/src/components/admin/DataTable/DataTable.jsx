import {

    ChevronLeft,

    ChevronRight,

    Search,

    Download,

    Filter,

    Plus,

} from "lucide-react";

import "./DataTable.css";

function DataTable({

    title,

    subtitle,

    columns = [],

    rows = [],

    loading = false,

    onSearch,

    onFilter,

    onExport,

    onCreate,

}) {

    return (

        <section className="data-table">

            <header className="data-table__header">

                <div>

                    <h2>

                        {title}

                    </h2>

                    {

                        subtitle && (

                            <p>

                                {subtitle}

                            </p>

                        )

                    }

                </div>

                <div className="data-table__actions">

                    <div className="data-table__search">

                        <Search size={18} />

                        <input

                            placeholder="Rechercher..."

                            onChange={(event) =>

                                onSearch?.(

                                    event.target.value

                                )

                            }

                        />

                    </div>

                    <button

                        onClick={onFilter}

                    >

                        <Filter size={18} />

                    </button>

                    <button

                        onClick={onExport}

                    >

                        <Download size={18} />

                    </button>

                    <button

                        className="data-table__create"

                        onClick={onCreate}

                    >

                        <Plus size={18} />

                        Ajouter

                    </button>

                </div>

            </header>

            <div className="data-table__wrapper">

                <table>

                    <thead>

                        <tr>

                            {

                                columns.map((column) => (

                                    <th

                                        key={column.key}

                                    >

                                        {column.label}

                                    </th>

                                ))

                            }

                        </tr>

                    </thead>

                    <tbody>

                        {

                            loading ? (

                                <tr>

                                    <td

                                        colSpan={columns.length}

                                        className="data-table__loading"

                                    >

                                        Chargement...

                                    </td>

                                </tr>

                            ) : rows.length === 0 ? (

                                <tr>

                                    <td

                                        colSpan={columns.length}

                                        className="data-table__empty"

                                    >

                                        Aucune donnée.

                                    </td>

                                </tr>

                            ) : (

                                rows.map((row, index) => (

                                    <tr

                                        key={index}

                                    >

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

                                    </tr>

                                ))

                            )

                        }

                    </tbody>

                </table>

            </div>

            <footer className="data-table__footer">

                <span>

                    {rows.length} résultat(s)

                </span>

                <div>

                    <button>

                        <ChevronLeft size={18} />

                    </button>

                    <button>

                        <ChevronRight size={18} />

                    </button>

                </div>

            </footer>

        </section>

    );

}

export default DataTable;