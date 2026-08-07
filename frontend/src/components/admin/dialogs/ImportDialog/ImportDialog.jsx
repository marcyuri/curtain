import { useState } from "react";

import {

    Upload,

    FileSpreadsheet,

    FileText,

} from "lucide-react";

import ConfirmDialog from "../ConfirmDialog";

import "./ImportDialog.css";

function ImportDialog({

    open = false,

    loading = false,

    acceptedTypes = ".xlsx,.csv",

    onCancel,

    onConfirm,

}) {

    const [

        file,

        setFile,

    ] = useState(null);

    const handleChange = (event) => {

        const selectedFile =

            event.target.files?.[0] || null;

        setFile(selectedFile);

    };

    const handleConfirm = () => {

        onConfirm?.(file);

    };

    return (

        <ConfirmDialog

            open={open}

            loading={loading}

            variant="success"

            title="Importer des données"

            message={

                <div className="import-dialog">

                    <p>

                        Sélectionnez un fichier à importer.

                    </p>

                    <label className="import-dialog__upload">

                        <Upload

                            size={42}

                        />

                        <span>

                            Choisir un fichier

                        </span>

                        <small>

                            Excel (.xlsx) ou CSV

                        </small>

                        <input

                            type="file"

                            accept={acceptedTypes}

                            hidden

                            onChange={handleChange}

                        />

                    </label>

                    {

                        file && (

                            <div className="import-dialog__file">

                                {

                                    file.name.endsWith(".csv")

                                        ? (

                                            <FileText

                                                size={20}

                                            />

                                        )

                                        : (

                                            <FileSpreadsheet

                                                size={20}

                                            />

                                        )

                                }

                                <span>

                                    {file.name}

                                </span>

                            </div>

                        )

                    }

                </div>

            }

            confirmLabel="Importer"

            cancelLabel="Annuler"

            onCancel={onCancel}

            onConfirm={handleConfirm}

        />

    );

}

export default ImportDialog;