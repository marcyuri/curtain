import {
    FileSpreadsheet,
    FileText,
    FileImage,
    Printer,
    Share2,
    Download,
} from "lucide-react";

import Button from "../../form/Button";

import "./ExportActions.css";

function ExportActions({

    loading = false,

    onExportPdf,

    onExportExcel,

    onExportCsv,

    onExportImage,

    onPrint,

    onShare,

}) {

    return (

        <section className="export-actions">

            <header className="export-actions__header">

                <h3>

                    Exporter les données

                </h3>

                <p>

                    Téléchargez, imprimez ou partagez les informations.

                </p>

            </header>

            <div className="export-actions__grid">

                <Button

                    onClick={onExportPdf}

                    disabled={loading}

                >

                    <FileText size={18} />

                    Export PDF

                </Button>

                <Button

                    onClick={onExportExcel}

                    disabled={loading}

                >

                    <FileSpreadsheet size={18} />

                    Export Excel

                </Button>

                <Button

                    onClick={onExportCsv}

                    disabled={loading}

                >

                    <Download size={18} />

                    Export CSV

                </Button>

                <Button

                    onClick={onExportImage}

                    disabled={loading}

                >

                    <FileImage size={18} />

                    Export Image

                </Button>

                <Button

                    variant="outline"

                    onClick={onPrint}

                    disabled={loading}

                >

                    <Printer size={18} />

                    Imprimer

                </Button>

                <Button

                    variant="outline"

                    onClick={onShare}

                    disabled={loading}

                >

                    <Share2 size={18} />

                    Partager

                </Button>

            </div>

        </section>

    );

}

export default ExportActions;