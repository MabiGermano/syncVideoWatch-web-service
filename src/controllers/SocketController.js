import { player } from '../services/PlayerService';
import { PlayerEvents } from '../utils/YouTubeEventsEnum';

export function setTune(player, serviceParams) {
    const { paused, socket} = serviceParams;
    socket.on('SetTune', action => {
        if (action.eventStatus === PlayerEvents.PAUSED) {
            paused.update(true);
            player.pauseVideo();
        } else if (action.eventStatus === PlayerEvents.PLAYING) {
            paused.update(false);
            player.playVideo();
        } else if (action.eventStatus === PlayerEvents.JUMPED) {
            player.seekTo(action.time, true);
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
        player.playVideo();
    })
}