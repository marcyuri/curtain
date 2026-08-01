import { useId, useMemo } from "react";
import { Download, LoaderCircle, Maximize, Minimize, Pause, PictureInPicture2, Play, SkipBack, SkipForward, Volume2, VolumeX } from "lucide-react";

import Loader from "../../../common/Loader/Loader";
import { PLAYBACK_SPEEDS } from "./constants/videoPlayer";
import useVideoPlayer from "./hooks/useVideoPlayer";
import { formatTime } from "./utils/formatTime";

import "./VideoPlayer.css";

function VideoPlayer({ src, poster = "", title = "Vidéo", tracks = [], previewImage = "", downloadUrl = "", autoPlay = false, loop = false, className = "" }) {
    const titleId = useId();
    const errorId = useId();
    const player = useVideoPlayer({ tracks });
    const classNames = useMemo(() => ["video-player", player.isPlaying && "video-player--playing", player.showControls && "video-player--controls-visible", className].filter(Boolean).join(" "), [className, player.isPlaying, player.showControls]);

    return (
        <section ref={player.playerRef} className={classNames} aria-labelledby={titleId} aria-describedby={player.hasError ? errorId : undefined} onMouseMove={player.revealControls} onFocus={player.revealControls} onKeyDown={player.handleKeyboard} tabIndex="0">
            <h2 id={titleId} className="video-player__visually-hidden">{title}</h2>
            <div className="video-player__media">
                {player.isLoading && !player.hasError && <div className="video-player__loading" aria-live="polite"><Loader text="Chargement de la vidéo…" /></div>}
                {player.hasError ? (
                    <div id={errorId} className="video-player__error" role="alert"><LoaderCircle aria-hidden="true" size={32} /><p>La vidéo ne peut pas être lue pour le moment.</p><button type="button" className="video-player__retry" onClick={player.retryVideo}>Réessayer</button></div>
                ) : (
                    <video ref={player.videoRef} className="video-player__video" src={src} poster={poster} autoPlay={autoPlay} loop={loop} playsInline preload="metadata" onCanPlay={() => player.setIsLoading(false)} onLoadedMetadata={event => player.setDuration(event.currentTarget.duration)} onTimeUpdate={event => player.setCurrentTime(event.currentTarget.currentTime)} onPlay={() => player.setIsPlaying(true)} onPause={() => player.setIsPlaying(false)} onVolumeChange={event => { player.setIsMuted(event.currentTarget.muted); player.setVolume(event.currentTarget.volume); }} onError={() => { player.setIsLoading(false); player.setHasError(true); }}>
                        {tracks.map(track => <track key={`${track.src}-${track.srcLang}`} kind={track.kind || "subtitles"} src={track.src} srcLang={track.srcLang} label={track.label} default={track.default} />)}
                    </video>
                )}
                {!player.hasError && <button type="button" className="video-player__central-play" onClick={player.togglePlay} aria-label={player.isPlaying ? "Mettre la vidéo en pause" : "Lire la vidéo"}>{player.isPlaying ? <Pause aria-hidden="true" size={30} /> : <Play aria-hidden="true" size={30} />}</button>}
            </div>
            {!player.hasError && <div className="video-player__controls" aria-label="Contrôles vidéo">
                <div className="video-player__progress-wrapper">
                    {previewImage && <div className="video-player__preview" aria-hidden="true"><img src={previewImage} alt="" /><span>{formatTime(player.previewTime)}</span></div>}
                    <input ref={player.progressRef} className="video-player__range video-player__range--progress" type="range" min="0" max={player.duration || 0} step="0.1" value={Math.min(player.currentTime, player.duration || 0)} onChange={player.seekTo} onMouseMove={player.handleProgressPreview} aria-label="Position dans la vidéo" />
                </div>
                <div className="video-player__control-bar">
                    <div className="video-player__control-group">
                        <button type="button" className="video-player__control" onClick={player.togglePlay} aria-label={player.isPlaying ? "Pause" : "Lecture"}>{player.isPlaying ? <Pause aria-hidden="true" size={20} /> : <Play aria-hidden="true" size={20} />}</button>
                        <button type="button" className="video-player__control video-player__control--desktop" onClick={() => player.skip(-10)} aria-label="Reculer de 10 secondes"><SkipBack aria-hidden="true" size={20} /></button>
                        <button type="button" className="video-player__control video-player__control--desktop" onClick={() => player.skip(10)} aria-label="Avancer de 10 secondes"><SkipForward aria-hidden="true" size={20} /></button>
                        <span className="video-player__time">{formatTime(player.currentTime)} / {formatTime(player.duration)}</span>
                    </div>
                    <div className="video-player__control-group video-player__control-group--end">
                        <button type="button" className="video-player__control" onClick={player.toggleMute} aria-label={player.isMuted ? "Activer le son" : "Couper le son"}>{player.isMuted || player.volume === 0 ? <VolumeX aria-hidden="true" size={20} /> : <Volume2 aria-hidden="true" size={20} />}</button>
                        <input className="video-player__range video-player__range--volume video-player__control--desktop" type="range" min="0" max="1" step="0.05" value={player.isMuted ? 0 : player.volume} onChange={player.updateVolume} aria-label="Volume" />
                        <label className="video-player__speed-label"><span className="video-player__visually-hidden">Vitesse de lecture</span><select className="video-player__speed" value={player.playbackRate} onChange={player.changePlaybackRate}>{PLAYBACK_SPEEDS.map(speed => <option key={speed} value={speed}>{speed}×</option>)}</select></label>
                        {tracks.length > 0 && <label className="video-player__captions-label video-player__control--desktop"><span className="video-player__visually-hidden">Sous-titres</span><select className="video-player__speed" value={player.selectedTrack} onChange={event => player.setSelectedTrack(Number(event.target.value))}><option value={-1}>ST</option>{tracks.map((track, index) => <option key={`${track.label}-${track.srcLang}`} value={index}>{track.label}</option>)}</select></label>}
                        {player.isPictureInPictureAvailable && <button type="button" className="video-player__control video-player__control--desktop" onClick={player.togglePictureInPicture} aria-label="Activer l’image dans l’image"><PictureInPicture2 aria-hidden="true" size={20} /></button>}
                        {downloadUrl && <a className="video-player__control video-player__control--desktop" href={downloadUrl} download aria-label="Télécharger la vidéo"><Download aria-hidden="true" size={20} /></a>}
                        <button type="button" className="video-player__control" onClick={player.toggleFullscreen} aria-label={player.isFullscreen ? "Quitter le plein écran" : "Passer en plein écran"}>{player.isFullscreen ? <Minimize aria-hidden="true" size={20} /> : <Maximize aria-hidden="true" size={20} />}</button>
                    </div>
                </div>
            </div>}
        </section>
    );
}

export default VideoPlayer;
