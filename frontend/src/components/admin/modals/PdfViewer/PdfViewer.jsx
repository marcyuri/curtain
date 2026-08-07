import {

    Download,

    Printer,

    ZoomIn,

    ZoomOut,

    Maximize2,

} from "lucide-react";

import {

    useState,

} from "react";

import Modal from "../Modal";

import "./PdfViewer.css";

function PdfViewer({

    open = false,

    src = "",

    title = "Document PDF",

    onClose,

    onDownload,

    onPrint,

}) {

    const [

        zoom,

        setZoom,

    ] = useState(100);

    return (

        <Modal

            open={open}

            width="1200px"

            title={title}

            onClose={onClose}

            footer={

                <div className="pdf-viewer__toolbar">

                    <button

                        type="button"

                        onClick={() =>

                            setZoom((value) =>

                                Math.max(50, value - 10)

                            )

                        }

                    >

                        <ZoomOut size={18} />

                    </button>

                    <span>

                        {zoom}%

                    </span>

                    <button

                        type="button"

                        onClick={() =>

                            setZoom((value) =>

                                Math.min(300, value + 10)

                            )

                        }

                    >

                        <ZoomIn size={18} />

                    </button>

                    <button

                        type="button"

                        onClick={onPrint}

                    >

                        <Printer size={18} />

                    </button>

                    <button

                        type="button"

                        onClick={onDownload}

                    >

                        <Download size={18} />

                    </button>

                    <button

                        type="button"

                        onClick={() =>

                            window.open(src, "_blank")

                        }

                    >

                        <Maximize2 size={18} />

                    </button>

                </div>

            }

        >

            <div className="pdf-viewer">

                <iframe

                    title={title}

                    src={`${src}#zoom=${zoom}`}

                />

            </div>

        </Modal>

    );

}

export default PdfViewer;