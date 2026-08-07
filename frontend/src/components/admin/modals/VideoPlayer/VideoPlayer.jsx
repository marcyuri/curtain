import {

    Play,

    Pause,

    Volume2,

    VolumeX,

    Maximize,

} from "lucide-react";

import {

    useRef,

    useState,

} from "react";

import Modal from "../Modal";

import "./VideoPlayer.css";

function VideoPlayer({

    open = false,

    src = "",

    title = "Lecture vidéo",

    onClose,

}) {

    const videoRef = useRef(null);

    const [

        playing,

        setPlaying,

    ] = useState(false);

    const [

        muted,

        setMuted,

    ] = useState(false);

    const togglePlay = () => {

        if (!videoRef.current) {

            return;

        }

        if (playing) {

            videoRef.current.pause();

        } else {

            videoRef.current.play();

        }

        setPlaying(!playing);

    };

    const toggleMute = () => {

        if (!videoRef.current) {

            return;

        }

        videoRef.current.muted = !muted;

        setMuted(!muted);

    };

    const toggleFullscreen = () => {

        videoRef.current?.requestFullscreen?.();

    };

    return (

        <Modal

            open={open}

            width="1100px"

            title={title}

            onClose={onClose}

            footer={

                <div className="video-player__controls">

                    <button

                        type="button"

                        onClick={togglePlay}

                    >

                        {

                            playing

                                ? <Pause size={18} />

                                : <Play size={18} />

                        }

                    </button>

                    <button

                        type="button"

                        onClick={toggleMute}

                    >

                        {

                            muted

                                ? <VolumeX size={18} />

                                : <Volume2 size={18} />

                        }

                    </button>

                    <button

                        type="button"

                        onClick={toggleFullscreen}

                    >

                        <Maximize size={18} />

                    </button>

                </div>

            }

        >

            <div className="video-player">

                <video

                    ref={videoRef}

                    controls={false}

                    src={src}

                />

            </div>

        </Modal>

    );

}

export default VideoPlayer;