import { Player } from '../services/PlayerService';
import { PlayerEvents } from '../utils/YouTubeEventsEnum';

export function setTune(player, serviceParams) {
    const { paused, socket} = serviceParams;
    socket.on('SetTune', action => {
        if (action.eventStatus === PlayerEvents.PAUSED) {
            paused.update(true);
            Player().pauseVideo();
        } else if (action.eventStatus === PlayerEvents.PLAYING) {
            paused.update(false);
            Player().playVideo();
        } else if (action.eventStatus === PlayerEvents.JUMPED) {
            Player().seekTo(action.time, true);
        }
    });
}

export function updatePlaylist(serviceParams) {
    const {setPlaylist, setCurrentPlaying, socket} = serviceParams;
    socket.on('UpdatePlaylist', playlist => {
        setPlaylist(playlist)
        setCurrentPlaying(playlist.currentPlaying)
    });
}

export function updatePlayerVideo(serviceParams) {
    const {setPlaylist, setCurrentPlaying, socket} = serviceParams;
    socket.on("UpdatePlayerVideo", playlist => {
        console.log("updateplayerVideo");
        setCurrentPlaying(playlist.currentPlaying);
        setPlaylist(playlist);
        Player().playVideo();
    })
}