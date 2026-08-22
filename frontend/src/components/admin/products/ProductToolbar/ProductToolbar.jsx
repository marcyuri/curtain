import { useRef } from "react";

import {

    Search,

    Filter,

    Download,

    Upload,

    Plus,

    RefreshCw,

} from "lucide-react";

import "./ProductToolbar.css";

function ProductToolbar({

    search = "",

    loading = false,

    onSearch,

    onFilter,

    onRefresh,

    onImport,

    onExport,

    onCreate,

}) {
    const fileInputRef = useRef(null);

    return (

        <header className="product-toolbar">

            <div className="product-toolbar__left">

                <div className="product-toolbar__search">

                    <Search size={18} />

                    <input

                        type="search"

                        value={search}

                        placeholder="Rechercher un produit..."

                        onChange={(event) =>

                            onSearch?.(

                                event.target.value

                            )

                        }

                    />

                </div>

            </div>

            <div className="product-toolbar__right">

                <button

                    onClick={onRefresh}

                    disabled={loading}

                >

                    <RefreshCw size={18} />

                    Actualiser

                </button>

                <button

                    onClick={onFilter}

                >

                    <Filter size={18} />

                    Filtres

                </button>

                <button

                    onClick={() => fileInputRef.current?.click()}

                >

                    <Upload size={18} />

                    Importer

                </button>

                <input
                    ref={fileInputRef}
                    className="product-toolbar__file-input"
                    type="file"
                    accept=".csv,.json"
                    onChange={(event) => onImport?.(event.target.files[0])}
                />
                <button

                    onClick={onExport}

                >

                    <Download size={18} />

                    Exporter

                </button>

                <button

                    className="product-toolbar__create"

                    onClick={onCreate}

                >

                    <Plus size={18} />

                    Nouveau produit

                </button>

            </div>

        </header>

    );

}

export default ProductToolbar;