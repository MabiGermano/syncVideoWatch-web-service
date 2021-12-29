import { PlayerEvents } from '../utils/YouTubeEventsEnum';

export function setTune(player, paused, socket) {
    
    socket.on('SetTune', action => {
        
        if (action.eventStatus === PlayerEvents.PAUSED) {
            paused.update(!paused);
            player.pauseVideo();
        } else if (action.eventStatus === PlayerEvents.PLAYING) {
            paused.update(!paused);
            player.playVideo();
        } else if (action.eventStatus === PlayerEvents.JUMPED) {
            player.seekTo(action.time, true);
        }
    });
}