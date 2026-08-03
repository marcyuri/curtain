import {

    FileSpreadsheet,

    FileText,

    FileJson,

    Printer,

    Clipboard,

    Download,

} from "lucide-react";

import "./TableExportMenu.css";

const EXPORTS = [

    {

        id: "excel",

        label: "Excel (.xlsx)",

        icon: FileSpreadsheet,

    },

    {

        id: "csv",

        label: "CSV",

        icon: FileSpreadsheet,

    },

    {

        id: "pdf",

        label: "PDF",

        icon: FileText,

    },

    {

        id: "json",

        label: "JSON",

        icon: FileJson,

    },

    {

        id: "clipboard",

        label: "Copier",

        icon: Clipboard,

    },

    {

        id: "print",

        label: "Imprimer",

        icon: Printer,

    },

];

function TableExportMenu({

    open = false,

    onExport,

}) {

    if (!open) {

        return null;

    }

    return (

        <div className="table-export-menu">

            <header>

                <Download

                    size={20}

                />

                <h3>

                    Exporter

                </h3>

            </header>

            <div className="table-export-menu__list">

                {

                    EXPORTS.map((item) => {

                        const Icon = item.icon;

                        return (

                            <button

                                key={item.id}

                                type="button"

                                onClick={() =>

                                    onExport?.(

                                        item.id

                                    )

                                }

                            >

                                <Icon

                                    size={18}

                                />

                                {item.label}

                            </button>

                        );

                    })

                }

            </div>

        </div>

    );

}

export default TableExportMenu;