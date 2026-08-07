import {

    QrCode,

    Copy,

    Download,

    Printer,

    ExternalLink,

} from "lucide-react";

import Modal from "../Modal";

import "./QRCodeModal.css";

function QRCodeModal({

    open = false,

    value = "",

    image = "",

    title = "QR Code",

    onClose,

    onDownload,

    onPrint,

}) {

    const copyValue = () => {

        navigator.clipboard.writeText(value);

    };

    const openLink = () => {

        if (

            value.startsWith("http://") ||

            value.startsWith("https://")

        ) {

            window.open(

                value,

                "_blank"

            );

        }

    };

    return (

        <Modal

            open={open}

            width="720px"

            title={title}

            subtitle={value}

            onClose={onClose}

            footer={

                <div className="qr-code-modal__actions">

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

                    {

                        value.startsWith("http") && (

                            <button

                                type="button"

                                onClick={openLink}

                            >

                                <ExternalLink

                                    size={18}

                                />

                                Ouvrir

                            </button>

                        )

                    }

                </div>

            }

        >

            <div className="qr-code-modal">

                {

                    image

                        ? (

                            <img

                                src={image}

                                alt={title}

                            />

                        )

                        : (

                            <div

                                className="qr-code-modal__placeholder"

                            >

                                <QrCode

                                    size={90}

                                />

                                <h3>

                                    QR Code indisponible

                                </h3>

                                <p>

                                    Le QR Code sera généré automatiquement.

                                </p>

                            </div>

                        )

                }

            </div>

        </Modal>

    );

}

export default QRCodeModal;