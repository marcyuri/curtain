import {

    Download,

    Maximize2,

    Minimize2,

    RotateCw,

    ZoomIn,

    ZoomOut,

} from "lucide-react";

import {

    useState,

} from "react";

import Modal from "../Modal";

import "./ImageViewer.css";

function ImageViewer({

    open = false,

    image = "",

    title = "Image",

    onClose,

    onDownload,

}) {

    const [

        zoom,

        setZoom,

    ] = useState(1);

    const [

        rotation,

        setRotation,

    ] = useState(0);

    const [

        fullscreen,

        setFullscreen,

    ] = useState(false);

    return (

        <Modal

            open={open}

            width={

                fullscreen

                    ? "100vw"

                    : "1100px"

            }

            title={title}

            onClose={onClose}

            footer={

                <div className="image-viewer__footer">

                    <button

                        onClick={() =>

                            setZoom((value) =>

                                Math.max(.2, value - .2)

                            )

                        }

                    >

                        <ZoomOut size={18} />

                    </button>

                    <button

                        onClick={() =>

                            setZoom((value) =>

                                value + .2

                            )

                        }

                    >

                        <ZoomIn size={18} />

                    </button>

                    <button

                        onClick={() =>

                            setRotation((value) =>

                                value + 90

                            )

                        }

                    >

                        <RotateCw size={18} />

                    </button>

                    <button

                        onClick={() =>

                            setFullscreen((value) =>

                                !value

                            )

                        }

                    >

                        {

                            fullscreen

                                ? <Minimize2 size={18} />

                                : <Maximize2 size={18} />

                        }

                    </button>

                    <button

                        onClick={onDownload}

                    >

                        <Download size={18} />

                    </button>

                </div>

            }

        >

            <div className="image-viewer">

                <img

                    src={image}

                    alt={title}

                    style={{

                        transform: `

                            scale(${zoom})

                            rotate(${rotation}deg)

                        `,

                    }}

                />

            </div>

        </Modal>

    );

}

export default ImageViewer;