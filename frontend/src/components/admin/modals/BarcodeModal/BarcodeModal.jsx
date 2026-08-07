import {

    Barcode,

    Copy,

    Download,

    Printer,

} from "lucide-react";

import Modal from "../Modal";

import "./BarcodeModal.css";

function BarcodeModal({

    open = false,

    value = "",

    image = "",

    title = "Code-barres",

    onClose,

    onDownload,

    onPrint,

}) {

    const copyValue = () => {

        navigator.clipboard.writeText(value);

    };

    return (

        <Modal

            open={open}

            width="700px"

            title={title}

            subtitle={value}

            onClose={onClose}

            footer={

                <div className="barcode-modal__actions">

                    <button

                        type="button"

                        onClick={copyValue}

                    >

                        <Copy size={18} />

                        Copier

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

                        onClick={onDownload}

                    >

                        <Download size={18} />

                        Télécharger

                    </button>

                </div>

            }

        >

            <div className="barcode-modal">

                {

                    image

                        ? (

                            <img

                                src={image}

                                alt={value}

                            />

                        )

                        : (

                            <div

                                className="barcode-modal__placeholder"

                            >

                                <Barcode

                                    size={90}

                                />

                                <p>

                                    Code-barres indisponible

                                </p>

                            </div>

                        )

                }

            </div>

        </Modal>

    );

}

export default BarcodeModal;