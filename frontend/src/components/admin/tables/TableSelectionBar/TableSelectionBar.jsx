import {

    X,

    Trash2,

    Archive,

    Download,

    Printer,

    Tag,

    CheckCircle,

    Copy,

} from "lucide-react";

import "./TableSelectionBar.css";

function TableSelectionBar({

    selectedCount = 0,

    onClear,

    onDelete,

    onArchive,

    onExport,

    onPrint,

    onDuplicate,

    onChangeStatus,

    children,

}) {

    if (selectedCount === 0) {

        return null;

    }

    return (

        <div className="table-selection-bar">

            <div className="table-selection-bar__left">

                <button

                    type="button"

                    className="table-selection-bar__close"

                    onClick={onClear}

                >

                    <X size={18} />

                </button>

                <strong>

                    {selectedCount}

                </strong>

                élément(s) sélectionné(s)

            </div>

            <div className="table-selection-bar__actions">

                <button

                    type="button"

                    onClick={onDuplicate}

                >

                    <Copy size={18} />

                    Dupliquer

                </button>

                <button

                    type="button"

                    onClick={onArchive}

                >

                    <Archive size={18} />

                    Archiver

                </button>

                <button

                    type="button"

                    onClick={onChangeStatus}

                >

                    <Tag size={18} />

                    Statut

                </button>

                <button

                    type="button"

                    onClick={onExport}

                >

                    <Download size={18} />

                    Exporter

                </button>

                <button

                    type="button"

                    onClick={onPrint}

                >

                    <Printer size={18} />

                    Imprimer

                </button>

                <button

                    type="button"

                    className="table-selection-bar__success"

                >

                    <CheckCircle size={18} />

                    Valider

                </button>

                <button

                    type="button"

                    className="table-selection-bar__danger"

                    onClick={onDelete}

                >

                    <Trash2 size={18} />

                    Supprimer

                </button>

                {children}

            </div>

        </div>

    );

}

export default TableSelectionBar;