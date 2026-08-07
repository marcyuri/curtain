import { useEffect, useState } from "react";

import {
    X,
    ChevronLeft,
    ChevronRight,
    Download,
    Maximize,
    FileText,
} from "lucide-react";

import "./MediaViewer.css";

function MediaViewer({

    open = false,

    media = [],

    initialIndex = 0,

    onClose,

    onDownload,

}) {

    const [currentIndex, setCurrentIndex] = useState(initialIndex);

    useEffect(() => {

        setCurrentIndex(initialIndex);

    }, [initialIndex]);

    useEffect(() => {

        const handleKeyDown = (event) => {

            if (!open) {

                return;

            }

            switch (event.key) {

                case "Escape":

                    onClose?.();

                    break;

                case "ArrowLeft":

                    previous();

                    break;

                case "ArrowRight":

                    next();

                    break;

                default:

                    break;

            }

        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {

            window.removeEventListener("keydown", handleKeyDown);

        };

    }, [open, currentIndex]);

    if (!open || media.length === 0) {

        return null;

    }

    const item = media[currentIndex];

    const previous = () => {

        setCurrentIndex((value) =>

            value === 0

                ? media.length - 1

                : value - 1

        );

    };

    const next = () => {

        setCurrentIndex((value) =>

            value === media.length - 1

                ? 0

                : value + 1

        );

    };

    const renderMedia = () => {

        switch (item.type) {

            case "image":

                return (

                    <img

                        src={item.src}

                        alt={item.title}

                    />

                );

            case "video":

                return (

                    <video

                        controls

                        src={item.src}

                    />

                );

            case "pdf":

                return (

                    <iframe

                        src={item.src}

                        title={item.title}

                    />

                );

            default:

                return (

                    <div className="media-viewer__unsupported">

                        <FileText size={70} />

                        <p>

                            Format non supporté.

                        </p>

                    </div>

                );

        }

    };

    return (

        <div className="media-viewer">

            <div

                className="media-viewer__backdrop"

                onClick={onClose}

            />

            <div className="media-viewer__container">

                <header className="media-viewer__header">

                    <div>

                        <h3>

                            {item.title}

                        </h3>

                        <small>

                            {currentIndex + 1} / {media.length}

                        </small>

                    </div>

                    <div className="media-viewer__actions">

                        <button

                            onClick={() =>

                                onDownload?.(item)

                            }

                        >

                            <Download size={20} />

                        </button>

                        <button>

                            <Maximize size={20} />

                        </button>

                        <button

                            onClick={onClose}

                        >

                            <X size={20} />

                        </button>

                    </div>

                </header>

                <div className="media-viewer__content">

                    <button

                        className="media-viewer__nav"

                        onClick={previous}

                    >

                        <ChevronLeft size={28} />

                    </button>

                    <div className="media-viewer__media">

                        {renderMedia()}

                    </div>

                    <button

                        className="media-viewer__nav"

                        onClick={next}

                    >

                        <ChevronRight size={28} />

                    </button>

                </div>

            </div>

        </div>

    );

}

export default MediaViewer;