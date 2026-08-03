import { useState } from "react";

import {

    FileSpreadsheet,

    FileText,

    FileJson,

} from "lucide-react";

import ConfirmDialog from "../ConfirmDialog";

function ExportDialog({

    open = false,

    loading = false,

    defaultFormat = "xlsx",

    onCancel,

    onConfirm,

}) {

    const [

        format,

        setFormat,

    ] = useState(defaultFormat);

    const confirm = () => {

        onConfirm?.(format);

    };

    return (

        <ConfirmDialog

            open={open}

            loading={loading}

            variant="success"

            title="Exporter les données"

            message={

                <div className="export-dialog">

                    <p>

                        Choisissez le format d'export.

                    </p>

                    <div className="export-dialog__formats">

                        <label>

                            <input

                                type="radio"

                                checked={format === "xlsx"}

                                onChange={() =>

                                    setFormat("xlsx")

                                }

                            />

                            <FileSpreadsheet

                                size={18}

                            />

                            Excel (.xlsx)

                        </label>

                        <label>

                            <input

                                type="radio"

                                checked={format === "csv"}

                                onChange={() =>

                                    setFormat("csv")

                                }

                            />

                            <FileText

                                size={18}

                            />

                            CSV

                        </label>

                        <label>

                            <input

                                type="radio"

                                checked={format === "json"}

                                onChange={() =>

                                    setFormat("json")

                                }

                            />

                            <FileJson

                                size={18}

                            />

                            JSON

                        </label>

                    </div>

                </div>

            }

            confirmLabel="Exporter"

            cancelLabel="Annuler"

            onCancel={onCancel}

            onConfirm={confirm}

        />

    );

}

export default ExportDialog;