import { useCallback, useEffect, useRef, useState } from "react";

import { INTERACTIVE_TAGS } from "../constants/videoPlayer";

const CONTROLS_DELAY = 3000;

function useVideoPlayer({ tracks }) {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const progressRef = useRef(null);
    const controlsTimeoutRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [volume, setVolume] = useState(1);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [playbackRate, setPlaybackRate] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isPictureInPictureAvailable, setIsPictureInPictureAvailable] = useState(false);
    const [showControls, setShowControls] = useState(true);
    const [previewTime, setPreviewTime] = useState(0);
    const [selectedTrack, setSelectedTrack] = useState(tracks.findIndex(track => track.default));

    useEffect(() => {
        setIsPictureInPictureAvailable(Boolean(document.pictureInPictureEnabled));

        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === playerRef.current);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
            window.clearTimeout(controlsTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        Array.from(video.textTracks).forEach((track, index) => {
            track.mode = index === selectedTrack ? "showing" : "disabled";
        });
    }, [selectedTrack, tracks]);

    const revealControls = useCallback(() => {
        window.clearTimeout(controlsTimeoutRef.current);
        setShowControls(true);

        if (isPlaying) {
            controlsTimeoutRef.current = window.setTimeout(() => setShowControls(false), CONTROLS_DELAY);
        }
    }, [isPlaying]);

    const togglePlay = useCallback(async () => {
        const video = videoRef.current;

        if (!video || hasError) {
            return;
        }

        try {
            if (video.paused) {
                await video.play();
            } else {
                video.pause();
            }
        } catch {
            setHasError(true);
        }
    }, [hasError]);

    const updateVolume = useCallback(event => {
        const video = videoRef.current;
        const nextVolume = Number(event.target.value);

        if (!video) {
            return;
        }

        video.volume = nextVolume;
        video.muted = nextVolume === 0;
        setVolume(nextVolume);
        setIsMuted(video.muted);
    }, []);

    const toggleMute = useCallback(() => {
        const video = videoRef.current;

        if (!video) {
            return;
        }

        video.muted = !video.muted;
        setIsMuted(video.muted);
    }, []);

    const seekTo = useCallback(event => {
        const video = videoRef.current;
        const nextTime = Number(event.target.value);

        if (!video) {
            return;
        }

        video.currentTime = nextTime;
        setCurrentTime(nextTime);
    }, []);

    const skip = useCallback(seconds => {
        const video = videoRef.current;

        if (video) {
            video.currentTime = Math.min(Math.max(video.currentTime + seconds, 0), duration);
        }
    }, [duration]);

    const changePlaybackRate = useCallback(event => {
        const video = videoRef.current;
        const nextRate = Number(event.target.value);

        if (!video) {
            return;
        }

        video.playbackRate = nextRate;
        setPlaybackRate(nextRate);
    }, []);

    const toggleFullscreen = useCallback(async () => {
        try {
            if (document.fullscreenElement) {
                await document.exitFullscreen();
            } else if (playerRef.current) {
                await playerRef.current.requestFullscreen();
            }
        } catch {
            setHasError(true);
        }
    }, []);

    const togglePictureInPicture = useCallback(async () => {
        const video = videoRef.current;

        if (!video || !isPictureInPictureAvailable) {
            return;
        }

        try {
            if (document.pictureInPictureElement) {
                await document.exitPictureInPicture();
            } else {
                await video.requestPictureInPicture();
            }
        } catch {
            setHasError(true);
        }
    }, [isPictureInPictureAvailable]);

    const retryVideo = useCallback(() => {
        const video = videoRef.current;

        if (video) {
            setHasError(false);
            setIsLoading(true);
            video.load();
        }
    }, []);

    const handleKeyboard = useCallback(event => {
        if (INTERACTIVE_TAGS.includes(event.target.tagName)) {
            return;
        }

        const key = event.key.toLowerCase();

        if (event.key === " " || key === "k") {
            event.preventDefault();
            togglePlay();
        } else if (event.key === "ArrowLeft") {
            event.preventDefault();
            skip(-5);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            skip(5);
        } else if (key === "m") {
            toggleMute();
        } else if (key === "f") {
            toggleFullscreen();
        }
    }, [skip, toggleFullscreen, toggleMute, togglePlay]);

    const handleProgressPreview = useCallback(event => {
        const progress = progressRef.current;

        if (!progress || !duration) {
            return;
        }

        const bounds = progress.getBoundingClientRect();
        const ratio = Math.min(Math.max((event.clientX - bounds.left) / bounds.width, 0), 1);
        setPreviewTime(duration * ratio);
    }, [duration]);

    return {
        videoRef, playerRef, progressRef, isLoading, hasError, isPlaying, isMuted, volume,
        currentTime, duration, playbackRate, isFullscreen, isPictureInPictureAvailable,
        showControls, previewTime, selectedTrack, setSelectedTrack, revealControls, togglePlay,
        updateVolume, toggleMute, seekTo, skip, changePlaybackRate, toggleFullscreen,
        togglePictureInPicture, retryVideo, handleKeyboard, handleProgressPreview, setIsLoading,
        setDuration, setCurrentTime, setIsPlaying, setHasError, setIsMuted, setVolume
    };
}

export default useVideoPlayer;
