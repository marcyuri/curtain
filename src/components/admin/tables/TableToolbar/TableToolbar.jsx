import {

    Plus,

    Search,

    Filter,

    RefreshCw,

    Download,

    Upload,

    Columns3,

    Trash2,

    Printer,

    Settings2,

} from "lucide-react";

import "./TableToolbar.css";

function TableToolbar({

    title,

    search = "",

    searchPlaceholder = "Rechercher...",

    selectedCount = 0,

    loading = false,

    onSearch,

    onCreate,

    onFilter,

    onRefresh,

    onImport,

    onExport,

    onColumns,

    onDelete,

    onPrint,

    onSettings,

}) {

    return (

        <header className="table-toolbar">

            <div className="table-toolbar__left">

                {

                    title && (

                        <h2>

                            {title}

                        </h2>

                    )

                }

                <div className="table-toolbar__search">

                    <Search size={18} />

                    <input

                        type="search"

                        value={search}

                        placeholder={searchPlaceholder}

                        onChange={(event) =>

                            onSearch?.(

                                event.target.value

                            )

                        }

                    />

                </div>

            </div>

            <div className="table-toolbar__right">

                {

                    selectedCount > 0 && (

                        <button

                            type="button"

                            className="table-toolbar__danger"

                            onClick={onDelete}

                        >

                            <Trash2 size={18} />

                            Supprimer ({selectedCount})

                        </button>

                    )

                }

                <button

                    type="button"

                    onClick={onFilter}

                >

                    <Filter size={18} />

                </button>

                <button

                    type="button"

                    onClick={onColumns}

                >

                    <Columns3 size={18} />

                </button>

                <button

                    type="button"

                    onClick={onImport}

                >

                    <Upload size={18} />

                </button>

                <button

                    type="button"

                    onClick={onExport}

                >

                    <Download size={18} />

                </button>

                <button

                    type="button"

                    onClick={onPrint}

                >

                    <Printer size={18} />

                </button>

                <button

                    type="button"

                    disabled={loading}

                    onClick={onRefresh}

                >

                    <RefreshCw size={18} />

                </button>

                <button

                    type="button"

                    onClick={onSettings}

                >

                    <Settings2 size={18} />

                </button>

                <button

                    type="button"

                    className="table-toolbar__primary"

                    onClick={onCreate}

                >

                    <Plus size={18} />

                    Nouveau

                </button>

            </div>

        </header>

    );

}

export default TableToolbar;