import {

    MapPin,

    Navigation,

    ExternalLink,

} from "lucide-react";

import Modal from "../Modal";

import "./MapModal.css";

function MapModal({

    open = false,

    title = "Localisation",

    address = "",

    latitude,

    longitude,

    onClose,

}) {

    const mapUrl =

        latitude && longitude

            ? `https://www.google.com/maps?q=${latitude},${longitude}&output=embed`

            : `https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`;

    const externalUrl =

        latitude && longitude

            ? `https://www.google.com/maps?q=${latitude},${longitude}`

            : `https://www.google.com/maps/search/${encodeURIComponent(address)}`;

    return (

        <Modal

            open={open}

            width="1000px"

            title={title}

            subtitle={address}

            onClose={onClose}

            footer={

                <div className="map-modal__footer">

                    <button

                        type="button"

                        onClick={() =>

                            window.open(

                                externalUrl,

                                "_blank"

                            )

                        }

                    >

                        <ExternalLink size={18} />

                        Ouvrir Google Maps

                    </button>

                </div>

            }

        >

            <div className="map-modal">

                <div className="map-modal__infos">

                    <div>

                        <MapPin size={18} />

                        <span>

                            {address}

                        </span>

                    </div>

                    {

                        latitude && longitude && (

                            <div>

                                <Navigation size={18} />

                                <span>

                                    {latitude}, {longitude}

                                </span>

                            </div>

                        )

                    }

                </div>

                <iframe

                    title={title}

                    src={mapUrl}

                    loading="lazy"

                    allowFullScreen

                />

            </div>

        </Modal>

    );

}

export default MapModal;